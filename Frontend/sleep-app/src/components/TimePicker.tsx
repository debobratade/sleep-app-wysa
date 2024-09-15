import React, { useState } from "react";

interface TimePickerProps {
  onTimeSelect: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelect }) => {
  const [time, setTime] = useState("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    onTimeSelect(time);
  };

  return (
    <div>
      <input type="time" value={time} onChange={handleTimeChange} />
      <button onClick={handleSubmit}>Select</button>
    </div>
  );
};

export default TimePicker;
