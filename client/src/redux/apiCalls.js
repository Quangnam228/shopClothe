import {
  loginFailure,
  loginStart,
  loginSuccess,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from "./useRedux";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
} from "./orderRedux";
import { publicRequest, userRequest } from "../requestMethods";

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

// update profile
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateProfileStart());
  try {
    await userRequest.put(`/users/update/${id}`, user);
    dispatch(updateProfileSuccess({ user }));
  } catch (err) {
    dispatch(updateProfileFailure());
  }
};

// ORDERRRRRRRRRRRR
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    // await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};
