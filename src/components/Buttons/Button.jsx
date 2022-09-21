import React from "react";
import "./Button.css";

const STYLES = [
  "headerbutton",
  "primary",
  "formulary",
  "new",
  "edit",
  "delete",
  "artist",
];

const SIZES = ["diminute","small", "medium", "large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <div>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
