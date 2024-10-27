import "./index.css";
import Timeline from "./components/Timeline";
import UserForm from "./components/UserForm";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/appointments/by-date`,
        {
          params: { date: selectedDate },
        }
      );
      setData(response.data);
    } catch (error) {
      alert(`An error occurred while fetching data: ${JSON.stringify(error)}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <UserForm
        onSuccess={async () => await fetchData()}
        setSelectedDate={setSelectedDate}
      />
      <Timeline data={data} />
    </div>
  );
};

export default App;
