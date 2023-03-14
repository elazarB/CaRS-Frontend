import React from "react";

import { useStateContext } from "../../contexts/contextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  margin,
  classN,
  onClick
}) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => {
        setIsClicked(initialState) 
        onClick();
      }}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} m${margin} ${classN}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;