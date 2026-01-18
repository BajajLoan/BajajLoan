import { useState } from "react";

const faqs = [
  {
    question: "What is an EMI?",
    answer:
      "An EMI, or equated monthly instalment, is the total amount payable every month until the loan has been fully repaid. Every EMI consists of a principal component and an interest component. You can calculate your EMI in advance by using any of our EMI calculators.",
  },
  {
    question: "What are the factors that affect your EMIs?",
    answer: [
      "The following factors affect your EMI dues:",
      "Loan amount - Monthly instalments payable are directly proportional to the loan amount opted. The higher, the higher will be your EMIs.",
      "Rate of interest - The interest rate is the percentage that lenders charge on the borrowed amount. The EMIs rise with a higher interest rate and vice versa.",
      "Tenure - It is the repayment period for the loan availed and is inversely related to EMIs. A longer tenure reduces monthly instalments. While a shorter tenure increases them"
    ],
  },
  {
    question: "How to calculate personal loan EMIs?",
    answer:
      "It is advisable to calculate your potential EMI dues before applying for a personal loan. While you can do so manually, using a personal loan EMI calculator can help you determine the amount more accurately. you just need to select the loan amount, tenure and rate of interest to get the exact payable EMI with an interactive chart.",
  },
  {
    question: "What is business loan EMI?",
    answer:["A Business Loan EMI is the Equated Monthly Installment that a borrower must pay each month to repay a business loan. This loan is typically used to fund business-related expenses like",
      "Starting a new business",
      "Expanding operations",
      "Purchasing inventory or equipment",
      "Managing working capital"
    ]
  },
  {
    question: "What is an education loan calculator?",
    answer:[
      "An Education Loan EMI Calculator is an online tool that helps you estimate your monthly loan repayment (EMI) when you borrow money to finance higher education expenses (like tuition fees, accommodation, books, etc.).",
      "Know your monthly EMI in advance",
      "Plan your finances and repayment",
      "Compare loan options with different tenures or interest rates"
      
  ]
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-md overflow-hidden bg-blue-50">
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${
                openIndex === index ? "bg-blue-100" : ""
              }`}
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-orange-600" : "text-orange-500"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-700">
                {Array.isArray(faq.answer) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {faq.answer.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{faq.answer}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
