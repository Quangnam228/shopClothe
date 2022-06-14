import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product, index) => index !== action.payload);
      state.quantity -= 1;
      state.total = 0;
      state.products.forEach((item) => {
        state.total += item.price * item.quantity;
      });
    },
    deleteAllProduct: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    incCountProduct: (state, action) => {
      state.products[action.payload].quantity += 1;
      state.total += state.products[action.payload].price;
    },
    desCountProduct: (state, action) => {
      state.products[action.payload].quantity -= 1;
      state.total -= state.products[action.payload].price;
    },
  },
});

export const { addProduct, deleteProduct, incCountProduct, desCountProduct, deleteAllProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
