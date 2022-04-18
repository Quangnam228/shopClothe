import { createSlice } from "@reduxjs/toolkit";

const newReviewSlice = createSlice({
  name: "newReview",
  initialState: {
    newReview: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    newReviewStart: (state) => {
      state.isFetching = true;
    },
    newReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.newReview = action.payload;
    },
    newReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    newReviewReset: (state, action) => {
      state.newReview = action.payload;
    },
  },
});

export const { newReviewStart, newReviewFailure, newReviewSuccess } =
  newReviewSlice.actions;
export default newReviewSlice.reducer;
