import React, { createContext, useEffect, useReducer } from "react";
import { authReducer, initialState } from "../reducer/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //load initialState from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: { user: user, token },
      });
    }
  }, []);

  const signup = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    dispatch({
      type: "SIGNUP",
      payload: { user, token },
    });
  };

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: { user, token },
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
