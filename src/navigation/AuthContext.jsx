import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
     const [showOtp, setShowOtp] = useState(false);
     const [token,setToken]=useState(null)
  const sendOtp = async (email) => {
    console.log(email,"email")
    try {
    //   setLoading(true);
      const res = await axios.post("http://10.111.249.111:3000/api/auth/send-otp", {
        email,
      });
    //   console.log(JSON.parse(resizeTo))
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
       setToken(res.data.token)
      setShowOtp(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
    //   setLoading(false);
    }
  };

  // 🔹 VERIFY OTP
  const verifyOtp = async (email, otp) => {
    try {
    //   setLoading(true);
      const enteredOtp = otp.join("");

      const res = await axios.post(
        "http://10.111.249.111:3000/api/auth/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      alert("Login Success ✅");
      localStorage.setItem("token", res.data.token);
    //   console.log
      setToken(res.data.token)
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
    //   setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ sendOtp, verifyOtp,token, showOtp,setShowOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
