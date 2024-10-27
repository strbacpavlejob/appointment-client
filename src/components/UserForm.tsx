import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UserFormProps {
  onSubmit: (data: {
    startDate: Date;
    duration: number;
    patientName: string;
    description: string;
  }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [duration, setDuration] = useState<number>(30);
  const [patientName, setPatientName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate) {
      onSubmit({
        startDate,
        duration,
        patientName,
        description,
      });
    }
  };

  return (
    <form className="p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Date & Time</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">
          Duration (minutes)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) =>
            setDuration(
              Math.max(30, Math.floor(Number(e.target.value) / 30) * 30)
            )
          }
          min="30"
          step="30"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient's name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
