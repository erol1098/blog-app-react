import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {},
    db: {},
    userInfo: {},
  },
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setDb(state, action) {
      state.db = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
