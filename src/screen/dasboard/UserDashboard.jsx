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
  }, [navigate]);

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!applications.length)
    return <p className="text-center justify-center  mt-16">No data found</p>;

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 flex justify-center px-3 sm:px-4 py-6">
      <div className="w-full max-w-4xl space-y-6">
        {applications.map((application) => {
          const baseAmount = application.loanType?.loanAmount || 0;

          const totalChargesAdded = Array.isArray(application.charges)
            ? application.charges.reduce((sum, charge) => {
                return sum + Math.max(charge.amount - 500, 0);
              }, 0)
            : 0;

          const totalAmount = baseAmount + totalChargesAdded;

          const hasCharges =
            Array.isArray(application.charges) &&
            application.charges.length > 0;

          return (
            <div
              key={application._id}
              className="bg-white rounded-3xl mt-12 shadow-lg p-5 sm:p-6 space-y-6"
            >
              {/* AVAILABLE AMOUNT */}
              <div className="text-center space-y-2">
                <p className="text-black font-bold text-lg sm:text-xl">
                  Available Amount
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  ₹{totalAmount}
                </h1>

                {!hasCharges ? (
                  <p className="text-sm font-medium text-orange-600 mt-2">
                    Wait for loan approval
                  </p>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-3 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Withdraw to Bank
                  </button>
                )}
              </div>

              {/* LOAN DETAILS */}
              <Section title="Loan Details">
                <Row label="Loan Type" value={application.loanType?.loanName} />
                <Row label="Base Amount" value={`₹${baseAmount}`} />
                <Row
                  label="Tenure"
                  value={`${application.loanType?.tenure} months`}
                />
              </Section>

              {/* CHARGES DETAILS */}
              {hasCharges && (
                <Section title="Charges Details">
                  {application.charges.map((item, index) => (
                    <div
                      key={index}
                      className="space-y-2 border-b last:border-b-0 pb-3"
                    >
                      <Row label="Charge Type" value={item?.chargeType} />
                      <Row label="Charge Amount" value={`₹${item?.amount}`} />
                      <Row label="Processing Cut" value="₹500" success />
                      <Row
                        label="Added to Total"
                        value={`₹${Math.max(item.amount - 500, 0)}`}
                        success
                      />
                      <Row
                        label="Pay Charges"
                        buttonText="Pay Now"
                        onButtonClick={() =>
                          navigate("/payment", {
                            state: {
                              userId: application._id,
                              chargeId: item._id,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </Section>
              )}

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
                  {application.documents?.aadhaarImage && (
                    <img
                      src={`https://bajajpanel.online/${application.documents.aadhaarImage}`}
                      alt="Aadhaar"
                      className="w-full max-w-xs rounded-lg border"
                    />
                  )}

                  {application.documents?.panImage && (
                    <img
                      src={`https://bajajpanel.online/${application.documents.panImage}`}
                      alt="PAN"
                      className="w-full max-w-xs rounded-lg border"
                    />
                  )}
                </div>
              </Section>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 text-center w-full max-w-xs">
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
    <div className="mt-12" >
      <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ROW */
function Row({ label, value, success, buttonText, onButtonClick }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>

      {buttonText ? (
        <button
          onClick={onButtonClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-1.5 rounded-full font-semibold"
        >
          {buttonText}
        </button>
      ) : (
        <span
          className={`font-medium ${
            success ? "text-green-600" : "text-gray-800"
          }`}
        >
          {value || "-"}
        </span>
      )}
    </div>
  );
}
