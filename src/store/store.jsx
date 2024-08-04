import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvShowSlice";
import personReducer from "./reducers/personSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});
