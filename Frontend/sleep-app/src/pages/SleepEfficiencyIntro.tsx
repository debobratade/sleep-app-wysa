import React from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/NextButton";

const SleepEfficiencyIntro: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/sleep-goal");
  };

  return (
    <div className="text-center">
      <h2 style={{ padding: "4px", margin: "20px" }}>
        Let's start by calculating your sleep efficiency and examining your
        concerns.
      </h2>
      <h2 style={{ padding: "4px", margin: "20px" }}>
        Over time, we will work together to improve these.
      </h2>
      <NextButton onClick={handleNext} />
    </div>
  );
};

export default SleepEfficiencyIntro;
