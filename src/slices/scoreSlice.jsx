import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scoreData: JSON.parse(localStorage.getItem("score")) || [],
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScore: (state, action) => {
      const { score } = action.payload;
      if (score.name === "") {
        score.name = "Unknown";
      }
      const updatedScore = [...state.scoreData];
      updatedScore.push(score);
      localStorage.setItem("score", JSON.stringify(updatedScore));
      return {
        ...state,
        scoreData: updatedScore,
      };
    },
  },
});

export const { addScore } = scoreSlice.actions;

export const selectScore = (state) => state.score.scoreData;

export default scoreSlice.reducer;
