import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/NextButton";

const SleepHours: React.FC = () => {
  const [sleepHours, setSleepHours] = useState<number>(6);
  const navigate = useNavigate();

  const handleHourClick = (hour: number) => {
    setSleepHours(hour);
  };

  const handleNext = async () => {
    const sleepGoal = localStorage.getItem("sleepGoal");
    const userId = localStorage.getItem("id");
    const sleepStruggle = localStorage.getItem("sleepStruggle");
    const bedTime = localStorage.getItem("bedTime");
    const wakeTime = localStorage.getItem("wakeTime");
    const token = localStorage.getItem("token");

    const parseTime = (time: string | null) => {
      if (time) {
        const [hour, minute, format] = time.split(/[:\s]/);
        return {
          hour: parseInt(hour, 10),
          minute: parseInt(minute, 10),
          format,
        };
      }
      return { hour: 0, minute: 0, format: "AM" };
    };

    const bedTimeParsed = parseTime(bedTime);
    const wakeTimeParsed = parseTime(wakeTime);

    const payload = {
      userId: userId,
      sleepGoal,
      sleepStruggle,
      sleepHours,
      bedtime: {
        hour: bedTimeParsed.hour,
        minute: bedTimeParsed.minute,
        format: bedTimeParsed.format,
      },
      wakeTime: {
        hour: wakeTimeParsed.hour,
        minute: wakeTimeParsed.minute,
        format: wakeTimeParsed.format,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/sleep/sleep-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.warn(result.parse);
      localStorage.setItem("sleepEfficiency", result.sleep_efficiency);
      navigate("/sleep-efficiency-result");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
      <h2 style={{ padding: "4px", margin: "20px" }}>
        How many hours do you sleep?
      </h2>
      <div className="scrollable-list">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hour) => (
          <div
            key={hour}
            className={`hour-item ${hour === sleepHours ? "selected" : ""}`}
            onClick={() => handleHourClick(hour)}
          >
            {hour}hr{hour > 1 ? "s" : ""}
          </div>
        ))}
      </div>
      <div>Hours Slept: {sleepHours}</div>
      <NextButton onClick={handleNext} />
    </div>
  );
};

export default SleepHours;
