import { useState } from "react";
import Footer from './Footer'
import FAQSection from "./FAQSection"
import Disclaimer from "./Disclaimer"
export default function Apply() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* LEFT – FORM */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
            
            {/* STEP INDICATOR */}
            <div className="flex justify-center gap-2 mb-4">
              {["Personal", "Bank", "Documents"].map((label, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 text-sm rounded-full ${
                    step >= i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold text-center mb-3">
                  Personal Details
                </h3>
                <label className="font-semibold ml-2">First Name</label>
                <input className="input" placeholder="First Name" />
                <label className="font-semibold ml-2">Last Name</label>
                <input className="input" placeholder="Last Name" />
                <label className="font-semibold ml-2">Date of Birth</label>
                <input className="input" type="date" />
                <label className="font-semibold ml-2" >Phone No</label>
                <input className="input" type="number" placeholder="Phone Number" />
                <label className="font-semibold ml-2" inputMode="email">Email</label>
                <input className="input" type="email" placeholder="Email" />
                <label className="font-semibold ml-2">Address</label>
                <textarea className="input h-20" placeholder="Address" />

                <button
                  onClick={() => setStep(2)}
                  className="btn-primary mt-3"
                >
                  Next
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold text-center mb-3">
                  Bank Details
                </h3>
                <label className="font-semibold ml-2">Account Holder Name</label>
                <input className="input" placeholder="Account Holder Name" />
                <label className="font-semibold ml-2">Account Number </label>
                <input className="input" placeholder="Account Number" />
                <label className="font-semibold ml-2">IFSC Code</label>
                <input className="input" placeholder="IFSC Code" />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-primary"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold text-center mb-3">
                  Documents
                </h3>
                  <label className="font-semibold ml-2">IFSC Code</label>
                <input className="input" placeholder="Aadhaar Number" />
                <label className="font-semibold ml-2">IFSC Code</label>
                <input className="input" placeholder="PAN Number" />
                          <h1 className="text-center font-bold text-xl">OR</h1>
                <label className="text-sm font-medium">Aadhaar Image</label>
                <input className="input" type="file" />
                  
                <label className="text-sm font-medium">PAN Image</label>
                <input className="input" type="file" />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button className="btn-primary">Submit</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT – GUIDANCE */}
        <div className="flex-1 bg-white p-8">
          <h2 className="text-xl font-bold mb-4">
            Application Guidance
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Enter correct personal details</li>
            <li>Phone & email must be active</li>
            <li>Bank account should be in your name</li>
            <li>IFSC code must be valid</li>
            <li>Aadhaar & PAN details should match</li>
            <li>Upload clear document images</li>
          </ul>
          <p className="mt-4 text-red-600 font-semibold">
            ⚠ Incorrect information may lead to rejection
          </p>
        </div>

      </div>
      
      <FAQSection/>
      <Disclaimer/>
      <Footer/>
    </div>
  );
}
