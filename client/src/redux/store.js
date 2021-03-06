import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./useRedux";
import usersReducer from "./usersRedux";
import productReducer from "./productRedux";
import dataOrderReducer from "./dataOrder";
import orderReducer from "./orderRedux";
import newReviewReducer from "./newReviewRedux";
import filterReducer from "./filterRedux";
//admin
import userReducerAdmin from "./useReduxAdmin";
import productReducerAdmin from "./productReduxAdmin";
import orderReducerAdmin from "./orderReduxAdmin";
import usersReducerAdmin from "./usersReduxAdmin";
import productReviewReducerAdmin from "./productReviewReduxAdmin";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  cart: cartReducer,
  product: productReducer,
  dataOrder: dataOrderReducer,
  order: orderReducer,
  newReview: newReviewReducer,
  filter: filterReducer,
  //admin
  userAdmin: userReducerAdmin,
  usersAdmin: usersReducerAdmin,
  productAdmin: productReducerAdmin,
  orderAdmin: orderReducerAdmin,
  productReviewAdmin: productReviewReducerAdmin,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
