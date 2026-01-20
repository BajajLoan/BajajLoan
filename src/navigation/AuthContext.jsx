import { createContext, useContext, useEffect, useState } from "react";
import { sendOtpApi, verifyOtpApi } from "../services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [token, setToken] = useState(null);

  // 🔥 AUTO LOGIN ON REFRESH
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const sendOtp = async (email) => {
    const res = await sendOtpApi(email);
    setShowOtp(true);
    return res;
  };

  const verifyOtp = async (email, otp) => {
    const res = await verifyOtpApi(email, otp);
    localStorage.setItem("token", res.token);
    setToken(res.token); // 🔥 THIS CAUSES APP RE-RENDER
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
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
