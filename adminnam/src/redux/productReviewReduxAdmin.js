import { createSlice } from "@reduxjs/toolkit";

const productReviewSlice = createSlice({
  name: "productReview",
  initialState: {
    productReview: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    productReviewStart: (state) => {
      state.isFetching = true;
    },
    productReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.productReview = action.payload;
    },
    productReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteReviewStart: (state) => {
      state.isFetching = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.productReview.splice(
        state.productReview.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetReviewStart: (state) => {
      state.isFetching = true;
    },
    resetReviewSuccess: (state) => {
      state.isFetching = false;
      state.productReview = [];
    },
    resetReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  productReviewStart,
  productReviewFailure,
  productReviewSuccess,
  deleteReviewStart,
  deleteReviewFailure,
  deleteReviewSuccess,
  resetReviewStart,
  resetReviewSuccess,
  resetReviewFailure,
} = productReviewSlice.actions;
export default productReviewSlice.reducer;
