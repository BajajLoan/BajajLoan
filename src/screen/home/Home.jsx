import { Link } from "react-router-dom";
import Homei from "../../assets/Home.png";
import Education from "../../assets/Education.png";
import Personalimage from "../../assets/Personalimage.png";
import Bussiness from "../../assets/Bussiness.png";
import PopularCalculators from "../../component/PopularCalculator";
import FAQSection from "../../component/FAQSection";
import Disclaimer from "../../component/Disclaimer";
import Footer from "../../component/Footer"

const Home =()=>{
    const offers = [
  {
    title: "Personal Loan",
    subtitle: "Check Pre-Approved",
    highlight: "Personal Loan",
    image: Personalimage,
    caption: "Personal Loan",
    link: "/personal",
  },
  {
    title: "Business Loan",
    subtitle: "Up to",
    highlight: "₹80 Lakh",
    image: Bussiness,
    caption: "Business Loan",
    link: "/business-loan",
  },
  {
    title: "Home Loan",
    subtitle: "Starting at",
    highlight: "7.99%* p.a.",
    image: Homei,
    caption: "Home Loan",
    link: "/home-loan",
  },
  {
    title: "Education Loan",
    subtitle: "Starting from",
    highlight: "₹5,000/-",
    image: Education,
    caption: "Education Loan",
    link: "/education-loan",
  },
  
];
    return (
         <div className="mt-0">
      <section className="bg-[#f6f8fe] py-10 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            Loan Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {offers.map((offer, index) => (
              <Link
                to={offer.link}
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden block"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-52 sm:h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-600">{offer.subtitle}</p>
                  <p className="text-orange-500 text-base font-semibold">
                    {offer.highlight}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
          </div>
        </div>
        </section>
        <PopularCalculators/>
        <FAQSection/>
        <Disclaimer/>
        <Footer/>
        </div>
    )
}

export default Home