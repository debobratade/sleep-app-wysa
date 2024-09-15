import "./NextButton.css";

const NextButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="next-button" onClick={onClick}>
      <span className="arrow-icon">▼</span>
    </button>
  );
};

export default NextButton;
