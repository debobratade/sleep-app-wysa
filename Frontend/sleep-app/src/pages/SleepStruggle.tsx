import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/NextButton";
import "./SleepStruggle.css";

const SleepStruggle: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    localStorage.setItem("sleepStruggle", selectedOption || "");
    navigate("/bedtime");
  };

  return (
    <div className="page-container">
      <h2 style={{ padding: "4px", margin: "20px" }}>
        How long have you been struggling with your sleep?
      </h2>
      <div className="options">
        <button
          className={`option-button ${
            selectedOption === "Less than 2 weeks" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("Less than 2 weeks")}
        >
          Less than 2 weeks
        </button>
        <button
          className={`option-button ${
            selectedOption === "2 to 8 weeks" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("2 to 8 weeks")}
        >
          2 to 8 weeks
        </button>
        <button
          className={`option-button ${
            selectedOption === "More than 8 weeks" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("More than 8 weeks")}
        >
          More than 8 weeks
        </button>
      </div>
      {selectedOption && <NextButton onClick={handleNext} />}
    </div>
  );
};

export default SleepStruggle;
