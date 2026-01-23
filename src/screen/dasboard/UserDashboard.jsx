import React, { useEffect, useState } from "react";
import apiRequest from "../../services/api/apiRequest";
import { useNavigate } from "react-router";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
  const handleBack = () => {
    navigate("/", { replace: true });
  };

  window.addEventListener("popstate", handleBack);
  return () => window.removeEventListener("popstate", handleBack);
}, []);


  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await apiRequest("get", "/user-detail");
        setApplications(res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!applications.length) return <p className="text-center">No data found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-6">
        {applications.map((application) => {
          const hasCharges =
            Array.isArray(application.charges) &&
            application.charges.length > 0;

          return (
            <div
              key={application._id}
              className="bg-white rounded-3xl shadow-lg p-6 space-y-6"
            >
              {/* AVAILABLE AMOUNT */}
              <div className="text-center">
                <p className="text-gray-500 text-sm">Available amount</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{application.loanType?.loanAmount || 0}
                </h1>

                {!hasCharges ? (
                  <p className="mt-4 text-sm font-medium text-orange-600">
                    Wait for loan approval
                  </p>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Withdraw to Bank
                  </button>
                )}
              </div>

              {/* LOAN DETAILS */}
              <Section title="Loan Details">
                <Row label="Loan Type" value={application.loanType?.loanName} />
                <Row
                  label="Loan Amount"
                  value={`₹${application.loanType?.loanAmount}`}
                />
                <Row
                  label="Tenure"
                  value={`${application.loanType?.tenure} months`}
                />
              </Section>  
               <Section title="Charges Details">
                <Row label="Charges Name" value={application.charges?.chargesType} />
                <Row
                  label="Loan Amount"
                  value={`₹${application.charges?.loanType}`}
                />
                <Row
                  label="Charges"
                  value={`${application.charges?.amount} months`}
                />
              </Section>

              {/* PERSONAL DETAILS */}
              <Section title="Personal Details">
                <Row
                  label="Name"
                  value={`${application.personal?.firstName} ${application.personal?.lastName}`}
                />
                <Row label="Email" value={application.personal?.email} />
                <Row label="Mobile" value={application.personal?.phone} />
              </Section>

              {/* BANK DETAILS */}
              <Section title="Bank Details">
                <Row
                  label="Account Holder"
                  value={application.bank?.accountHolder}
                />
                <Row
                  label="Account No"
                  value={application.bank?.accountNumber}
                />
                <Row label="IFSC" value={application.bank?.ifsc} />
              </Section>

              {/* DOCUMENTS */}
              <Section title="Documents">
                <div className="space-y-4">
                  {/* Aadhaar */}
                  <div>
                    <Row
                      label="Aadhaar Number"
                      value={application.documents?.aadhaar}
                      success
                    />
                    {application.documents?.aadhaarImage && (
                      <img
                        src={`https://bajajpanel.online/${application.documents.aadhaarImage}`}
                        alt="Aadhaar"
                        className="mt-2 w-full max-w-xs rounded-lg border"
                      />
                    )}
                  </div>

                  {/* PAN */}
                  <div>
                    <Row
                      label="PAN Number"
                      value={application.documents?.pan}
                      success
                    />
                    {application.documents?.panImage && (
                      <img
                        src={`https://bajajpanel.online/${application?.documents.panImage}`}
                        alt="PAN"
                        className="mt-2 w-full max-w-xs rounded-lg border"
                      />
                    )}
                  </div>
                </div>
              </Section>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center w-80">
            <p className="font-medium">
              Please contact to loan distributor
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* SECTION */
function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
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
        {value || "-"}
      </span>
    </div>
  );
}
