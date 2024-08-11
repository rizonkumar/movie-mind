import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  loading: false,
  error: null,
};

export const personSlice = createSlice({
  name: "person]",
  initialState,
  reducers: {
    loadperson: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeperson: (state) => {
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

export const { loadperson, removeperson, setLoading, setError } =
    personSlice.actions;

export default personSlice.reducer;
