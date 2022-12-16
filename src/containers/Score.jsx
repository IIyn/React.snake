import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectScore } from "../slices/scoreSlice";

const Score = () => {
  const navigate = useNavigate();

  const scoreData = useSelector(selectScore);

  return (
    <div className="basic-menu">
      <h1>Scores</h1>
      <ul>
        {scoreData.map((score) => (
          <li key={score.id}>
            {score.name} : {score.points} points
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Retourner a l'accueil</button>
    </div>
  );
};

export default Score;
