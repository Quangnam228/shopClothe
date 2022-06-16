import { loginFailure, loginStart, loginSuccess } from "./useReduxAdmin";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productReduxAdmin";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./usersReduxAdmin";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} from "./orderReduxAdmin";
import {
  productReviewStart,
  productReviewFailure,
  productReviewSuccess,
  deleteReviewStart,
  deleteReviewFailure,
  deleteReviewSuccess,
  resetReviewStart,
  resetReviewSuccess,
  resetReviewFailure,
} from "./productReviewReduxAdmin";

// login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

// PRODUCTTTTTTT
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/admin");
    dispatch(getProductSuccess(res.data.products));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/products/${id}`, product);
    console.log(1);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// USERRRRRRRR
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    console.log(err);
    dispatch(updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
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

export const updateOrder = async (id, status, dispatch) => {
  dispatch(updateOrderStart());
  try {
    console.log(status);
    await userRequest.put(`/orders/status/${id}`, status);
    dispatch(updateOrderSuccess({ id, status }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};

export const getAllProductReview = async (id, dispatch) => {
  dispatch(productReviewStart());
  try {
    const res = await userRequest.get(`/products/reviews?id=${id}`);
    dispatch(productReviewSuccess(res.data.reviews));
  } catch (error) {
    dispatch(productReviewFailure());
  }
};

export const deleteReview = async (reviewId, productId, dispatch) => {
  dispatch(deleteReviewStart());
  try {
    await userRequest.delete(
      `/products/reviewDelete/review?id=${reviewId}&productId=${productId}`
    );
    dispatch(deleteReviewSuccess(reviewId));
  } catch (error) {
    dispatch(deleteReviewFailure());
  }
};

export const getResetReview = async (dispatch) => {
  dispatch(resetReviewStart());
  try {
    dispatch(resetReviewSuccess());
  } catch (error) {
    dispatch(resetReviewFailure());
  }
};
