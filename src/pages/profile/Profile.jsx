import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { state, logout } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return navigate("/");
  }

  return (
    <>
      <div className="profile_page">
        <h4>This is your profile page</h4>
        <div className="profile_data">
          <h1>Welcome {user.email}</h1>
          <p>
            {user.first_name} {user.last_name}
          </p>
        </div>
        <button className="btn btn-dark" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
