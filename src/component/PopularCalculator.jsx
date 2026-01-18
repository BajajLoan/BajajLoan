import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCoins, FaBriefcase, FaBalanceScale, FaHome, FaCar, FaShieldAlt, FaChartBar, FaUserMd } from "react-icons/fa";

const calculators = [
  { label: "Personal Loan EMI", icon: <FaUser size={32} /> },
  { label: "Easy EMI", icon: <FaCoins size={32} /> },
  { label: "Business Loan EMI", icon: <FaBriefcase size={32} /> },
  { label: "Fixed Deposit Interest", icon: <FaBalanceScale size={32} /> },
  { label: "Home Loan EMI", icon: <FaHome size={32} /> },
  { label: "Used Car Loan EMI", icon: <FaCar size={32} /> },
  { label: "Loan Against Securities", icon: <FaShieldAlt size={32} /> },
  { label: "Mutual Fund Calculator", icon: <FaChartBar size={32} /> },
  { label: "Loan for Doctors", icon: <FaUserMd size={32} /> },
];

const PopularCalculators = () => {

    const navigate= useNavigate();

    const Viewallhandle=()=>{
        navigate('/viewAll')
    }
    const Calc=()=>{
        navigate('/calculator');
    }
  return (
    <div className="py-10 px-4 md:px-12 bg-white">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Use our popular calculators</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {calculators.map((calc, index) => (
          <div onClick={Calc} key={index} className="flex flex-col items-center text-center space-y-2">
            <div onClick={Calc} className="bg-yellow-100 p-5 rounded-full text-blue-900 shadow-md">
              {calc.icon}
            </div>
            <span onClick={Calc} className="text-sm md:text-base">{calc.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button onClick={Viewallhandle} className="text-orange-600 hover:underline font-medium text-sm md:text-base">
          View All
        </button>
      </div>
    </div>
  );
};

export default PopularCalculators;
