import React from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../components/NextButton";
import WysaImage from "../assets/wysa.png";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <img src={WysaImage} alt="wysa" />
        <h2 style={{ color: "#fff", padding: "4px", margin: "20px" }}>
          Hey! I'm <span style={{ color: "#12ba60" }}>Wysa</span>
        </h2>
        <p>I'm here to help you sleep better</p>
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
};

export default Home;
