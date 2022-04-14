import {
  loginFailure,
  loginStart,
  loginSuccess,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./useRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

// register
export const register = async (dispatch, user) => {
  dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};
