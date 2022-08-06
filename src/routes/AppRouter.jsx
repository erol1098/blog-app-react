import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import { createTheme } from "@mui/material/styles";
import { teal, orange } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
const theme = createTheme({
  palette: {
    primary: {
      main: teal[700],
    },
    secondary: {
      main: orange[500],
    },
  },
});

const AppRouter = () => {
  const dispatch = useDispatch();
  const { auth, db, userInfo } = useFirebase();
  const { getData } = useBlog();

  useEffect(() => {
    getData();
  }, [getData]);

  dispatch(authActions.setAuth(auth));
  dispatch(authActions.setDb(db));
  dispatch(authActions.setUserInfo(userInfo));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Blog />} />
          {userInfo ? (
            <Route path="post" element={<Post />} />
          ) : (
            <Route path="post" element={<Navigate to={"/login"} />} />
          )}

          <Route path="setting" element={<Setting />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
