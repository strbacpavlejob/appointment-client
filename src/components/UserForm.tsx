import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

interface FormData {
  startDate: Date;
  duration: number;
  patientName: string;
  description: string;
}

interface UserFormProps {
  onSuccess?: () => void; // Optional prop for success handling
  setSelectedDate: (date: Date) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess, setSelectedDate }) => {
  const validationSchema = Yup.object().shape({
    startDate: Yup.date().required("Date & time are required"),
    duration: Yup.number()
      .min(30, "Minimum duration is 30 minutes")
      .required("Duration is required"),
    patientName: Yup.string().required("Patient name is required"),
    description: Yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      startDate: new Date(),
      duration: 30,
      patientName: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3000/appointments/schedule", {
        ...data,
        startDate: data.startDate.toISOString(),
      });
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
    <form
      className="p-4 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Date & Time</label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
                if (date) setSelectedDate(date);
              }}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded"
              minDate={new Date()}
            />
          )}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">
          Duration (minutes)
        </label>
        <input
          type="number"
          {...register("duration")}
          min="30"
          step="30"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Patient Name</label>
        <input
          type="text"
          {...register("patientName")}
          placeholder="Enter patient's name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.patientName && (
          <p className="text-red-500 text-sm">{errors.patientName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Description</label>
        <textarea
          {...register("description")}
          placeholder="Enter a description"
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default UserForm;
