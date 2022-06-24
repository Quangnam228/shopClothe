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
    searchProduct: null,
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
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    getAllProductsFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getFilterProduct: (state, action) => {
      state.searchProduct = action.payload;
      console.log(state.searchProduct);
    },
  },
});

export const {
  searchProduct,
  getAllProducts,
  getAllProductsSuccess,
  getAllProductsFail,
  getFilterProduct,
} = productSlice.actions;
export default productSlice.reducer;
