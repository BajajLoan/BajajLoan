const TermCondition = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-4xl w-full p-8 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to our loan service. By accessing or using our platform, you agree to be bound by the following terms and conditions:
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Loan Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years of age and meet our credit criteria to apply for a loan. Providing false information will result in disqualification.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Payment and Repayment</h2>
        <p className="mb-4">
          All payments must be made to the account provided on the payment page. You are responsible for ensuring timely repayments as per the agreed EMI schedule.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Processing Fees</h2>
        <p className="mb-4">
          A processing fee may apply to your loan. This amount will be deducted before disbursing the net loan amount to you.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. UPI Transactions</h2>
        <p className="mb-4">
          We are not responsible for any errors in UPI transactions. Please double-check the UPI ID and transaction details before confirming any payment.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Privacy Policy</h2>
        <p className="mb-4">
          Your personal and financial information will be stored securely and used only for processing your loan. We do not sell or share your data with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Liability</h2>
        <p className="mb-4">
          We are not liable for any loss or damage resulting from delays, failed payments, or incorrect details submitted by the user.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to update these terms at any time without prior notice. Continued use of the service indicates your acceptance of any changes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
        <p className="mb-4">
          For any queries related to these terms, contact us at <strong>support@example.com</strong>.
        </p>

        <p className="text-center mt-8 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Loan Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default TermCondition;
