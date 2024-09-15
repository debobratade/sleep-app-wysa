import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeKeeper from "react-timekeeper";
import NextButton from "../components/NextButton";

const WakeTime: React.FC = () => {
  const [wakeTime, setWakeTime] = useState<string | null>(null);
  const [showClock, setShowClock] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTimeChange = (newTime: { formatted12: string }) => {
    setWakeTime(newTime.formatted12);
  };

  const handleNext = () => {
    localStorage.setItem("wakeTime", wakeTime || "");
    navigate("/sleep-hours");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
      <h2 style={{ padding: "4px", margin: "20px" }}>
        What time do you wake up?
      </h2>

      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          display: "inline-block",
          cursor: "pointer",
          fontSize: "18px",
        }}
        onClick={() => setShowClock(true)}
      >
        {wakeTime ? wakeTime : "Select time"}
      </div>

      {showClock && (
        <div
          style={{
            marginTop: "20px",
            transform: "scale(0.75)",
            transformOrigin: "top center",
          }}
        >
          <TimeKeeper
            time={wakeTime || "10:00 AM"}
            onChange={(newTime: any) => handleTimeChange(newTime)}
            onDoneClick={() => setShowClock(false)} 
            switchToMinuteOnHourSelect
          />
        </div>
      )}

      {wakeTime && <NextButton onClick={handleNext} />}
    </div>
  );
};

export default WakeTime;
