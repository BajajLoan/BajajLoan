import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useNavigate } from "react-router-dom";

const HomeLoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(3000000); // ₹30L
  const [interestRate, setInterestRate] = useState(6); // Home loan rate
  const [tenure, setTenure] = useState(96); // 20 years
  const navigate=useNavigate();

  const calculateEMI = (P, R, N) => {
    const r = R / 6 / 100;
    return (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayable = emi * tenure;
  const interestAmount = totalPayable - loanAmount;

  return (
    <div className="bg-white p-4 md:p-10 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-gray-800">
        Home Loan EMI Calculator
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Calculate your home loan EMI and plan your budget better
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-8">
          {/* LOAN AMOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount (in rupees)
            </label>
            <Range
              step={50000}
              min={500000}
              max={10000000}
              values={[loanAmount]}
              onChange={(values) => setLoanAmount(values[0])}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    background: getTrackBackground({
                      values: [loanAmount],
                      colors: ["#2563eb", "#e0e0e0"],
                      min: 500000,
                      max: 10000000,
                    }),
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 rounded-full bg-blue-600 shadow"
                />
              )}
            />
            <div className="text-sm flex justify-between mt-2 text-gray-500">
              <span>5 L</span>
              <span>1 Cr</span>
            </div>
            <div className="text-right font-semibold text-gray-800">
              ₹{loanAmount.toLocaleString()}
            </div>
          </div>

          {/* INTEREST RATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <Range
              step={0.1}
              min={6}
              max={12}
              values={[interestRate]}
              onChange={(values) => setInterestRate(values[0])}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    background: getTrackBackground({
                      values: [interestRate],
                      colors: ["#2563eb", "#e0e0e0"],
                      min: 6,
                      max: 12,
                    }),
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 rounded-full bg-blue-600 shadow"
                />
              )}
            />
            <div className="text-sm flex justify-between mt-2 text-gray-500">
              <span>6%</span>
              <span>12%</span>
            </div>
            <div className="text-right font-semibold text-gray-800">
              {interestRate.toFixed(2)}%
            </div>
          </div>

          {/* TENURE */}
                    <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenure (in months)
            </label>
            <Range
              step={1}
              min={12}
              max={96}
              values={[tenure]}
              onChange={(values) => setTenure(values[0])}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    background: getTrackBackground({
                      values: [tenure],
                      colors: ["#2563eb", "#e0e0e0"],
                      min: 12,
                      max: 96,
                    }),
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 rounded-full bg-blue-600 shadow"
                />
              )}
            />
            <div className="text-sm flex justify-between mt-2 text-gray-500">
              <span>12</span>
              <span>96</span>
            </div>
            <div className="text-right font-semibold text-gray-800">
              {tenure} months
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#05294b] text-white rounded-lg p-6 flex flex-col justify-between shadow-md h-fit">
          <div>
            <p className="text-sm font-medium">Your EMI is</p>
            <h3 className="text-4xl font-bold mt-1 mb-4">₹{emi.toFixed(0)}</h3>
            <div className="flex justify-between text-sm text-blue-200">
              <p>
                • <span className="text-white">Total Interest</span>
                <br /> ₹{interestAmount.toLocaleString()}
              </p>
              <p>
                • <span className="text-white">Total Amount Payable</span>
                <br /> ₹{totalPayable.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm mt-6">
            <button onClick={()=>{navigate('/history')}} className="text-orange-400 underline">View Repayment Schedule</button>
            <button className="text-orange-500 font-semibold">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanEMICalculator;
