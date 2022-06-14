import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    productsCount: null,
    resultPerPage: null,
    filteredProductsCount: null,
  },
  reducers: {
    searchProduct: (state, action) => {
      state.products = action.payload;
    },
    getAllProducts: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getAllProductsFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { searchProduct, getAllProducts, getAllProductsSuccess, getAllProductsFail } =
  productSlice.actions;
export default productSlice.reducer;
