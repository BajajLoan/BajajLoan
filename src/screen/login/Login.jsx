import { useRef, useState } from "react";
// import axios from "axios";
import "./Login.css";
import { useAuth } from "../../navigation/AuthContext";

export default function Login() {
  // const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const otpRef = useRef([]);
  const {sendOtp,verifyOtp,showOtp,setShowOtp}=useAuth();
  console.log(showOtp)
  const handleOtpChange = (e, i) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);

    if (value && i < 5) {
      otpRef.current[i + 1].focus();
    }
  };

  // 🔹 SEND OTP
  const handleSendOtp = async () => {
  try {
    setLoading(true);
    const res = await sendOtp(email);
    alert(res.message);
    setShowOtp(true);
  } catch (err) {
    alert(err.response?.data?.message || "Error sending OTP");
  } finally {
    setLoading(false);
  }
};


//verify-otp
const handleVerifyOtp = async () => {
  try {
    setLoading(true);
    const enteredOtp = otp.join("");
    await verifyOtp(email, enteredOtp);
    alert("Login Success ✅");
  } catch (err) {
    alert(err.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container">
      <div className="card">
        <h2>Email Login</h2>

        {!showOtp ? (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="primary" onClick={()=>{sendOtp(email)}} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <p className="otp-text">Enter OTP sent to {email}</p>

            <div className="otp-box">
              {otp.map((_, i) => (
                <input
                  key={i}
                  maxLength="1"
                  ref={(el) => (otpRef.current[i] = el)}
                  onChange={(e) => handleOtpChange(e, i)}
                />
              ))}
            </div>

            <button className="primary" onClick={()=>{verifyOtp(email, otp);}} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button className="link" onClick={() => setShowOtp(false)}>
              Change Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
