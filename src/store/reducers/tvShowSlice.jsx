import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  loading: false,
  error: null,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    removetv: (state) => {
      state.info = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loadtv, removetv, setLoading, setError } = tvSlice.actions;

export default tvSlice.reducer;
