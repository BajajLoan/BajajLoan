import React from "react";
import Bussiness from "../../assets/BussinesNew.png";

const BusinessLoanFeatures = () => {
  return (
    <>
      <style>
        {`
          .bl-page {
            font-family: Arial, sans-serif;
            color: #000;
            padding: 20px;
            max-width: 1200px;
           
          }

          .bl-heading {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .bl-content-row {
            display: flex;
            gap: 30px;
            align-items: flex-start;
          }

          .bl-left {
            width: 420px;
            flex-shrink: 0;
          }

          .bl-image {
            width: 100%;
            height: auto;
            display: block;
          }

          .bl-right {
            flex: 1;
          }

          .bl-list {
            padding-left: 20px;
            margin: 0;
          }

          .bl-list li {
            margin-bottom: 14px;
            font-size: 14px;
            line-height: 1.5;
          }

          .bl-bold {
            font-weight: 700;
          }

          .bl-highlight {
            color: #ff6a00;
            font-weight: 600;
          }

          .bl-footer-heading {
            margin-top: 24px;
            font-size: 16px;
            font-weight: 700;
          }

          /* =========================
             RESPONSIVE CSS
          ========================== */

          @media (max-width: 768px) {
            .bl-content-row {
              flex-direction: column;
            }

            .bl-left {
              width: 100%;
            }

            .bl-heading {
              font-size: 20px;
            }
          }
        `}
      </style>

      <div className="bl-page">
        <div className="bl-heading">Features and benefits of Business Loan</div>

        <div className="bl-content-row">
          {/* Left Section */}
          <div className="bl-left">
            <img
              src={Bussiness}
              alt="Bajaj Finserv Business Loan"
              className="bl-image"
            />
          </div>

          {/* Right Section */}
          <div className="bl-right">
            <ul className="bl-list">
              <li>
                <span className="bl-bold">3 unique variants</span>
                <br />
                Choose the loan type that suits you the best –{" "}
                <span className="bl-highlight">
                  Term Loan, Flexi Term (Dropline) Loan, Flexi hybrid term loan
                </span>
                .
              </li>

              <li>
                <span className="bl-bold">
                  No part-prepayment charge on Flexi variants
                </span>
                <br />
                You can prepay a portion of your loan at no extra charges with our
                Flexi Term (Dropline) Loan and Flexi hybrid term loan.
              </li>

              <li>
                <span className="bl-bold">Loan of up to Rs. 80 lakh</span>
                <br />
                Manage your small or large business expenses with loans ranging
                from 200000 to Rs. 80 lakh.
              </li>

              <li>
                <span className="bl-bold">
                  Convenient tenures of up to 8 years
                </span>
                <br />
                Get the added flexibility to pay back your loan with repayment
                options ranging from 6 months to 96 months.
              </li>

              <li>
                <span className="bl-bold">
                  Money in your bank account in 48 hours*
                </span>
                <br />
                In most cases, you will receive the loan amount in your account
                within 48 hours of approval.
              </li>

              <li>
                <span className="bl-bold">No hidden charges</span>
                <br />
                All fees and charges are mentioned upfront on this page and in the
                loan document. We advise you to read these in detail.{" "}
                <span className="bl-highlight">
                  Know about our interest rate and charges
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bl-footer-heading">
          Features and benefits of our Business Loan
        </div>
      </div>
    </>
  );
};

export default BusinessLoanFeatures;
