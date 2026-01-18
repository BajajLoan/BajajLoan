import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../component/Footer.jsx";
import EducationLoanEMICalculator from "../../emiCalculator/EducationLoanEMICalculator.jsx";
import Educationi from "../../assets/Education.png";
import { ChevronDown, ChevronUp } from "lucide-react";
import Disclaimer from "../../component/Disclaimer.jsx";
import FAQSection from "../../component/FAQSection.jsx";
import EducationLoanFeatures from "./EducationLoanFeatures.jsx";

const Education = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => setOpenIndex(openIndex === index ? null : index);

  const [user, setUser] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState(12);
  const interestRate = 4;
  const navigate = useNavigate();
  const [showAllTenures, setShowAllTenures] = useState(false);

//   useEffect(() => {
//     onAuthStateChanged(auth, setUser);
//   }, []);

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

  const handleApplyClick = async () => {
    const loanData = {
      loanName: "Education Loan",
      loanAmount: safeLoanAmount,
      tenure,
      interestRate,
      emi,
      totalAmount,
      interestAmount,
      processingFee,
      netAmount,
    };

}

  const allTenures = Array.from({ length: 16 }, (_, i) => (i + 1) * 6);
  const visibleTenures = showAllTenures ? allTenures : allTenures.slice(0, 6);

  const data = [
    {
      title: "Eligibility criteria and documents required",
      content: (
        <div className="text-sm text-gray-700 mt-2 space-y-2">
          <p>Anyone can apply for our home loan as long as they meet the criteria mentioned below.</p>
          <div>
            <p className="font-semibold">Eligibility criteria</p>
            <ul className="list-disc ml-5 space-y-1">
              <li><strong>Nationality:</strong> You must be an Indian citizen residing in India.</li>
              <li><strong>Age:</strong> Salaried: 23–67 | Self-employed: 23–70 years.</li>
              <li><strong>CIBIL Score:</strong> 725 or higher.</li>
              <li><strong>Occupation:</strong> Salaried, professional, or self-employed.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mt-2">Documents required</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>KYC documents</li>
              <li>Proof of income</li>
              <li>Proof of business (if applicable)</li>
              <li>Last 6 months account statements</li>
            </ul>
          </div>
          <p className="mt-2 text-xs text-gray-500">Note: This list may vary based on your application.</p>
        </div>
      ),
    },
    {
      title: "How to apply for a education loan",
      content: (
        <div className="text-sm text-gray-700 mt-2 space-y-2">
          <p className="font-semibold">Steps:</p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Click on "APPLY".</li>
            <li>Enter and verify your mobile number.</li>
            <li>Fill personal and employment details.</li>
            <li>Submit property and banking info.</li>
          </ol>
          <p>Our team will assist you in the next steps.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <h2 className="text-xl font-bold text-center mb-4">Apply for Loan</h2>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="order-1 md:order-none">
            <img src={Educationi} alt="Education Loan" className="w-full h-auto rounded-lg" />
            <p className="mt-4 text-sm text-gray-600">
              Avail education loans up to ₹25 lakhs* for higher studies in India or abroad...
            </p>
          </div>

          <div className="bg-white p-6 order-2">
            <h2 className="text-xl font-bold mb-4">Education Loan</h2>
            <p className="text-sm text-gray-600 mb-4">
              Interest rates from 4% p.a | Loan up to ₹25 lakh | Tenure up to 90 months
            </p>

            <label className="block text-lr font-bold text-black-700 mb-1">Enter loan amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              placeholder="Enter amount"
              className="border border-gray-300 px-3 py-2 rounded w-full mb-4"
              min={10000}
              max={2500000}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selected loan tenure: {tenure} months
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {visibleTenures.map((month) => (
                <button
                  key={month}
                  onClick={() => setTenure(month)}
                  className={`py-2 rounded text-sm font-medium border ${tenure === month ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                >
                  {month}
                </button>
              ))}
            </div>

            {!showAllTenures && (
              <button
                onClick={() => setShowAllTenures(true)}
                className="text-xs text-blue-600 underline mb-4"
              >
                Show more tenures
              </button>
            )}

            <div className="p-4 rounded text-sm bg-gray-50 mt-2">
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

          <div className="bg-white order-3 md:sticky md:top-8">
            <h3 className="text-lg font-semibold mb-4">Loan summary</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Loan amount:</strong> ₹{safeLoanAmount.toFixed(2)}</p>
              <p><strong>Tenure:</strong> {tenure} months</p>
              <p><strong>Interest rate:</strong> {interestRate}% p.a.</p>
              <p><strong>EMI:</strong> ₹{emi.toFixed(2)}</p>
              <p><strong>Processing Fee:</strong> ₹{processingFee}</p>
              <p className="font-bold bg-yellow-100 p-2 rounded">
                Amount to be credited: ₹{netAmount.toFixed(2)}
              </p>
              <button
                onClick={{}}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-medium"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <EducationLoanEMICalculator />
        </div>
      </div>

     
       
        <EducationLoanFeatures/>
      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default Education;
