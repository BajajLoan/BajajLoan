import { useEffect, useState } from "react";
import apiRequest from "../../services/api/apiRequest";
import { Calendar, IndianRupee, CheckCircle, FileText, XCircle } from "lucide-react";

export default function ApplicationsPreview() {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [showAllEmi, setShowAllEmi] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await apiRequest("get", "/user-detail");
        setApplications(res || []);
      } catch (err) {
        console.error(err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your loans...</p>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <FileText size={48} className="mx-auto text-indigo-600 mb-4" />
          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            No Active Loan
          </h2>
          <p className="text-gray-600 text-sm">
            You have not applied for any loan yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-indigo-700">
          My Loan Applications
        </h1>

        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
          >
            {/* LOAN SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Loan Type</p>
                <p className="font-semibold capitalize">
                  {app.loanType?.loanName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Amount</p>
                <p className="font-semibold flex items-center gap-1">
                  <IndianRupee size={14} />
                  {app.loanType?.loanAmount}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Tenure</p>
                <p className="font-semibold">
                  {app.loanType?.tenure} Months
                </p>
              </div>
            </div>

           {Array.isArray(app?.charges) && app?.charges.length > 0 && (
  <div>
    <h3 className="font-semibold text-indigo-600 mb-3">
      Charges Paid
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {app.charges.map((charge, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 flex flex-col gap-1"
        >
          <p className="text-sm font-medium">{charge.chargeType}</p>

          <p className="text-xs text-gray-500">
            {app.loanType?.loanName}
          </p>

          <p className="text-sm font-semibold">₹{charge.amount}</p>

          {charge.approval === 1 ? (
            <span className="text-green-600 text-xs flex items-center gap-1">
              Approved
            </span>
          ) : (
            <span className="text-red-600 text-xs flex items-center gap-1">
              Rejected
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
)}


            {/* EMI CALENDAR */}
            <div>
              <h3 className="font-semibold text-indigo-600 mb-3">
                EMI Transactions
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Array.from({
                  length: showAllEmi
                    ? app.loanType?.tenure
                    : Math.min(4, app.loanType?.tenure || 0),
                }).map((_, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-3 text-center"
                  >
                    <Calendar
                      size={16}
                      className="mx-auto mb-1 text-indigo-600"
                    />
                    <p className="text-xs">Month {i + 1}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                ))}
              </div>

              {app.loanType?.tenure > 4 && !showAllEmi && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllEmi(true)}
                    className="text-sm text-indigo-600 font-semibold hover:underline"
                  >
                    See All EMIs
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
