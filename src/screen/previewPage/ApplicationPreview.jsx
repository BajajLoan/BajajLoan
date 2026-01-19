import React from "react";
import { useParams } from "react-router-dom";

export default function ApplicationPreview() {
  const { id } = useParams();

  const application = {
    email: "user@gmail.com",
    loanType: {
      loanName: "Personal Loan",
      loanAmount: 200000,
      tenure: 24
    },
    personal: {
      name: "Praveen",
      mobile: "9999999999"
    },
    bank: {
      bankName: "SBI",
      accountNo: "XXXX1234"
    },
    documents: {
      aadhaar: "Uploaded",
      pan: "Uploaded"
    }
  };

  const Field = ({ label, value }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b">
      <p className="font-medium text-gray-600">{label}</p>
      <p className="md:col-span-2 text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Loan Application 
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-8">

        {/* PERSONAL DETAILS */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Personal Information
          </h2>
          <Field label="Email" value={application.email} />
          <Field label="Name" value={application.personal.name} />
          <Field label="Mobile Number" value={application.personal.mobile} />
        </div>

        {/* DOCUMENT DETAILS */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Documents
          </h2>
          <Field label="Aadhaar Status" value={application.documents.aadhaar} />
          <Field label="PAN Status" value={application.documents.pan} />
        </div>

        {/* BANK DETAILS */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Bank Details
          </h2>
          <Field label="Bank Name" value={application.bank.bankName} />
          <Field label="Account Number" value={application.bank.accountNo} />
        </div>

        {/* LOAN DETAILS (COLUMN STYLE ✅) */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Loan Details
          </h2>
          <Field
            label="Loan Name"
            value={application.loanType.loanName}
          />
          <Field
            label="Loan Amount"
            value={`₹ ${application.loanType.loanAmount}`}
          />
          <Field
            label="Tenure"
            value={`${application.loanType.tenure} Months`}
          />
        </div>

      </div>
    </div>
  );
}
