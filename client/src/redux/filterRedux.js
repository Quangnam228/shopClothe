import { createSlice } from "@reduxjs/toolkit";

const filterRedux = createSlice({
  name: "filterRedux",
  initialState: {
    searchProduct: null,
  },
  reducers: {
    getFilterProduct: (state, action) => {
      state.searchProduct = action.payload;
    },
    resetSearch: (state) => {
      state.searchProduct = "";
    },
  },
});

export const { getFilterProduct, resetSearch } = filterRedux.actions;
export default filterRedux.reducer;
