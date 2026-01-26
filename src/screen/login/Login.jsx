import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../navigation/AuthContext";
import { showSuccess, showError } from "../../services/utils/toastUtil";
import { DiAndroid } from "react-icons/di";
import { FaApple } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const otpRef = useRef([]);
  const navigate = useNavigate();

  const { sendOtp, verifyOtp, showOtp } = useAuth();

  /* ✅ OTP CHANGE (ONLY NUMBER + AUTO FOCUS) */
  const handleOtpChange = (e, i) => {
    const val = e.target.value;

    // only single digit number
    if (!/^[0-9]?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);

    if (val && i < 5) {
      otpRef.current[i + 1]?.focus();
    }
  };

  /* ✅ BACKSPACE FIX (ONLY CURRENT BOX CLEAR) */
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[i]) {
        newOtp[i] = "";
        setOtp(newOtp);
      } else if (i > 0) {
        otpRef.current[i - 1]?.focus();
        newOtp[i - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await sendOtp(email);
      showSuccess(res.message);
    } catch {
      showError("Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await verifyOtp(email, otp.join(""));
      showSuccess("Login successful");
      navigate("/", { replace: true });
    } catch {
      showError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bajaj-login">
      {/* LEFT LOGIN CARD */}
      <div className="login-left">
        <div className="login-card">
          <h2>Sign-in to Bajaj Finserv</h2>

          {!showOtp ? (
            <>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small>An OTP will be sent to this email for verification</small>

              <button onClick={handleSendOtp} disabled={loading}>
                {loading ? "SENDING..." : "GET OTP"}
              </button>
            </>
          ) : (
            <>
              <p className="otp-info">Enter OTP sent to {email}</p>

              <div className="otp-box">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    value={val}
                    ref={(el) => (otpRef.current[i] = el)}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    maxLength="1"
                    inputMode="numeric"     /* ✅ numeric keyboard */
                    pattern="[0-9]*"        /* ✅ force number */
                    type="text"             /* ❗ keep text to avoid keyboard jump */
                  />
                ))}
              </div>

              <button onClick={handleVerifyOtp} disabled={loading}>
                {loading ? "VERIFYING..." : "VERIFY OTP"}
              </button>
            </>
          )}

          <p className="footer-text">
            Basic details of your relationship(s) including our group companies
            are displayed on this page.
          </p>
        </div>
      </div>

      {/* RIGHT INFO SECTION */}
      <div className="login-right">
        <h1>Welcome!</h1>
        <p>
          Access and manage all your Bajaj Finserv services in one place. Sign in
          to view your account details, track loans and EMIs, explore personalised
          offers, download documents, and much more.
        </p>

        <div className="app-section">
          <p className="app-text">
            Download our app for a personalised experience
          </p>
          <div className="store-icons">
            <DiAndroid size={24} />
            <FaApple size={24} />
          </div>
        </div>

        <div className="ratings">
          <div>
            <strong>4.9 ★</strong>
            <span>ANDROID</span>
          </div>
          <div>
            <strong>4.7 ★</strong>
            <span>iOS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
