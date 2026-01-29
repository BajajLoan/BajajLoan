import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../services/api/apiRequest";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import Disclaimer from "./Disclaimer";
import { showSuccess, showError } from "../services/utils/toastUtil";
export default function Apply() {
  const location = useLocation();
  const navigate = useNavigate();

  const { loanName, loanAmount, tenure,emi } = location.state || {};

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [personal, setPersonal] = useState({});
  const [bank, setBank] = useState({});
  const [documents, setDocuments] = useState({});
  const [aadhaarImage, setAadhaarImageFile] = useState(null);
const [panImage, setPanImageFile] = useState(null);

console.log(aadhaarImage)
const validateStep1 = () => {
  if (
    !personal.firstName ||
    !personal.lastName ||
    !personal.dob ||
    !personal.phone ||
    !personal.email ||
    !personal.address
  ) {
    showError("Please fill all Personal Details");
    return false;
  }
  return true;
};

const validateStep2 = () => {
  if (
    !bank.holder ||
    !bank.accountNo ||
    !bank.ifsc ||
    !bank.branch
  ) {
    showError("Please fill all Bank Details");
    return false;
  }
  return true;
};

const validateStep3 = () => {
  if (
    !documents.aadhaar ||
    !documents.pan 
    // !aadhaarImage ||
    // !panImage
  ) {
    showError("Please fill all Document Details");
    return false;
  }
  return true;
};



  const handleSubmit = async () => {
  if (!validateStep3()) return;

  try {
    setLoading(true);

    const formData = new FormData();

// BASIC
formData.append("loanName", loanName);
formData.append("loanAmount",loanAmount);
formData.append("tenure",tenure);
formData.append("emi",emi)
formData.append("email", personal.email);

// PERSONAL
formData.append("firstName", personal.firstName);
formData.append("lastName", personal.lastName);
formData.append("dob", personal.dob);
formData.append("phone", personal.phone);
formData.append("address", personal.address);

// BANK
formData.append("accountHolder", bank.holder);
formData.append("accountNumber", bank.accountNo);
formData.append("ifsc", bank.ifsc);

// DOCUMENT NUMBERS
formData.append("aadhaar", documents.aadhaar);
formData.append("pan", documents.pan);

// DOCUMENT IMAGES
if (aadhaarImage) formData.append("aadhaarImage", aadhaarImage);
if (panImage) formData.append("panImage", panImage);

// API
const res =await apiRequest("post","/apply", formData);
    await requestNotificationPermission();
  

    showSuccess("Loan Application Submitted Successfully");
    setShowPreview(true);

    setTimeout(() => navigate("/dashboard",{replace:true}), 3000);
  } catch (error) {
    console.error(error);
    showError("Something went wrong!");
  } finally {
    setLoading(false);
  }
};




  /* ================= PREVIEW SCREEN ================= */
  if (showPreview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 text-3xl">✓</span>
          </div>

          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            Application Submitted!
          </h2>

          <p className="text-gray-600 mb-6">
            Your Loan is under processing please wait for a approval
          </p>

          <div className="bg-indigo-50 rounded-xl p-4 text-left text-sm space-y-2">
            <p>
              <strong>Loan:</strong> {loanName}
            </p>
            <p>
              <strong>Amount:</strong> ₹{loanAmount}
            </p>
            <p>
              <strong>Tenure:</strong> {tenure} Months
            </p>
            <p>
              <strong>Email:</strong> {emi}/month
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Redirecting to dashboard in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  /* ================= MAIN FORM ================= */
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
                    step >= i + 1
                      ? "text-indigo-700 font-medium"
                      : "text-gray-500"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex">
                  <div>
                    <label className="font-bold ml-2 ">First Name<label className="font-bold text-red-900">*</label></label>
                  <input label="First Name" className="input" placeholder="First Name"
                    onChange={(e) =>
                      setPersonal({ ...personal, firstName: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2 ">Last Name<label className="font-bold text-red-900">*</label></label>
                    <input className="input" placeholder="Last Name"
                    onChange={(e) =>
                      setPersonal({ ...personal, lastName: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2 ">Date of Birth<label className="font-bold text-red-900">*</label></label>
                    <input className="input" type="date"
                    onChange={(e) =>
                      setPersonal({ ...personal, dob: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2 ">Phone Number<label className="font-bold text-red-900">*</label></label>
                    <input className="input" placeholder="Phone Number"
                    onChange={(e) =>
                      setPersonal({ ...personal, phone: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2 ">Email<label className="font-bold text-red-900">*</label></label>
                    <input className="input md:col-span-2" placeholder="Email Address"
                    onChange={(e) =>
                      setPersonal({ ...personal, email: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2 ">Address<label className="font-bold text-red-900">*</label></label>
                    <input className="input" placeholder="Address"
                    onChange={(e) =>
                      setPersonal({ ...personal, address: e.target.value })
                    }
                  />
                  </div>
                </div>

                <button onClick={() => validateStep1() && setStep(2)} className="btn-primary mt-6 w-full">
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
                  <div>
                    <label className="font-bold ml-2 ">Account Holder Name<label className="font-bold text-red-900">*</label></label>
                  <input className="input" placeholder="Account Holder Name"
                    onChange={(e) =>
                      setBank({ ...bank, holder: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2">Account Number<label className="font-bold text-red-900">*</label></label>
                    <input className="input" placeholder="Account Number"
                    onChange={(e) =>
                      setBank({ ...bank, accountNo: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2">IFSC Code<label className="font-bold text-red-900">*</label></label>
                    <input className="input md:col-span-2" placeholder="IFSC Code"
                    onChange={(e) =>
                      setBank({ ...bank, ifsc: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2">Branch<label className="font-bold text-red-900">*</label></label>
                    <input className="input md:col-span-2" placeholder="Branch"
                    onChange={(e) =>
                      setBank({ ...bank, branch: e.target.value })
                    }
                  />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="btn-secondary w-full" onClick={() => setStep(1)}>Back</button>
                  <button className="btn-primary w-full" onClick={() =>validateStep2 && setStep(3)}>Next</button>
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
                  <div>
                    <label className="font-bold ml-2">Aadhar Number</label>
                    <input className="input" placeholder="Aadhaar Number"
                    onChange={(e) =>
                      setDocuments({ ...documents, aadhaar: e.target.value })
                    }
                  />
                  </div>
                  <div>
                    <label className="font-bold ml-2">PAN Number</label>
                    <input className="input" placeholder="PAN Number"
                    onChange={(e) =>
                      setDocuments({ ...documents, pan: e.target.value })
                    }
                  />
                  </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <div>
    <label className=" font-bold ml-2">
      Aadhaar Image
    </label>
    <input
      type="file"
      accept="image/*"
      className="input"
      onChange={(e) => setAadhaarImageFile(e.target.files[0])}
    />
  </div>

  <div>
    <label className=" font-bold ml-2">
      PAN Image
    </label>
    <input
      type="file"
      accept="image/*"
      className="input"
      onChange={(e) => setPanImageFile(e.target.files[0])}
    />
  </div>
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
