import React from "react";
import { TimelineEvent } from "./TimelineEvent";
import { Event } from "../types/event";
import dayjs from "dayjs";
import axios from "axios";

interface TimelineProps {
  onSuccess?: () => void;
  data: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ data, onSuccess }) => {
  const events: Event[] = data.map((item) => ({
    id: item.id,
    startDate: dayjs(new Date(item.startDate)).format("HH:mm").toString(),
    patientName: `${item.patientName} - ${item.description}`,
    duration: item.duration,
    description: item.description,
  }));

  const times = Array.from({ length: 50 }).map((_, index) => {
    return dayjs()
      .startOf("day")
      .add(index * 30, "minute")
      .format("HH:mm")
      .toString();
  });

  const handleDelete = async (eventId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/appointments/cancel/${eventId}`
      );
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(
        `An error occurred while submitting the form:": ${JSON.stringify(
          error
        )}`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-0 h-96 overflow-y-scroll">
        {/* Time Column */}
        <div className="col-span-2 border-r border-gray-200">
          {times.map((time, index) => (
            <div
              key={index}
              className="flex items-center h-10 border-b border-gray-200"
            >
              <span className="px-4 text-sm text-gray-500">{time}</span>
            </div>
          ))}
        </div>
        <div className="col-span-10">
          {times.map((time, index) => {
            const event = events.find((e) => e.startDate === time);
            return (
              <TimelineEvent
                key={index}
                event={event || undefined}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
