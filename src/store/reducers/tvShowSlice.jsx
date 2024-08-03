import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const tvShowSlice = createSlice({
  name: "Tv Show",
  initialState,
  reducers: {
    loadTv: (state, action) => {
      state.info = action.payload;
    },
    removeTv: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadTv, removeTv } = tvShowSlice.actions;

export default tvShowSlice.reducer;
