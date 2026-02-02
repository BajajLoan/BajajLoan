import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Personalimage from '../../assets/Personalimage.png';
import PersonalLoanEMICalculaor from "../../emiCalculator/PersonalLoanEMICalculator";
import PersonalLoanFeature from "./PersonalLoanFeature";
import FAQSection from "../../component/FAQSection";
import Disclaimer from "../../component/Disclaimer";
import Footer from "../../component/Footer";

const Personal = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState(6);
  const interestRate = 5;

  const navigate = useNavigate();

  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setLoanAmount("");
    } else {
      const num = parseInt(value.replace(/^0+/, ""));
      if (!isNaN(num)) setLoanAmount(num);
    }
  };

  const calculateEMI = (P, R, N) => {
    const r = R / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    return parseFloat(emi.toFixed(2));
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = parseFloat((emi * tenure).toFixed(2));

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

  return (
    <div className="bg-white mt-16">
      <h2 className="text-lg sm:text-xl text-center font-bold mt-2 mb-5 px-6">
        Apply for Loan
      </h2>

      <div className="max-w-[1200px] px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* IMAGE */}
          <div>
            <img
              src={Personalimage}
              alt="Personal Loan Banner"
              className="w-full max-h-[260px] object-cover rounded-lg"
            />
            <p className="mt-4 text-sm text-gray-600">
              Bajaj Finance offers Personal loans with flexible tenure and easy process.
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">Personal Loan</h2>

            <label className="block text-lr font-bold text-black-700 mb-1">
  Enter loan amount
</label>

<div className="relative mb-4">
  {/* ₹ ICON */}
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
    ₹
  </span>

  <input
    type="number"
    value={loanAmount}
    onChange={handleLoanAmountChange}
    placeholder="Enter amount"
    className="border border-gray-300 px-3 py-2 pl-8 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    min={10000}
    max={2500000}
  />
</div>


            {/* ✅ TENURE DROPDOWN */}
            <label className="block text-sm font-semibold mb-1">
              Select loan tenure
            </label>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="border px-3 py-2 rounded w-full mb-4 bg-white"
            >
              {allTenures.map((month) => (
                <option key={month} value={month}>
                  {month} months
                </option>
              ))}
            </select>

            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">
                EMI for {tenure / 12} years
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{emi.toFixed(2)}
              </p>
              <p className="text-sm mt-1">
                Total Amount ₹{totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Loan summary</h3>

            <p><strong>Loan amount:</strong> ₹{Number(loanAmount).toLocaleString()}</p>
            <p><strong>Tenure:</strong> {tenure} Months</p>
            <p><strong>Interest rate:</strong> {interestRate}%</p>
            <p><strong>EMI:</strong> ₹{emi.toFixed(2)}</p>
            {/* <p><strong>Charges:</strong> ₹{processingFee.toFixed(2)}</p> */}

            <p className="font-bold bg-yellow-100 p-2 rounded mt-2">
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
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
            >
              APPLY NOW
            </button>
          </div>
        </div>

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
