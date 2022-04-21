import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateProfileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.user = action.payload.dataUpdate;
    },
    updateProfileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updatePasswordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.user = action.payload.user;
      state.currentUser.accessToken = action.payload.data.accessToken;
    },
    updatePasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetUser: (state) => {
      state.currentUser = false;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  resetUser,
} = useSlice.actions;
export default useSlice.reducer;
