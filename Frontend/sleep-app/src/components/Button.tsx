import React from "react";

interface ButtonProps {
  onClick: () => void;
  hidden?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, hidden }) => {
  return (
    <button onClick={onClick} className={hidden ? "hidden" : ""}>
      Next
    </button>
  );
};

export default Button;
