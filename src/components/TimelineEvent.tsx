import { Event } from "../types/event";

interface TimelineEventProps {
  event: Event | undefined;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
  return (
    <div className="relative flex items-center h-10 border-b border-gray-200">
      {event && (
        <div
          className={`absolute inset-x-1 ${event.color} text-white text-sm flex items-center justify-center py-2 px-4 rounded-md shadow-md z-10`}
          style={{
            height: `${(event.duration / 30) * 2.5}rem`, // Adjust the height based on the duration
            top: "0",
          }}
        >
          {event.title}
        </div>
      )}
    </div>
  );
};
