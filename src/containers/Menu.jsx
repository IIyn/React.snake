import React from "react";

import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  // function to randomize between 0 and 600 with a step of 20
  const randomize = (min, max, step) => {
    return Math.floor((Math.random() * (max - min) + min) / step) * step;
  };

  return (
    <>
      <h1>Menu</h1>
      <button onClick={() => navigate("/game")}>Play</button>
      <button onClick={() => navigate("/score")}>Score</button>
    </>
  );
};

export default Menu;
