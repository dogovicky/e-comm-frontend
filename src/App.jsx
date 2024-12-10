import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import VerifyOtp from "./pages/otp/VerifyOtp";
import Profile from "./pages/profile/Profile";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/CheckOut";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  const hideNavBar =
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/verify-otp";
  return (
    <>
      {!hideNavBar && <NavBar />}
      {children}
    </>
  );
};

function App() {
  const { state } = useContext(AuthContext);

  return (
    <>
      <div className="app">
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/verify-otp" element={<VerifyOtp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:title" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/orders/checkout"
                element={
                  <ProtectedRoute isAuthenticated={state.isAuthenticated}>
                    <CheckOut />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainLayout>
        </Router>
      </div>
    </>
  );
}

export default App;
