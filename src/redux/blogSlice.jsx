import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    selectedBlog: "",
  },
  reducers: {
    setBlogs(state, action) {
      // console.log(action);
      state.blogs = action.payload;
      // console.log("state", state.blogs);
    },
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
});
export const blogActions = blogSlice.actions;
export default blogSlice;
