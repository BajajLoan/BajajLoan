import { createContext, useContext, useEffect, useState } from "react";
import { sendOtpApi, verifyOtpApi } from "../services/authApi";

const AuthContext = createContext(null);

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [token, setToken] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
  };

  const setAutoLogout = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = payload.exp * 1000 - Date.now();

      if (expiryTime > 0) {
        setTimeout(() => {
          logout();
        }, expiryTime);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  // AUTO LOGIN ON REFRESH
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) return;

    if (isTokenExpired(storedToken)) {
      logout();
    } else {
      setToken(storedToken);
      setAutoLogout(storedToken);
    }
  }, []);

  const sendOtp = async (email) => {
    const res = await sendOtpApi(email);
    localStorage.setItem("email", email);
    setShowOtp(true);
    return res;
  };

  const verifyOtp = async (email, otp) => {
    const res = await verifyOtpApi(email, otp);
    localStorage.setItem("token", res.token);
    setToken(res.token);
    setAutoLogout(res.token);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{ sendOtp, verifyOtp, token, showOtp, setShowOtp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
