import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Setting from "../pages/Setting";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="setting" element={<Setting />} />
        <Route path="/:id" element={<Blog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
