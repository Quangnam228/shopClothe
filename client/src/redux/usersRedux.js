import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //get
    getAllUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getAllUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getAllUserStart, getAllUserSuccess, getAllUserFailure } =
  usersSlice.actions;
export default usersSlice.reducer;
