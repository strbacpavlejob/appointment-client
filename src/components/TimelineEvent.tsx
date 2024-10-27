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

  return (
    <div className="relative flex items-center h-10 border-b border-gray-200">
      {event && (
        <div
          className={`absolute inset-x-1 ${
            dayjs(event.startDate, "HH:mm").isBefore(dayjs(), "minute") &&
            dayjs(event.startDate, "HH:mm")
              .add(event.duration, "minutes")
              .isAfter(dayjs(), "minute")
              ? "bg-orange-500"
              : dayjs(event.startDate, "HH:mm").isBefore(dayjs())
              ? "bg-gray-400"
              : "bg-blue-500"
          } text-white text-sm flex items-center justify-center py-2 px-4 rounded-md shadow-md z-10 cursor-pointer`}
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
