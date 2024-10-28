import React, { useState } from "react";
import { Event } from "../types/event";
import dayjs from "dayjs";

interface TimelineEventProps {
  event: Event | undefined;
  onDelete: (eventId: string) => void;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleEventClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (event) {
      await onDelete(event.id);
    }
    setShowModal(false);
  };

  const getEventColor = (event: Event) => {
    if (!event) {
      return "";
    }
    const now = dayjs();
    const [hours, minutes] = event.startDate.split(":").map(Number);

    const eventStart = now
      .set("hour", hours)
      .set("minute", minutes)
      .set("second", 0)
      .set("millisecond", 0);
    const eventEnd = eventStart.add(event.duration, "minutes");

    if (eventStart.isBefore(now, "minute") && eventEnd.isAfter(now, "minute")) {
      return "bg-orange-500";
    } else if (eventEnd.isBefore(now, "minute")) {
      return "bg-gray-400";
    } else {
      return "bg-blue-500";
    }
  };

  return (
    <div className="relative flex items-center h-10 border-b border-gray-200">
      {event && (
        <div
          className={`absolute inset-x-1 ${getEventColor(
            event
          )} text-white text-sm flex items-center justify-center py-2 px-4 rounded-md shadow-md z-10 cursor-pointer`}
          style={{
            height: `${(event.duration / 30) * 2.5}rem`, // Adjust the height based on the duration
            top: "0",
          }}
          onClick={handleEventClick}
        >
          {event.patientName} - ({event.duration} min)
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-md">
            <p>Are you sure you want to delete this event?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
