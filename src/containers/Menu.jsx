import React from "react";

import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Menu</h1>
      <button onClick={() => navigate("/game")}>Play</button>
      <button onClick={() => navigate("/score")}>Scores</button>
    </>
  );
};

export default Menu;
