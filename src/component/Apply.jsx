import { useState } from "react";
import "./Apply.css";

export default function Apply () {
  const [step, setStep] = useState(1);

  return (
    <><style>
      {
        `* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
  background: #f4f6f8;
}

/* MAIN LAYOUT */
.page-container {
  display: flex;
  min-height: 100vh;
}

/* FORM SIDE */
.form-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-card h3 {
  text-align: center;
  margin-bottom: 10px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

textarea {
  resize: none;
  height: 70px;
}

button {
  width: 100%;
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn-group button:first-child {
  background: #6b7280;
}

/* STEP INDICATOR */
.step-indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.step-indicator span {
  padding: 6px 12px;
  border-radius: 20px;
  background: #ddd;
  font-size: 13px;
}

.step-indicator .active {
  background: #4f46e5;
  color: white;
}

/* GUIDANCE SIDE */
.guidance {
  flex: 1;
  padding: 40px;
  background: #eef2ff;
}

.guidance h2 {
  margin-top: 0;
}

.guidance ul {
  padding-left: 18px;
}

.guidance li {
  margin-bottom: 8px;
}

.note {
  margin-top: 20px;
  color: #dc2626;
  font-weight: bold;
}

/* 📱 MOBILE */
@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
  }
}
`
      }
      </style>
    <div className="page-container">
      {/* LEFT SIDE – FORM */}
      <div className="form-wrapper">
        <div className="form-card">
          <div className="step-indicator">
            <span className={step >= 1 ? "active" : ""}>Personal</span>
            <span className={step >= 2 ? "active" : ""}>Bank</span>
            <span className={step >= 3 ? "active" : ""}>Documents</span>
          </div>

          {step === 1 && (
            <>
              <h3>Personal Details</h3>
              <input placeholder="First Name" />
              <input placeholder="Last Name" />
              <input type="date" />
              <input placeholder="Phone Number" />
              <input placeholder="Email" />
              <textarea placeholder="Address" />
              <button onClick={() => setStep(2)}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Bank Details</h3>
              <input placeholder="Account Holder Name" />
              <input placeholder="Account Number" />
              <input placeholder="IFSC Code" />
              <div className="btn-group">
                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={() => setStep(3)}>Next</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Documents</h3>
              <input placeholder="Aadhaar Number" />
              <input placeholder="PAN Number" />
              <label>Aadhaar Image</label>
              <input type="file" />
              <label>PAN Image</label>
              <input type="file" />

              <div className="btn-group">
                <button onClick={() => setStep(2)}>Back</button>
                <button>Submit</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE – GUIDANCE */}
      <div className="guidance">
        <h2>Application Guidance</h2>
        <ul>
          <li>✔ Enter correct personal details</li>
          <li>✔ Phone & email must be active</li>
          <li>✔ Bank account should be in your name</li>
          <li>✔ IFSC code must be valid</li>
          <li>✔ Aadhaar & PAN details should match</li>
          <li>✔ Upload clear document images</li>
        </ul>
        <p className="note">
          ⚠ Incorrect information may lead to rejection
        </p>
      </div>
    </div>
    </>
  );
}
