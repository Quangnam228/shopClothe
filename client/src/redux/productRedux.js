import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    searchProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { searchProduct } = productSlice.actions;
export default productSlice.reducer;
