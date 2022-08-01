import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: "",
    db: "",
    userInfo: "",
  },
  reducers: {
    setData(state, action) {
      state.auth = action.payload.auth;
      state.db = action.payload.db;
      state.userInfo = action.payload.userInfo;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
