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
         <div className="mt-10">
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
          {/* Pre-approved offers */}
<section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Pre-approved offers
      </h2>
      <span className="text-orange-500 font-medium cursor-pointer">
        View all
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      
      {/* Card 1 */}
      <div className="bg-[#7a4500] text-white rounded-lg p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">Loan Advice? Contact Us.</h3>
          <p className="text-sm mt-2">Get started in</p>
          <p className="text-2xl font-bold">2 Minutes</p>
          <p className="text-xs mt-2">Quick loan guidance</p>
        </div>
        <p className="text-sm mt-4">Call us at: 7757000000</p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#003f5c] text-white rounded-lg p-4">
        <h3 className="font-semibold text-lg">Personal Loan</h3>
        <p className="text-sm mt-2">Up to</p>
        <p className="text-2xl font-bold">₹55 L</p>
        <span className="inline-block bg-green-600 text-xs px-2 py-1 rounded mt-2">
          Minimal Documentation
        </span>
        <button className="mt-4 bg-white text-black px-4 py-1 rounded font-semibold">
          APPLY NOW
        </button>
      </div>

      {/* Card 3 */}
      <div className="bg-[#004b5f] text-white rounded-lg p-4">
        <h3 className="font-semibold text-lg">Voltas ACs</h3>
        <p className="text-sm mt-2">EMIs from</p>
        <p className="text-2xl font-bold">₹1888*</p>
        <span className="inline-block bg-green-600 text-xs px-2 py-1 rounded mt-2">
          ₹0 Down Payment
        </span>
        <button className="mt-4 bg-white text-black px-4 py-1 rounded font-semibold">
          EXPLORE NOW
        </button>
      </div>

      {/* Card 4 */}
      <div className="bg-[#003b44] text-white rounded-lg p-4">
        <h3 className="font-semibold text-lg">Mutual Funds</h3>
        <p className="text-sm mt-2">Start investing with just</p>
        <p className="text-2xl font-bold">₹100</p>
        <span className="inline-block bg-green-600 text-xs px-2 py-1 rounded mt-2">
          SIP or Lumpsum
        </span>
        <button className="mt-4 bg-white text-black px-4 py-1 rounded font-semibold">
          OPEN ACCOUNT
        </button>
      </div>

    </div>
  </div>
</section>

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