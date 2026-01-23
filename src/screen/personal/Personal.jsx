import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Personalimage from '../../assets/Personalimage.png';
import PersonalLoanEMICalculaor from "../../emiCalculator/PersonalLoanEMICalculator";
import PersonalLoanFeature from "./PersonalLoanFeature";
import FAQSection from "../../component/FAQSection";
import Disclaimer from "../../component/Disclaimer";
import Footer from "../../component/Footer";

const Personal = () => {
  const [user, setUser] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState(96);
  const interestRate = 5;
  const [emiamount,setEmiAmount]=useState("")
  const [showAllTenures, setShowAllTenures] = useState(false);

  const navigate = useNavigate();

  const calculateEMI = (P, R, N) => {
    const r = R / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    return parseFloat(emi.toFixed(2));
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = parseFloat((emi * tenure).toFixed(2));
  const interestAmount = totalAmount;

  const getRandomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getProcessingFee = (amount) => {
    if (amount <= 10000) return getRandomBetween(449, 649);
    if (amount <= 50000) return getRandomBetween(1149, 1449);
    if (amount <= 100000) return getRandomBetween(1449, 1649);
    if (amount <= 500000) return getRandomBetween(1649, 2249);
    return getRandomBetween(2249, 3249);
  };

  const processingFee = useMemo(() => {
    return parseFloat(getProcessingFee(loanAmount).toFixed(2));
  }, [loanAmount]);

  const netAmount = parseFloat(Number(loanAmount).toFixed(2));

  const allTenures = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96];
  const visibleTenures = showAllTenures ? allTenures : allTenures.slice(0, 6);

  return (
    <div className="bg-white">
      <h2 className="text-lg sm:text-xl font-bold mt-2  mb-5 px-6">
        Apply for Loan
      </h2>

      <div className="max-w-[1200px]  px-4 sm:px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* IMAGE + TEXT */}
          <div className="order-1">
            <img
              src={Personalimage}
              alt="Personal Loan Banner"
              className="w-full max-h-[260px] sm:max-h-[320px] object-cover rounded-lg"
            />
            <div className="mt-4  ml-2 text-sm text-gray-600 leading-relaxed">
              <p>
                Bajaj Finance offers a Personal loan of up to Rs. 15 crore* based on your eligibility,
                with interest rates starting from 6%* p.a. Flexible tenure and hassle-free application.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-2 sm:p-6 rounded-lg shadow-sm order-2">
            <h2 className="text-lg sm:text-xl font-bold mb-3">Personal Loan</h2>

            <p className="text-sm text-gray-600 mb-4">
              Interest rates starting 6% p.a | Loan up to Rs. 15cr* | Tenure up to 96 months*
            </p>

            <label className="block text-sm font-semibold mb-1">
              Enter loan amount
            </label>
            <input
              type="number"
              value={loanAmount || ""}
              onChange={(e) =>
                setLoanAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Enter your Amount"
              className="border border-gray-300 px-3 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium mb-2">
              Selected loan tenure: {tenure} months
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
              {visibleTenures.map((month) => (
                <button
                  key={month}
                  onClick={() => setTenure(month)}
                  className={`py-2 rounded text-xs sm:text-sm border transition
                    ${tenure === month
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                  {month}
                </button>
              ))}
            </div>

            {!showAllTenures && (
              <button
                onClick={() => setShowAllTenures(true)}
                className="text-blue-500 text-sm underline mb-4"
              >
                Show More Tenure Options
              </button>
            )}

            <div className="p-2 rounded bg-gray-50">
              <p className="text-gray-700 text-sm">
                EMI for {tenure / 12} years at {interestRate}% p.a.
              </p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                ₹{emi.toFixed(2)}
              </p>

              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full"
                    style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Total Amount ₹{totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm order-3 lg:sticky lg:top-6 h-fit">
            <h3 className="text-lg font-semibold mb-3">Loan summary</h3>

            <p className="text-sm text-gray-600 mb-4">
              This summary is based on the details provided by you.
            </p>

            <div className="space-y-2 text-sm">
              <p><strong>Loan amount:</strong> ₹{Number(loanAmount).toLocaleString()}</p>
              <p><strong>Tenure:</strong> {tenure} Months</p>
              <p><strong>Interest rate:</strong> {interestRate}%</p>
              <p><strong>EMI:</strong> ₹{emi.toFixed(2)}</p>
              <p><strong>Charges:</strong> ₹{processingFee.toFixed(2)}</p>

              <p className="font-bold bg-yellow-100 p-2 rounded">
                Amount credited: ₹{netAmount.toLocaleString()}
              </p>

              <button
              onClick={() =>
    navigate("/apply", {
      state: {
        loanName: "personal",
        loanAmount,
        tenure,
        emi
      }
    })
  }
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

        {/* EMI Calculator */}
        <div className="mt-10">
          <PersonalLoanEMICalculaor />
        </div>
      </div>

      <PersonalLoanFeature />
      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default Personal;
