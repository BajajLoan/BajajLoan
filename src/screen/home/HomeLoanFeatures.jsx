import "./HomeLoanFeatures.css";

const features = [
  {
    title: "Loan of up to Rs. 15 Crore*",
    description:
      "Buying a home is one of the biggest milestones. Achieve it with a sizeable amount of up to Rs. 15 Crore*."
  },
  {
    title: "Low interest rates",
    description:
      "With our loan interest rates starting at 7.15%* p.a, pay EMIs as low as Rs. 664/lakh*."
  },
  {
    title: "Approval in 48 Hours*",
    description:
      "Your loan application will be approved within 48 Hours* of your application, in some cases, even earlier."
  },
  {
    title: "Tenure of up to 32 years*",
    description:
      "Pay back your loan comfortably with our long repayment tenure ranging up to 32 years*."
  },
  {
    title: "No foreclosure fee for individuals",
    description:
      "Individual borrowers who choose a floating interest rate can foreclose the entire amount or prepay a part of the loan without paying an additional fee."
  },
  {
    title: "Hassle-free application",
    description:
      "Our doorstep document pick-up service helps to skip numerous branch visits and enables an easy application process."
  },
  {
    title: "Balance Transfer facility",
    description:
      "Benefit from our home loan balance transfer facility and be eligible for a top-up loan of up to Rs. 1 crore* or higher."
  },
  {
    title: "5000+ approved projects",
    description:
      "Choose from our 5000+ approved projects to avail of a quick loan."
  },
  {
    title: "Externally benchmarked interest rates",
    description:
      "You can opt for interest rates linked to an external benchmark, such as the repo rate to benefit during favourable market conditions."
  }
];

export default function HomeLoanFeatures() {
  return (
    <section className="features-container">
      <h2 className="features-title">Features and benefits of our home loan</h2>

      <div className="features-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
