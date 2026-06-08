import { createSlice } from "@reduxjs/toolkit";

const loadState = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    return {};
  }
};

const saveState = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  favorites: loadState("favorites"),
  watchlist: loadState("watchlist"),
  watched: loadState("watched"),
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const { id } = item;
      if (state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = item;
      }
      saveState("favorites", state.favorites);
    },
    toggleWatchlist: (state, action) => {
      const item = action.payload;
      const { id } = item;
      if (state.watchlist[id]) {
        delete state.watchlist[id];
      } else {
        state.watchlist[id] = item;
        if (state.watched[id]) {
          delete state.watched[id];
          saveState("watched", state.watched);
        }
      }
      saveState("watchlist", state.watchlist);
    },
    toggleWatched: (state, action) => {
      const item = action.payload;
      const { id } = item;
      if (state.watched[id]) {
        delete state.watched[id];
      } else {
        state.watched[id] = item;
        if (state.watchlist[id]) {
          delete state.watchlist[id];
          saveState("watchlist", state.watchlist);
        }
      }
      saveState("watched", state.watched);
    },
  },
});

export const { toggleFavorite, toggleWatchlist, toggleWatched } = librarySlice.actions;

export default librarySlice.reducer;
