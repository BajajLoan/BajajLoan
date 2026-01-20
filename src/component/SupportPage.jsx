import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import Disclaimer from "./Disclaimer";
import { FaMailBulk, FaPhone, FaWhatsapp } from "react-icons/fa";

const SupportPage = () => {
  const navigate = useNavigate();
  const [adminPhone, setPhone] = useState("");
  const [adminEmail, setEmail] = useState("");
  const [adminWhatsapp, setAdminWhatsapp] = useState("");

  const message = "Hi";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${adminWhatsapp}?text=${encodedMessage}`;

  const gotoHome = () => navigate("/");

  return (
    <div>
      <div className="relative bg-[#e8f0ff] min-h-screen p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Reach Us */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Reach us for any query
            </h2>
            <p className="text-gray-700 text-sm">
              Get in touch with us to find answers to your queries related to loans,
              investments, cards, insurance, and other services.
            </p>
          </div>

          {/* Self-service */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Self-service platforms for you
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-[#eaf3ff] border border-blue-300 p-4 rounded-xl text-blue-700 font-medium">
                🅱️ Customer Portal
              </button>
              <button
                onClick={gotoHome}
                className="bg-[#eaf3ff] border border-blue-300 p-4 rounded-xl text-blue-700 font-medium"
              >
                📱 Bajaj Finserv App
              </button>
            </div>
          </div>

          {/* 🔥 QUICK LINKS SECTION (NEW) */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                <div className="text-blue-600 text-xl mb-1">₹</div>
                <h3 className="font-semibold">Relations</h3>
                <p className="text-sm text-gray-600">
                  View all your relationship details
                </p>
              </div>

              <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                <div className="text-blue-600 text-xl mb-1">↩</div>
                <h3 className="font-semibold">Cancellations and Refunds</h3>
                <p className="text-sm text-gray-600">
                  Request cancellations and track refunds
                </p>
              </div>

              <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                <div className="text-blue-600 text-xl mb-1">PAY</div>
                <h3 className="font-semibold">Bajaj Pay Transactions</h3>
                <p className="text-sm text-gray-600">
                  Wallet balance, history and cashback
                </p>
              </div>

              <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                <div className="text-blue-600 text-xl mb-1">⚙</div>
                <h3 className="font-semibold">Account Settings</h3>
                <p className="text-sm text-gray-600">
                  Manage profile, payment & security
                </p>
              </div>
            </div>
          </div>

          {/* Need Assistance */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Need assistance?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href={`mailto:${adminEmail}?subject=Support Request`}
                className="bg-[#eaf3ff] border border-blue-300 p-4 rounded-xl text-blue-700 font-medium flex items-center justify-center gap-2"
              >
                <FaMailBulk /> Raise a Request
              </a>

              <a
                href={`tel:${adminPhone}`}
                className="bg-[#eaf3ff] border border-blue-300 p-4 rounded-xl text-blue-700 font-medium flex items-center justify-center gap-2"
              >
                <FaPhone /> Call Us
              </a>

              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold p-4 rounded-xl"
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <FAQSection />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default SupportPage;
