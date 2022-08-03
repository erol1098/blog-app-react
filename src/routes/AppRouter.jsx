import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Setting from "../pages/Setting";
import { useDispatch } from "react-redux";
import useFirebase from "../hooks/useFirebase";
import { authActions } from "../redux/authSlice";
import Post from "../components/Post";
import useBlog from "../hooks/useBlog";
import NotFound from "../pages/NotFound";
const AppRouter = () => {
  const dispatch = useDispatch();
  const { auth, db, userInfo } = useFirebase();
  dispatch(authActions.setData({ auth, db, userInfo }));
  const { getData } = useBlog();
  getData();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="setting" element={<Setting />} />
        <Route path=":id" element={<Blog />} />
        <Route path="post" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
