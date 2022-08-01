import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import blogSlice from "./blogSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    blogs: blogSlice.reducer,
  },
});
export default store;
