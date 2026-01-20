import React from "react";
import { useParams } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function ApplicationPreview() {
  const { id } = useParams();

  const application = {
    email: "user@gmail.com",
    loanType: {
      loanName: "Personal Loan",
      loanAmount: 200000,
      tenure: 24,
    },
    personal: {
      name: "Praveen",
      mobile: "9999999999",
    },
    bank: {
      bankName: "SBI",
      accountNo: "XXXX1234",
    },
    documents: {
      aadhaar: "Uploaded",
      pan: "Uploaded",
    },
  };

  const Field = ({ label, value }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b last:border-b-0">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="sm:col-span-2 text-sm text-gray-900 break-words">
        {value}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 md:px-10">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Loan Application Preview
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8 space-y-8">

        {/* 🔹 APPLICATION STEPS (ANGEL ONE STYLE) */}
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] relative">
            {[
              { label: "Applied", status: "done" },
              { label: "Documents Uploaded", status: "done" },
              { label: "Under Review", status: "active" },
              { label: "Approval", status: "pending" },
              { label: "Disbursed", status: "pending" },
            ].map((step, index) => (
              <div key={index} className="flex-1 text-center relative">
                
                {/* Line */}
                {index !== 0 && (
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-300 -z-10"></div>
                )}

                {/* Icon */}
                <div
                  className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full border-2
                    ${
                      step.status === "done"
                        ? "bg-green-500 border-green-500 text-white"
                        : step.status === "active"
                        ? "bg-yellow-400 border-yellow-400 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                >
                  {step.status === "done" ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Text */}
                <p
                  className={`mt-2 text-xs sm:text-sm font-medium
                    ${
                      step.status === "active"
                        ? "text-yellow-700"
                        : step.status === "done"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔔 STATUS ALERT */}
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg">
          <ExclamationTriangleIcon className="w-6 h-6 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm sm:text-base">
              Loan Application Under Review
            </p>
            <p className="text-xs sm:text-sm mt-1">
              Your application is currently being reviewed. You will be notified
              once verification is completed.
            </p>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-4 border-b pb-2">
            Personal Information
          </h2>
          <Field label="Email" value={application.email} />
          <Field label="Full Name" value={application.personal.name} />
          <Field label="Mobile Number" value={application.personal.mobile} />
        </section>

        {/* DOCUMENT DETAILS */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-4 border-b pb-2">
            Documents
          </h2>
          <Field label="Aadhaar Status" value={application.documents.aadhaar} />
          <Field label="PAN Status" value={application.documents.pan} />
        </section>

        {/* BANK DETAILS */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-4 border-b pb-2">
            Bank Details
          </h2>
          <Field label="Bank Name" value={application.bank.bankName} />
          <Field label="Account Number" value={application.bank.accountNo} />
        </section>

        {/* LOAN DETAILS */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold mb-4 border-b pb-2">
            Loan Details
          </h2>
          <Field label="Loan Type" value={application.loanType.loanName} />
          <Field
            label="Loan Amount"
            value={`₹ ${application.loanType.loanAmount.toLocaleString()}`}
          />
          <Field
            label="Tenure"
            value={`${application.loanType.tenure} Months`}
          />
        </section>
      </div>
    </div>
  );
}
