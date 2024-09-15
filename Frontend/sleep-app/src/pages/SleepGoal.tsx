import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/NextButton";

const SleepGoal: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const options = [
    "I would go to sleep easily",
    "I would sleep through the night",
    "I'd wake up on time, refreshed",
  ];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    localStorage.setItem("sleepGoal", selectedOption || "");
    navigate("/sleep-struggle");
  };

  return (
    <div className="page-container">
      <h2 style={{ padding: "4px", margin: "20px" }}>
        In a few weeks, if you're sleeping well, what would change?
      </h2>
      <div className="options">
        {options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption && <NextButton onClick={handleNext} />}
    </div>
  );
};

export default SleepGoal;
