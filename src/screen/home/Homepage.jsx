import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../firebase.jsx";
// import { doc, getDoc } from "firebase/firestore";
import Footer from "../../component/Footer.jsx";
import HomeLoanEMICalculator from "../../component/HomeLoanEMICalculator.jsx";
import Homei from '../../assets/Home.png';
// import AccordionSection from "../Components/AccordionSection.jsx";
import Disclaimer from "../../component/Disclaimer.jsx";
import FAQSection from "../../component/FAQSection.jsx";
import HomeLoanFeatures from "./HomeLoanFeatures.jsx";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState(96);
  const [showAllTenures, setShowAllTenures] = useState(false);
  const interestRate = 6;

  const navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, setUser);
  // }, []);

  // Convert string to number safely
  const safeLoanAmount = loanAmount === "" ? 0 : Number(loanAmount);

  const calculateEMI = (P, R, N) => {
    const r = R / 12 / 100;
    return (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  };

  const emi = calculateEMI(safeLoanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;
  const interestAmount = totalAmount - safeLoanAmount;

  const getRandomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getProcessingFee = (amount) => {
    if (amount <= 10000) return getRandomBetween(449, 649);
    if (amount <= 50000) return getRandomBetween(1149, 1449);
    if (amount <= 100000) return getRandomBetween(1449, 1649);
    if (amount <= 500000) return getRandomBetween(1649, 2249);
    return getRandomBetween(2249, 3249);
  };

  const processingFee = useMemo(() => getProcessingFee(safeLoanAmount), [safeLoanAmount]);
  const netAmount = safeLoanAmount;

  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setLoanAmount("");
    } else {
      const num = parseInt(value.replace(/^0+/, ""));
      if (!isNaN(num)) setLoanAmount(num);
    }
  };

  // const handleApplyClick = async () => {
  //   const loanData = {
  //     loanName: "Home Loan",
  //     loanAmount: safeLoanAmount,
  //     tenure,
  //     interestRate,
  //     emi,
  //     totalAmount,
  //     interestAmount,
  //     processingFee,
  //     netAmount,
  //   };    
  //       navigate("/apply-loan", { state: loanData });
  //   }
  // };

  const allTenures = Array.from({ length: 16 }, (_, i) => (i + 1) * 6);
  const visibleTenures = showAllTenures ? allTenures : allTenures.slice(0, 6);

  return (
    <div className="bg-white mt-16">
      <h2 className="text-xl text-center font-bold mb-4">Apply for Loan</h2>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* IMAGE + TEXT */}
          <div className="order-1 md:order-none">
            <img src={Homei} alt="Home Loan Banner" className="w-full h-auto rounded-lg" />
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Bajaj Finance offers a home loan of up to Rs. 15 crore* based on your eligibility, to buy your dream home
                with ease. With interest rates starting from 6%* p.a., you can get a home loan at an EMI of just Rs.
                722/lakh*. A housing loan with us comes with several benefits, like a flexible tenure of 30 years, no
                foreclosure fee, hassle-free application along with 5,000+ approved projects for a quick loan process.
              </p>
            </div>
          </div>

          {/* HOME LOAN FORM */}
          <div className="bg-white p-6 order-2">
            <h2 className="text-xl font-bold mb-4">Home Loan</h2>
            <p className="text-sm text-gray-600 mb-4">Interest rates starting 6% p.a | Loan upto Rs. 15cr* | Tenure up to 96 months*</p>

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


            <label className="block text-sm font-medium text-gray-700 mb-1">Selected loan tenure: {tenure} months</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {visibleTenures.map((month) => (
                <button
                  key={month}
                  onClick={() => setTenure(month)}
                  className={`py-2 rounded text-sm font-medium border ${
                    tenure === month ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
            {!showAllTenures && (
              <button
                onClick={() => setShowAllTenures(true)}
                className="text-blue-600 text-sm mt-1 underline"
              >
                Show more tenures
              </button>
            )}

            <div className="p-4 rounded text-sm mt-4 bg-gray-50">
              <p className="text-gray-700">EMI for {tenure} months at {interestRate}% p.a.</p>
              <p className="text-2xl font-bold text-blue-600">₹{emi.toFixed(2)}</p>
              <div className="mt-2 text-gray-600">
                <div className="h-2 overflow-hidden bg-gray-200 rounded">
                  <div className="bg-yellow-400 h-full" style={{ width: `${(safeLoanAmount / totalAmount) * 100}%` }}></div>
                </div>
                <p className="mt-1">Total Amount ₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* LOAN SUMMARY */}
          <div className="bg-white order-3 md:sticky md:top-8">
            <h3 className="text-lg font-semibold mb-4">Loan summary</h3>
            <p className="text-sm text-gray-600 mb-2">
              This summary is based on the details provided by you. It may get updated based on your final loan eligibility.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Loan amount:</strong> ₹{safeLoanAmount.toFixed(2)}</p>
              <p><strong>Tenure:</strong> {tenure} months</p>
              <p><strong>Annualised interest rate:</strong> {interestRate}%</p>
              <p><strong>EMI:</strong> ₹{emi.toFixed(2)}</p>
              <p><strong>Processing fee:</strong> ₹{processingFee}</p>
              <p className="font-bold bg-yellow-100 p-2 rounded">
                Amount to be credited: ₹{netAmount.toFixed(2)}
              </p>
              <button
                onClick={() =>
    navigate("/apply", {
      state: {
        loanName: "Home Loan",
        loanAmount,
        tenure
      }
    })
  }
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-medium"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

       
         
        
      </div>
<HomeLoanEMICalculator />
<HomeLoanFeatures/>
      {/* <AccordionSection /> */}
      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default Homepage;
 