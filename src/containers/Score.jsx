import React from "react";

import { useNavigate } from "react-router-dom";

const Score = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Score</h1>
      <button onClick={() => navigate("/")}>Retourner a l'accueil</button>
    </>
  );
};

export default Score;
