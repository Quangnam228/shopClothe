import { toast } from "react-toastify";
import { loginSuccess as loginSuccessAdmin } from "../redux/useReduxAdmin";
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
import { useNavigate } from "react-router-dom";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if (res.data) {
      toast.success("login successfully");
    }
    dispatch(loginSuccess(res.data));
    dispatch(loginSuccessAdmin(res.data));
  } catch (error) {
    toast.error("Something went wrong!");
    dispatch(loginFailure());
  }
};

// register
export const register = async (dispatch, user) => {
  dispatch(addUserStart());
  let boolean = false;
  try {
    const res = await publicRequest.post(`/auth/register`, user);
    // const member = [`"${res.data.user._id}"`, "61dbdc1246405e02170092a9"];
    const members = {
      senderId: `${res.data.user._id}`,
      receiverId: "61dbdc1246405e02170092a9",
    };
    await publicRequest.post("/conversations", members);
    console.log(res);
    if (res.data) {
      console.log(res.data);
      toast.success("Register successfully");
      boolean = true;
    }
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    console.log(boolean);
    if (boolean === false) {
      toast.error("User already exits");
    }
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
    // toast.warning("You have not entered all the information");
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
//delete order
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const getAllUser = async (dispatch) => {
  dispatch(getAllUserStart());
  try {
    const res = await publicRequest.get("/users/allUser");
    console.log(res.data);
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

export const getAllProduct = async (
  keyword,
  currentPage = 1,
  price = [0, 10000],
  category,
  ratings = 0,
  size,
  color,
  dispatch
) => {
  dispatch(getAllProducts());
  try {
    let link = `http://localhost:5000/products/get/filter?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&size=${size}&color=${color}`;

    const { data } = await publicRequest.get(link);

    dispatch(getAllProductsSuccess(data));
  } catch (error) {
    dispatch(getAllProductsFail());
  }
};
