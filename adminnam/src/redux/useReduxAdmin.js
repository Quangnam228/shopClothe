import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
  name: "use",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStartAdmin: (state) => {
      state.isFetching = true;
    },
    loginSuccessAdmin: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailureAdmin: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStartAdmin, loginFailureAdmin, loginSuccessAdmin } =
  useSlice.actions;
export default useSlice.reducer;
