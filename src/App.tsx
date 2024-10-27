import "./index.css";
import Timeline from "./components/Timeline";
import UserForm from "./components/UserForm";

const App = () => {
  const handleFormSubmit = (data: {
    startDate: Date;
    duration: number;
    patientName: string;
    description: string;
  }) => {
    console.log("Form submitted:", data);
    // You can add further logic here, such as making an API call
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <UserForm onSubmit={handleFormSubmit} />
      <Timeline />
    </div>
  );
};

export default App;
