import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(authToken ? jwtDecode(authToken) : null);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
