import React from "react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 flex justify-center px-4 py-8">
      
      <div className="w-full max-w-md md:max-w-3xl space-y-6">

        {/* AVAILABLE AMOUNT */}
        <div className="bg-white rounded-3xl shadow p-6 text-center">
          <p className="text-gray-500 text-sm">Available amount</p>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            ₹1,00,000
            <span className="text-sm text-gray-400 font-normal">
              {" "} / ₹1,00,000
            </span>
          </h1>

          <div className="h-2 bg-gray-200 rounded-full mt-4">
            <div className="h-2 bg-green-500 rounded-full w-full" />
          </div>

          <p className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-4">
            <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
              ✔
            </span>
            Easy Withdrawals
          </p>

          <button className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition">
            Withdraw to Bank
          </button>
        </div>

        {/* LOAN DETAILS */}
        <Section title="Loan Details">
          <Row label="Loan A/C Number" value="LM932875329" />
          <Row
            label="NBFC Partner"
            value="Fullerton India Credit Company Ltd"
          />
          <Row label="Amount Disbursed" value="₹10,000" />
          <Row label="Monthly Interest Rate" value="3% p.m." />
        </Section>

        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <Row label="Name" value="Praveen" />
          <Row label="Email" value="user@gmail.com" />
          <Row label="Mobile" value="9999999999" />
        </Section>

        {/* BANK DETAILS */}
        <Section title="Bank Details">
          <Row label="Bank Name" value="SBI" />
          <Row label="Account No" value="XXXX1234" />
          <Row label="IFSC" value="SBIN0000123" />
        </Section>

        {/* DOCUMENTS */}
        <Section title="Documents">
          <Row label="Aadhaar" value="Uploaded" success />
          <Row label="PAN" value="Uploaded" success />
          <Row label="Bank Statement" value="Uploaded" success />
        </Section>

      </div>
    </div>
  );
}

/* SECTION CARD */
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ROW */
function Row({ label, value, success }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span
        className={`font-medium ${
          success ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
