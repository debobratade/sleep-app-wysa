import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeKeeper from "react-timekeeper";
import NextButton from "../components/NextButton";

const Bedtime: React.FC = () => {
  const [bedtime, setBedtime] = useState<string | null>(null);
  const [showClock, setShowClock] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTimeChange = (newTime: { formatted12: string }) => {
    setBedtime(newTime.formatted12);
  };

  const handleNext = () => {
    localStorage.setItem("bedTime", bedtime || "");
    navigate("/waketime");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
      <h2 style={{ padding: "4px", margin: "20px" }}>
        What time do you go to bed?
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
        {bedtime ? bedtime : "Select time"}
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
            time={bedtime || "10:00 PM"}
            onChange={(newTime: any) => handleTimeChange(newTime)}
            onDoneClick={() => setShowClock(false)}
            switchToMinuteOnHourSelect
          />
        </div>
      )}

      {bedtime && <NextButton onClick={handleNext} />}
    </div>
  );
};

export default Bedtime;
