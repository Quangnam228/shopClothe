import { createSlice } from "@reduxjs/toolkit";

const dataOrderSlice = createSlice({
  name: "dataOrder",
  initialState: {
    dataOrder: {},
  },
  reducers: {
    dataSuccess: (state, action) => {
      state.dataOrder = action.payload;
    },
  },
});

export const { dataSuccess } = dataOrderSlice.actions;
export default dataOrderSlice.reducer;
