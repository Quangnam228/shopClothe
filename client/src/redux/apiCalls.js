import { toast } from "react-toastify";
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
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
} from "./useRedux";
import {
  getAllUserStart,
  getAllUserSuccess,
  getAllUserFailure,
} from "./usersRedux";
import {
  newReviewStart,
  newReviewFailure,
  newReviewSuccess,
} from "./newReviewRedux";

import {
  getAllProducts,
  getAllProductsSuccess,
  getAllProductsFail,
} from "./productRedux";
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
    // const member = [`"${res.data.user._id}"`, "61dbdc1246405e02170092a9"];
    const members = {
      senderId: `${res.data.user._id}`,
      receiverId: "61dbdc1246405e02170092a9",
    };
    await publicRequest.post("/conversations", members);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

// update profile
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateProfileStart());
  try {
    toast.success("Update profile successfully");
    let res = await userRequest.put(`/users/update/${id}`, user);
    const dataUpdate = res.data.updateUser;
    dispatch(updateProfileSuccess({ dataUpdate, user }));
  } catch (err) {
    dispatch(updateProfileFailure());
    toast.warning("You have not entered all the information");
  }
};

// update password
export const updatePassword = async (id, data, dispatch) => {
  let boolean = false;
  dispatch(updatePasswordStart());
  try {
    const user = await userRequest.put(`/users/update/password/${id}`, data);
    if (user) {
      toast.success("Password update successfully");
      boolean = true;
    }
    dispatch(updatePasswordSuccess(user.data));

    console.log(boolean);
  } catch (err) {
    console.log(boolean);
    dispatch(updatePasswordFailure());
    if (boolean === false) {
      toast.error("Password update successfully");
    }
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

export const getAllUser = async (dispatch) => {
  dispatch(getAllUserStart());
  try {
    const res = await publicRequest.get("/users/allUser");
    dispatch(getAllUserSuccess(res.data));
  } catch (error) {
    dispatch(getAllUserFailure());
  }
};

export const newReview = async (reviewData, dispatch) => {
  dispatch(newReviewStart());
  try {
    const res = await publicRequest.put(`/products/review/item`, reviewData);
    dispatch(newReviewSuccess(res.data));
    toast.success("Add review successfully");
  } catch (error) {
    dispatch(newReviewFailure());
    toast.warning(
      "You cannot rate this product. because you haven't bought it yet"
    );
  }
};

export const getAllProduct = async (products, dispatch) => {
  dispatch(getAllProducts());
  try {
    // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    //   if (category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    //   }

    dispatch(getAllProductsSuccess(products));
  } catch (error) {
    dispatch(getAllProductsFail());
  }
};
