import React from "react";
import FAQSection from './FAQSection'
import Footer from "./Footer";
import Disclaimer from "./Disclaimer";

const personalCalculators = [
  { title: "Personal loan EMI calculator", icon: "💳" },
  { title: "Check Eligibility", icon: "📊" },
  { title: "Flexi Day-Wise Interest Calculator", icon: "📆" },
  { title: "Flexi Transaction Calculator", icon: "🔄" },
];

const businessCalculators = [
  { title: "Business Loan EMI", icon: "💼" },
  { title: "Doctor Loan EMI", icon: "🩺" },
];

function ViewAll() {
  return (
    <div>
    <div className="min-h-screen bg-slate-100 text-gray-900 p-4 md:p-8">
     
      <nav className="text-sm text-blue-600 mb-4">
        <a href="/" className="hover:underline">Home</a>{" "}
        &gt; <span className="font-bold text-gray-800">Calculators</span>
      </nav>

      {/* Header */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Our portfolio of calculators
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          From eligibility to EMIs, and investments to FD, we have a calculator for all your needs.
        </p>
      </div>

      {/* Personal Loan Section */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Loan calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {personalCalculators.map((calc, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-4 border rounded-lg bg-gray-50 hover:bg-blue-50 transition"
            >
              <div className="text-3xl mb-2">{calc.icon}</div>
              <span className="text-sm font-medium text-blue-800">{calc.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Business & Professional Loan Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Professional and Business Loan calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {businessCalculators.map((calc, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-4 border rounded-lg bg-gray-50 hover:bg-blue-50 transition"
            >
              <div className="text-3xl mb-2">{calc.icon}</div>
              <span className="text-sm font-medium text-blue-800">{calc.title}</span>
            </div>
          ))}
        </div>
      </div>
      <FAQSection/>
      <Disclaimer/>
    </div>
    <Footer/>
    </div>
  );
}

export default ViewAll;
