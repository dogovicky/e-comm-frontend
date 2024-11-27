import React from "react";
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
            </Routes>
          </MainLayout>
        </Router>
      </div>
    </>
  );
}

export default App;
