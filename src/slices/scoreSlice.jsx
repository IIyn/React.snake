import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scoreData: [
    {
      id: 0,
      name: "John",
      points: 100,
    },
  ],
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScore: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addScore } = scoreSlice.actions;

export const selectScore = (state) => state.score.scoreData;

export default scoreSlice.reducer;
