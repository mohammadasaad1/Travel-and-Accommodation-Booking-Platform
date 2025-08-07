import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../layouts/Dashboard";
import SearchPage from "../pages/search/searchPage";
import Home from "../pages/home/Home";
import HotelPage from "../pages/hotel/HotelPage";
import PaymentPage from "../pages/payment/PaymentPage";
import AdminPage from "../pages/admin/AdminPage";
const AppRouter: React.FC<{}> = () => {
  const isAuthenticated = true;
  const isAdmin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            isAuthenticated ? (
              isAdmin ? (
                <AdminPage />
              ) : (
                <Dashboard
                  pathname="home"
                  navigated={true}
                  children={<Home />}
                />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/search"
          element={
            <Dashboard
              pathname="home"
              navigated={true}
              children={<SearchPage />}
            />
          }
        />
        <Route path="/hotels/:hotelId" element={<HotelPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
