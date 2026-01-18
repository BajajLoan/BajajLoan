import React from "react";
import Image from "../../assets/image.png";
import "./PersonalLoanFeature.css";

const PersonalLoanFeature = () => {
  return (
    <div className="pl-page">
      <div className="pl-subheading">
        Read on to know why our personal loan is the best option for you.
      </div>

      <div className="pl-content-row">
        {/* Left Section */}
        <div className="pl-left-card">
          <img src={Image} alt="Personal Loan" className="pl-image" />
        </div>

        {/* Right Section */}
        <div className="pl-right-content">
          <div className="pl-heading">
            Features and benefits of our personal loan
          </div>

          <ul className="pl-list">
            <li>
              <strong>3 unique variants</strong>
              <br />
              Pick the loan variant that suits you best: Term loan, Flexi Term
              (Dropline) Loan, and Flexi Hybrid Term Loan.
            </li>

            <li>
              <strong>No part-prepayment charge on Flexi Loans</strong>
              <br />
              Repay a part of your loan in advance, at no extra cost. You can
              part-pay as many times as you want.
              <span className="pl-link"> Read about Flexi Loans</span>
            </li>

            <li>
              <strong>High loan amount</strong>
              <br />
              Manage your small or large expenses with loans ranging from Rs.
              40,000 to Rs. 55 lakh.
            </li>

            <li>
              <strong>Approval in just 5 minutes</strong>
              <br />
              Complete your entire application online and get instant approval.
            </li>

            <li>
              <strong>Money in your account in 24 hours*</strong>
              <br />
              Your loan amount is credited quickly so you can manage expenses
              comfortably.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanFeature;
