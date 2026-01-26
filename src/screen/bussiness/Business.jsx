import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer.jsx";
import BusinessLoanEMICalculator from "../../emiCalculator/BusinessLoanEMICalculator.jsx";
import Bussiness from "../../assets/Bussiness.png";
import Disclaimer from "../../component/Disclaimer.jsx";
import FAQSection from "../../component/FAQSection.jsx";
import BusinessLoanFeatures from "./BussinessLoanFeatures.jsx";

const Business = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState(6);
  const interestRate = 7;
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
  const safeLoanAmount =
    loanAmount === "" || isNaN(Number(loanAmount)) ? 0 : Number(loanAmount);

  const calculateEMI = (P, R, N) => {
    const r = R / 12 / 100;
    return (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  };

  const emi = calculateEMI(safeLoanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;

  const getRandomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getProcessingFee = (amount) => {
    if (amount <= 10000) return getRandomBetween(449, 649);
    if (amount <= 50000) return getRandomBetween(1149, 1449);
    if (amount <= 100000) return getRandomBetween(1449, 1649);
    if (amount <= 500000) return getRandomBetween(1649, 2249);
    return getRandomBetween(2249, 3249);
  };

  const processingFee = useMemo(
    () => getProcessingFee(safeLoanAmount),
    [safeLoanAmount]
  );

  const tenureOptions = Array.from({ length: 16 }, (_, i) => (i + 1) * 6);

  return (
    <div className="bg-white">
      <h2 className="text-xl font-bold text-center mb-4">Apply for Loan</h2>

      <div className="max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* IMAGE */}
          <div>
            <img
              src={Bussiness}
              alt="Business Loan Banner"
              className="w-full rounded-lg"
            />
            <p className="mt-4 text-sm text-gray-600">
              Get a business loan of up to ₹50 lakh with flexible repayment options.
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white p-2">
            <h2 className="text-xl font-bold mb-4">Business Loan</h2>

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
            <label className="block text-sm font-bold mb-1">
              Select Tenure
            </label>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="border px-3 py-2 rounded w-full mb-4 bg-white"
            >
              {tenureOptions.map((month) => (
                <option key={month} value={month}>
                  {month} months
                </option>
              ))}
            </select>

            <div className="p-4 rounded bg-blue-50">
              <p className="text-sm text-gray-700">
                EMI for {tenure} months at {interestRate}% p.a.
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{emi.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Total Amount ₹{totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white md:sticky md:top-8">
            <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>

            <p><strong>Loan Amount:</strong> ₹{safeLoanAmount.toFixed(2)}</p>
            <p><strong>Tenure:</strong> {tenure} Months</p>
            <p><strong>Interest Rate:</strong> {interestRate}%</p>
            <p><strong>EMI:</strong> ₹{emi.toFixed(2)}</p>
            <p><strong>Processing Fee:</strong> ₹{processingFee}</p>

            <p className="bg-yellow-100 p-2 rounded font-bold mt-2">
              Credited Amount: ₹{safeLoanAmount.toFixed(2)}
            </p>

            <button
              onClick={() =>
                navigate("/apply", {
                  state: {
                    loanName: "business",
                    loanAmount,
                    tenure
                  }
                })
              }
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
            >
              APPLY NOW
            </button>
          </div>
        </div>
      </div>

      <BusinessLoanEMICalculator />
      <BusinessLoanFeatures />
      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default Business;
