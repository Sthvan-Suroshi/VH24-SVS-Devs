import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import institutionReducer from "./slices/institutionSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    institution: institutionReducer,
  },
});

export default store;
