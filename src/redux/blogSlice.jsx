import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    selectedBlog: "",
    loading: false,
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
export const blogActions = blogSlice.actions;
export default blogSlice;
