import { createSlice } from "@reduxjs/toolkit";

const newReviewSlice = createSlice({
  name: "newReview",
  initialState: {
    success: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    newReviewStart: (state) => {
      state.isFetching = true;
    },
    newReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.success = action.payload.success;
    },
    newReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    newReviewReset: (state) => {
      state.success = false;
      state.isFetching = false;
    },
  },
});

export const {
  newReviewStart,
  newReviewFailure,
  newReviewSuccess,
  newReviewReset,
} = newReviewSlice.actions;
export default newReviewSlice.reducer;
