import React from "react";
import { TimelineEvent } from "./TimelineEvent";
import { Event } from "../types/event";
import dayjs from "dayjs";

const data = [
  {
    id: "1234",
    startDate: "2024-10-27T19:13:38.790Z",
    duration: 60,
    patientName: "Alice",
    description: "check-up",
  },
  {
    id: "1235",
    startDate: "2024-10-27T18:13:38.790Z",
    duration: 30,
    patientName: "Bob",
    description: "vaccination",
  },
  {
    id: "1236",
    startDate: "2024-10-27T17:13:38.790Z",
    duration: 30,
    patientName: "Sue",
    description: "Blood test",
  },
];

const events: Event[] = data.map((item) => ({
  id: item.id,
  time: dayjs(new Date(item.startDate)).format("HH:mm").toString(),
  title: item.patientName,
  color: "bg-blue-500",
  duration: item.duration,
}));

data.forEach((element) => {
  console.log(dayjs(new Date(element.startDate)).format("HH:mm").toString());
});

const Timeline: React.FC = () => {
  const times = Array.from({ length: 48 }).map((_, index) => {
    return dayjs()
      .startOf("day")
      .add(index * 30, "minute")
      .format("HH:mm")
      .toString();
  });

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
            const event = events.find((e) => e.time === time);
            return <TimelineEvent key={index} event={event} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
