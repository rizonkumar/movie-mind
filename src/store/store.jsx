import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvShowSlice";
import personReducer from "./reducers/personSlice";
import libraryReducer from "./reducers/librarySlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
    library: libraryReducer,
  },
});
