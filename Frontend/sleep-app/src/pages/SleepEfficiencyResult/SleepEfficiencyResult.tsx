// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../components/Button';

// const SleepEfficiencyResult: React.FC = () => {
//   const navigate = useNavigate();

//   const handleNext = () => {
//     // Implement next action or navigation
//   };

//   return (
//     <div className="text-center">
//       <h1>Your sleep efficiency is 89%</h1>
//       <p>More details to be added...</p>
//       <Button onClick={handleNext} />
//     </div>
//   );
// };

// export default SleepEfficiencyResult;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SleepEfficiencyResult.css";
const SleepEfficiencyResult: React.FC = () => {
  const [sleepEfficiency, setSleepEfficiency] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      const storedEfficiency = localStorage.getItem("sleepEfficiency");
      if (storedEfficiency) {
        setSleepEfficiency(storedEfficiency);
      } else {
        navigate("/sleep-hours"); // Redirect if no result found
      }
    };

    fetchResult();
  }, [navigate]);

  return (
    <div className="page-container">
      {sleepEfficiency ? (
        <div className="result">
          <h2 style={{padding:'4px', margin:"20px"}}>You seem to have a sleep efficiency of {sleepEfficiency}%</h2>
          <h2 style={{padding:'4px', margin:"20px"}}>That's good 😎</h2>
          <h2 style={{padding:'4px', margin:"20px"}}>
            A higher sleep efficiency score means a more refreshing and
            energizing sleep, which can help you move into your day with a sense
            of lightness and ease.
          </h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SleepEfficiencyResult;
