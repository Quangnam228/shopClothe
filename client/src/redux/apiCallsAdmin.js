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
import { toast } from "react-toastify";

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
    // await userRequest.delete(`/products/${id}`);
    await userRequest.put(`/products/trash/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/products/${id}`, product);
    toast.success("update product successfully");
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    toast.success("created product successfully");
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// USERRRRRRRR
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    // await userRequest.delete(`/users/${id}`);
    await userRequest.put(`/users/trash/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    await userRequest.put(`/users/update/${id}`, user);
    toast.success("Update profile successfully");
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    console.log(err);
    dispatch(updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  // dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register/admin`, user);
    console.log(res.data.success);
    if (res.data.success === true) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    const members = {
      senderId: `${res.data?.user._id}`,
      receiverId: "61dbdc1246405e02170092a9",
    };
    await publicRequest.post("/conversations", members);

    // dispatch(addUserSuccess(res.data));
  } catch (err) {
    // dispatch(addUserFailure());
    console.log(err);
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
    await userRequest.delete(`/orders/${id}`);
    toast.success("delete order successfully");
    // await userRequest.put(`/orders/trash/${id}`);
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
