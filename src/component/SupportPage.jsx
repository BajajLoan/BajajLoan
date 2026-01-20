import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import { FaMailBulk, FaMailchimp, FaPhone, FaWhatsapp } from 'react-icons/fa';
import Disclaimer from "./Disclaimer";

const SupportPage = () => {
  const navigate = useNavigate();
  const [adminPhone, setPhone] = useState("");
  const [adminEmail, setEmail] = useState("");
  const [adminWhatsapp, setAdminWhatsapp] = useState("");
  const message = "Hi";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${adminWhatsapp}?text=${encodedMessage}`;

  // Fetch admin contact info from Firebase
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, "adminConfig", "credentials");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPhone(data.adminPhone || "");
          setEmail(data.adminEmail || "");
          setAdminWhatsapp(data.adminWhatsapp || "");
        }
      } catch (error) {
        console.error("Failed to fetch contact info", error);
      }
    };
    fetchContactInfo();
  }, []);

  const gotoHome = () => navigate("/");

  return (
    <div>
      <div className="relative bg-[#e8f0ff] min-h-screen p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Reach Us */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Reach us for any query</h2>
            <p className="text-gray-700 text-sm">
              Get in touch with us to find answers to your queries related to loans, investments,
              cards, insurance, and other services. <br />
              You can contact us for any assistance through the channels listed below.
            </p>
          </div>

          {/* Self-service */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Self-service platforms for you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-[#eaf3ff] hover:bg-blue-100 border border-blue-300 p-4 rounded-xl text-blue-700 font-medium flex items-center justify-center space-x-2">
                <span>🅱️</span>
                <span>Customer Portal</span>
              </button>
              <button
                onClick={gotoHome}
                className="bg-[#eaf3ff] hover:bg-blue-100 border border-blue-300 p-4 rounded-xl text-blue-700 font-medium flex items-center justify-center space-x-2"
              >
                <span>📱</span>
                <span>Bajaj Finserv App</span>
              </button>
            </div>
          </div>

          {/* Need Assistance */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Need assistance?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Mail */}
              <a
                href={`mailto:${adminEmail}?subject=Support Request`}
                className="bg-[#eaf3ff] hover:bg-blue-100 border border-blue-300 p-4 rounded-xl text-blue-700 font-medium flex items-center justify-center space-x-2"
              >
                <FaMailBulk size={20}/>
                {/* <span>📩</span> */}
                <span>Raise a Request</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${adminPhone}`}
                className="bg-[#eaf3ff] hover:bg-blue-100 border border-blue-300 p-4 rounded-xl text-blue-700 font-medium flex items-center justify-center space-x-2"
              ><span>Call Us</span>
                <FaPhone size={20} />
                
                
              </a>
              <a
  href={whatsappURL}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-green-600 text-white font-bold rounded-lg shadow"
>
  <FaWhatsapp size={20} />
  Chat on WhatsApp
</a>
            </div>
          </div>
        </div>
      </div>
      <FAQSection />
      <Disclaimer/>
      <Footer />
    </div>
  );
};

export default SupportPage;
