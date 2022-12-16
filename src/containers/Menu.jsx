import React from "react";

import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="basic-menu">
      <h1>React.snake</h1>
      <button onClick={() => navigate("/game")}>Play</button>
      <button onClick={() => navigate("/score")}>Scores</button>
    </div>
  );
};

export default Menu;
