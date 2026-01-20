import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../navigation/AuthContext";

export default function UserDashboard() {
  const { id } = useParams();
  const {setToken}=useAuth();
  const navigate = useNavigate();

  const application = {
    email: "user@gmail.com",
    loanType: { loanName: "Personal Loan", loanAmount: 200000, tenure: 24 },
    personal: { name: "Praveen", mobile: "9999999999" },
    bank: { bankName: "SBI", accountNo: "XXXX1234" },
    documents: { aadhaar: "Uploaded", pan: "Uploaded" },
    charges: [
      {
        _id: "1",
        chargeType: "Processing Fee",
        loanType: "personal",
        amount: 1500,
        approval: 1
      }
    ]
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 ml-4">
        Dashboard
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">

        {/* PERSONAL INFO */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
          <p><b>Email:</b> {application.email}</p>
          {Object.entries(application.personal).map(([k, v]) => (
            <p key={k}><b>{k}:</b> {v}</p>
          ))}
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Documents</h2>
          {Object.entries(application.documents).map(([k, v]) => (
            <p key={k}><b>{k}:</b> {v}</p>
          ))}
        </div>

        {/* BANK DETAILS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Bank Details</h2>
          {Object.entries(application.bank).map(([k, v]) => (
            <p key={k}><b>{k}:</b> {v}</p>
          ))}
        </div>

        {/* LOAN DETAILS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Loan Details</h2>
          <p><b>Loan Name:</b> {application.loanType.loanName}</p>
          <p><b>Amount:</b> ₹{application.loanType.loanAmount}</p>
          <p><b>Tenure:</b> {application.loanType.tenure} months</p>
        </div>

        {/* CHARGES */}
        <div className="bg-white p-5 rounded-xl shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-3">Charges</h2>

          <table className="w-full min-w-[500px] border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Type</th>
                <th className="text-left">Loan</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {application.charges.map(c => (
                <tr key={c._id} className="border-t">
                  <td className="p-2">{c.chargeType}</td>
                  <td>{c.loanType}</td>
                  <td>₹{c.amount}</td>
                  <td
                    className={`font-semibold ${
                      c.approval ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {c.approval ? "Approved" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LOGOUT */}
        <div className="flex justify-center">
          <button
            onClick={
              {}
            }
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
