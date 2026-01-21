import { useEffect, useState } from "react";
// import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { getAuth } from "firebase/auth";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-toastify/dist/ReactToastify.css";

const UPIPayment = () => {
  const [upiData, setUpiData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [popupShown, setPopupShown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { processingFee, charges, loanName, chargesName } = location.state || {};

  const amountToPay = charges || processingFee;
  const lName = chargesName || loanName;

  // const auth = getAuth();
  // const user = auth.currentUser;

  // useEffect(() => {
  //   const fetchUPIDetails = async () => {
  //     const docRef = doc(db, "adminConfig", "credentials");
  //     const snap = await getDoc(docRef);
  //     if (snap.exists()) setUpiData(snap.data());
  //   };
  //   fetchUPIDetails();
  // }, []);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => setImageBase64(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!imageBase64) {
  //     toast.error("Please upload a payment screenshot.");
  //     return;
  //   }

  //   if (!popupShown) {
  //     toast.success("Loan amount will be deposited in your bank account within 1 hour.");
  //     setPopupShown(true);
  //   }

  //   try {
  //     let found = false;

  //     const updateInCollection = async (collectionName) => {
  //       const snap = await getDocs(collection(db, "applications", user.uid, collectionName));
  //       for (const docSnap of snap.docs) {
  //         const data = docSnap.data();
  //         const nameMatches = data.loanName === lName || data.chargesName === lName;
  //         const amountMatches = data.charges === amountToPay || data.processingFee === amountToPay;
  //         if (nameMatches && amountMatches) {
  //           const ref = doc(db, "applications", user.uid, collectionName, docSnap.id);
  //           await updateDoc(ref, {
  //             paymentSlipBase64: imageBase64,
  //             paymentSubmittedAt: new Date(),
  //           });
  //           found = true;
  //           break;
  //         }
  //       }
  //     };

  //     await updateInCollection("loanRequests");
  //     if (!found) await updateInCollection("adminRequest");

  //     if (found) {
  //       toast.success("Payment slip submitted successfully!");
  //       setTimeout(() => navigate("/history"), 1500);
  //     } else {
  //       toast.error("No matching request found to update.");
  //     }
  //   } catch (err) {
  //     console.error("Upload failed", err);
  //     toast.error("Failed to upload. Try again.");
  //   }
  // };

  // if (!upiData) return <p className="text-center mt-10 text-gray-600">Loading payment details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 px-4 py-6">
      <ToastContainer />
      <div className="max-w-2xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-4">
          Pay ₹{amountToPay} for {lName}
        </h1>

        {/* UPI ID Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Pay with UPI</h2>
          <div className="flex items-center justify-between border px-4 py-2 rounded-md bg-gray-50">
            <span className="text-base font-medium truncate">
              {/* {upiData.upiId} */}
              </span>
            <CopyToClipboard text={{}} onCopy={() => setCopied(true)}>
              <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                {copied ? "Copied" : "Copy"}
              </button>
            </CopyToClipboard>
          </div>
        </div>

        {/* QR Code Image */}
        <div className="flex justify-center mb-6">
          {/* <img src={upiData.qrImage} alt="QR Code" className="w-52 h-52 border rounded shadow-md" /> */}
        </div>

        <h2 className="text-center font-semibold text-gray-700 mb-3">Or choose your UPI app</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white font-medium mb-6">
          <button className="bg-blue-600 py-2 rounded">Paytm</button>
          <button className="bg-purple-600 py-2 rounded">PhonePe</button>
          <button className="bg-green-600 py-2 rounded">Google Pay</button>
          <button className="bg-gray-700 py-2 rounded">Other</button>
        </div>

        {/* Bank Account Details */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2 text-center">Pay with Bank Transfer</h2>
          <p><strong>Account Holder:</strong>
           {/* {upiData.bankAccountHolderName} */}
           </p>
          <p><strong>Account Number:

          </strong>
           {/* {upiData.accNumber} */}
           </p>
          <p><strong>Bank Name:</strong>
           {/* {upiData.bankName} */}
           </p>
          <p><strong>IFSC Code:</strong>
           {/* {upiData.ifscCode} */}
           </p>
          <p className="text-red-500 mt-2 text-center text-sm">Facing issues?</p>
          <div className="text-center mt-1">
            <button
              onClick={() => navigate('/contact')}
              className="mt-2 py-1 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Upload Payment Slip */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center border-b pb-1">Upload Payment Slip</h3>
          <input
            type="file"
            accept="image/*"
            onChange={{}}
            className="w-full text-sm border px-3 py-2 rounded-md bg-white"
          />
        </div>

        <button
          onClick={{}}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Submit Payment Slip
        </button>

        <p className="text-xs text-red-500 text-center mt-2">
          ⚠️ Upload your payment slip to confirm your transaction.
        </p>
      </div>
    </div>
  );
};

export default UPIPayment;
