import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./Login.css";

const Login: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    if (nickname && password) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  };

  const handleNext = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/check-and-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.userId);
        alert(data.message);
        navigate("/sleep-efficiency");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="wraper">
      <div className="wysa-heading">
        <h2>
          Hey! I'm <span style={{ color: "#12ba60" }}>Wysa</span>
        </h2>
        <p>Our conversations are private & anonymous, so there is no login. </p>
        <p>Just choose a nickname & password and we're good to go. </p>
      </div>
      <div className="login-container">
        <div className="login-box">
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              handleChange();
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange();
            }}
          />
          <Button onClick={handleNext} hidden={!isButtonVisible} />
        </div>
      </div>
      <p style={{ padding: "3px", textAlign: "center" }}>
        By continuing, I confirm I am 13 or older and accept the
        <span> </span>
        <span style={{ color: "#12ba60", textDecoration: "underline" }}>
          Terms of Services
        </span>
        <span> </span>
        and
        <span> </span>
        <span style={{ color: "#12ba60", textDecoration: "underline" }}>
          Privacy Policy
        </span>
      </p>
    </div>
  );
};

export default Login;
