import "./EducationLoanFeatures.css";

const features = [
  {
    title: "Loan amount up to Rs. 1.5 Crore*",
    description:
      "Fulfil your higher education dreams in India or abroad with an education loan of up to Rs. 1.5 Crore*."
  },
  {
    title: "Low interest rates",
    description:
      "Enjoy competitive interest rates that make education financing affordable and stress-free."
  },
  {
    title: "Flexible repayment tenure",
    description:
      "Repay your education loan comfortably with long and flexible repayment tenures."
  },
  {
    title: "Moratorium period",
    description:
      "Get a moratorium period covering your course duration plus additional time after completion."
  },
  {
    title: "Covers tuition & living expenses",
    description:
      "Loan covers tuition fees, accommodation, travel expenses, books, and other education-related costs."
  },
  {
    title: "No margin for select courses",
    description:
      "Avail education loans with no margin money requirement for select premier institutions."
  },
  {
    title: "Tax benefits",
    description:
      "Claim tax benefits under Section 80E on interest paid towards your education loan."
  },
  {
    title: "Quick & hassle-free processing",
    description:
      "Minimal documentation and faster processing to ensure timely disbursement."
  },
  {
    title: "Loans for India & abroad",
    description:
      "Finance higher studies in India as well as overseas universities and institutions."
  }
];

export default function EducationLoanFeatures() {
  return (
    <section className="edu-features-container">
      <h2 className="edu-features-title">
        Features and benefits of our education loan
      </h2>

      <div className="edu-features-grid">
        {features.map((item, index) => (
          <div className="edu-feature-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
