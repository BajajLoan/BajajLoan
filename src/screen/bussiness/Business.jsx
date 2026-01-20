import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../firebase.jsx";
// import { doc, getDoc } from "firebase/firestore";
import Footer from "../../component/Footer.jsx";
import BusinessLoanEMICalculator from "../../emiCalculator/BusinessLoanEMICalculator.jsx";
import Bussiness from "../../assets/Bussiness.png";
import { ChevronDown, ChevronUp } from "lucide-react";
import Disclaimer from "../../component/Disclaimer.jsx";
import FAQSection from "../../component/FAQSection.jsx";
import BusinessLoanFeatures from "./BussinessLoanFeatures.jsx";

const Business = () => {
  // const [user, setUser] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState(60); // default 60 months
  const interestRate = 7;
  const navigate = useNavigate();

 

  const safeLoanAmount =
    loanAmount === "" || isNaN(Number(loanAmount)) ? 0 : Number(loanAmount);

  const calculateEMI = (P, R, N) => {
    const r = R / 12 / 100;
    return (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  };

  const emi = calculateEMI(safeLoanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;
  const interestAmount = totalAmount - safeLoanAmount;

  const getRandomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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
  const netAmount = safeLoanAmount;

  

  // const [openIndex, setOpenIndex] = useState(null);
  // const toggleAccordion = (index) =>
  //   setOpenIndex(openIndex === index ? null : index);

  const tenureOptions = Array.from({ length: 16 }, (_, i) => (i + 1) * 6);
  const [showAllTenures, setShowAllTenures] = useState(false);

  return (
    <div className="bg-white">
      <h2 className="text-xl font-bold text-center mb-4">Apply for Loan</h2>
      <div className="max-w-[1200px]  px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* IMAGE + TEXT */}
          <div className="order-1 md:order-none">
            <img
              src={Bussiness}
              alt="Business Loan Banner"
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Get a business loan of up to ₹50 lakh* with interest rates starting at just 7%* p.a. Flexible repayment tenure of up to 30 years and quick disbursal to grow your business without limits.
              </p>
            </div>
          </div>

          {/* EMI FORM */}
          <div className="bg-white p-2 order-2">
            <h2 className="text-xl font-bold mb-4">Business Loan</h2>
            <div className="text-sm text-gray-600 mb-4">
              <p>Rates from 7% p.a | Loan up to ₹50 lakh | Tenure up to 30 years</p>
            </div>

            <label className="block text-lr font-bold text-black-700 mb-1">Enter Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full mb-4"
              min={100000}
              max={5000000}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Tenure: {tenure} Months
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {(showAllTenures ? tenureOptions : tenureOptions.slice(0, 6)).map(
                (month) => (
                  <button
                    key={month}
                    onClick={() => setTenure(month)}
                    className={`py-2 rounded text-sm font-medium border ${
                      tenure === month
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {month}
                  </button>
                )
              )}
            </div>
            {!showAllTenures && (
              <button
                onClick={() => setShowAllTenures(true)}
                className="text-blue-600 text-sm underline mb-4"
              >
                Show More
              </button>
            )}

            <div className="p-4 rounded text-sm bg-blue-50">
              <p className="text-gray-700">
                EMI for {tenure} Months at {interestRate}% p.a.
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{emi.toFixed(2)}
              </p>
              <p className="mt-1 text-gray-600">
                Total Amount ₹{totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* SUMMARY BOX */}
          <div className="bg-white order-3 md:sticky md:top-8">
            <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
            <div className="text-sm space-y-2 text-gray-800">
              <p>
                <strong>Loan Amount:</strong> ₹{safeLoanAmount.toFixed(2)}
              </p>
              <p>
                <strong>Tenure:</strong> {tenure} Months
              </p>
              <p>
                <strong>Interest Rate:</strong> {interestRate}%
              </p>
              <p>
                <strong>EMI:</strong> ₹{emi.toFixed(2)}
              </p>
              <p>
                <strong>Processing Fee:</strong> ₹{processingFee}
              </p>
              <p className="bg-yellow-100 p-2 rounded font-bold">
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
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-medium"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

        {/* EMI Calculator */}
        {/* <div> */}
          
        {/* </div> */}

        

        
      </div>
      <BusinessLoanEMICalculator />
      <BusinessLoanFeatures/>
      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default Business;
