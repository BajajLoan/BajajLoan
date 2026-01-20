import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import  apiRequest  from "../services/api/apiRequest";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import Disclaimer from "./Disclaimer";
import { showSuccess, showError } from "../services/utils/toastUtil";


export default function Apply() {
  const location = useLocation();
  const navigate = useNavigate();

  const { loanName, loanAmount, tenure } = location.state || {};

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [personal, setPersonal] = useState({});
  const [bank, setBank] = useState({});
  const [documents, setDocuments] = useState({});

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        loanType: { loanName, loanAmount, tenure },
        personal,
        bank,
        documents,
      };
      await apiRequest("post", "/apply", payload);
      // alert("Application Submitted Successfully ✅");
      showSuccess("Loan Application Submitted Successfully")
      navigate("/dashboard");
    } catch (err) {
      // alert(err.response?.data?.message || "Submission Failed");
      showError("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">

      {/* FLOATING LOAN SUMMARY */}
      <div className="sticky top-12 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between gap-2">
          <div>
            <p className="text-sm text-gray-500">Loan Application</p>
            <h1 className="text-xl font-bold text-indigo-700">{loanName}</h1>
            
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-center md:flex md:gap-6 md:text-left">

            <div>
              <p className="text-gray-500">Amount</p>
              <p className="font-semibold">₹{loanAmount}</p>
            </div>
            <div>
              <p className="text-gray-500">Tenure</p>
              <p className="font-semibold">{tenure} Months</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* STEPPER */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">
            {["Personal Details", "Bank Details", "Documents"].map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    step >= i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm ${
                    step >= i + 1 ? "text-indigo-700 font-medium" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FORM CARD */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">


            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-indigo-700">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="input" placeholder="First Name"
                    onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })}
                  />
                  <input className="input" placeholder="Last Name"
                    onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })}
                  />
                  <input className="input" type="date"
                    onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                  />
                  <input className="input" placeholder="Phone Number"
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                  />
                  <input className="input md:col-span-2" placeholder="Email Address"
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="btn-primary mt-6 w-full"
                >
                  Continue →
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-indigo-700">
                  Bank Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="input" placeholder="Account Holder Name"
                    onChange={(e) => setBank({ ...bank, holder: e.target.value })}
                  />
                  <input className="input" placeholder="Account Number"
                    onChange={(e) => setBank({ ...bank, accountNo: e.target.value })}
                  />
                  <input className="input md:col-span-2" placeholder="IFSC Code"
                    onChange={(e) => setBank({ ...bank, ifsc: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="btn-secondary w-full" onClick={() => setStep(1)}>Back</button>
                  <button className="btn-primary w-full" onClick={() => setStep(3)}>Next</button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h2 className="text-lg font-semibold mb-4 text-indigo-700">
                  Document Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="input" placeholder="Aadhaar Number"
                    onChange={(e) => setDocuments({ ...documents, aadhaar: e.target.value })}
                  />
                  <input className="input" placeholder="PAN Number"
                    onChange={(e) => setDocuments({ ...documents, pan: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="btn-secondary w-full" onClick={() => setStep(2)}>Back</button>
                  <button
                    className="btn-primary w-full"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
}
