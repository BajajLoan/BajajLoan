import BajajLogo from "../assets/BajajLogo.png";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate=useNavigate();
  const Admin=()=>{
    navigate('/admin')
  }
  return (
    <footer className="bg-[#002b5c] text-white text-sm pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
       
        <div>
          <h3 className="font-bold mb-2">Corporate Office</h3>
          <p>6th Floor Bajaj Finserv Corporate Office, Off Pune-Ahmednagar Road, Viman Nagar, Pune - 411014</p>
        </div>

       
        <div>
          <h3 className="font-bold mb-2">Bajaj Finance Limited Regd. Office</h3>
          <p>Akudi, Pune – 411026</p>
          <p>Ph No: 020 7157-6506</p>
          <p>Email ID: investor.service@bajajfinserv.com</p>

          <p className="mt-2 font-bold">Corporate Identity Number (CIN)</p>
          <p>L65910MH1987PLC042961</p>

          <p className="mt-2 font-bold">IRDAI Corporate Agency (Composite) Regn No.</p>
          <p>CA0101 <br /> (Valid till 31-Mar-2028)</p>

          <p className="mt-2 font-bold">URN – WEB/BFL/23-24/1/V1</p>
        </div>

        {/* Bajaj Finserv Regd. Office */}
        <div>
          <h3 className="font-bold mb-2">Bajaj Finserv Limited Regd. Office</h3>
          <p>Bajaj Auto Limited Complex Mumbai – Pune Road, Pune – 411035 MH (IN)</p>
          <p>Ph No: 020 7188-6064</p>
          <p>Email ID: investors@bajajfinserv.in</p>

          <p className="mt-2 font-bold">Corporate Identity Number (CIN)</p>
          <p>L65923PN2007PLC130075</p>
        </div>

        {/* Our Companies & App */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold mb-2">Our Companies</h3>
          <ul className="space-y-1">
            <li>Bajaj Finserv Ltd.</li>
            <li>Bajaj Finance Ltd.</li>
            <li>Bajaj Allianz General Insurance</li>
            <li>Bajaj Allianz Life Insurance</li>
            <li>Bajaj Markets</li>
            <li onClick={Admin}>Bajaj panel</li>
            <li>Bajaj Housing Finance Ltd.</li>
            <li>Bajaj Broking</li>
            <li>Bajaj Finserv Health Ltd.</li>
            <li>Bajaj Finserv Asset Management Ltd.</li>
          </ul>

          <div className="mt-4 flex gap-4 items-center">
            <img src={BajajLogo} alt="Bajaj Logo" className="w-14" />
             <span className="text-[10px] sm:text-xs font-semibold tracking-wide">
    BAJAJ FINANCE LIMITED
  </span>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-6 border-t border-white/30 pt-4 text-center text-xs text-white/80">
        © Bajaj Finserv 2007–2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
