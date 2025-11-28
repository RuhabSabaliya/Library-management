import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

// configureStore automatically sets up good defaults for Redux
export const store = configureStore({
  reducer: {
    // We have only one slice here: 'books'
    books: bookReducer,
  },
});

// We export the store and import it in App.js
export default store;
