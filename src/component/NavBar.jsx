import { FaRegUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdMenu, MdClose, MdCall, MdOutlineFormatAlignCenter } from "react-icons/md";
import logo from "../assets/BajajLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { History, LogOut, LucideLayoutDashboard } from "lucide-react";
import apiRequest from "../services/api/apiRequest";
import { useAuth } from "../navigation/AuthContext";

const NavBar = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  
const [showBellPopup, setShowBellPopup] = useState(false);


  useEffect(() => {
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".bell-wrapper")) {
      setShowBellPopup(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, []);

useEffect(() => {
  setShowBellPopup(false);
}, [location.pathname]);


  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;
      if(!token)return;

      const res = await apiRequest(
        "get",
        `/pending-charges?email=${email}`
      );

      console.log(res)
      setHasNotification(res.hasPending);
    
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotifications();
}, []);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-[#002b5c] text-white px-4 py-3 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Bajaj Logo" className="h-8 w-auto" />
            <span className="text-[10px] sm:text-xs font-semibold">
              BAJAJ FINANCE LIMITED
            </span>
          </div>

          {/* ICONS */}
          {location.pathname !== "/signin" && (
            <div className="flex items-center gap-5 text-xl">
              <div className="relative bell-wrapper">

  <FaBell
    className="text-xl cursor-pointer"
    onClick={() => hasNotification && setShowBellPopup(!showBellPopup)}
  />

  {hasNotification && (
    <span
      className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px]
      w-4 h-4 rounded-full flex items-center justify-center"
    >
      1
    </span>
  )}

  {/* POPUP */}
  {showBellPopup && hasNotification && (
    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl p-4 z-50">
      <p className="text-black text-bold text-center">
       Your loan is approved, get loan in your bank
      </p>
       <div className="flex justify-center mt-3">
    <button
      className="bg-blue-900 px-4 py-2 rounded-md"
      onClick={() => navigate("/dashboard")}
    >
      <p className="text-[15px] md:text-md font-semibold text-white">
        Get Loan
      </p>
    </button>
    </div>
    </div>
    
  )}
</div>


              {/* <FaRegUser
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer" */}
              {/* /> */}
              <MdMenu
                onClick={() => setShowSideMenu(true)}
                className="cursor-pointer text-2xl"
              />
            </div>
          )}
        </div>
      </nav>

      {/* OVERLAY */}
      {showSideMenu && (
        <div
          onClick={() => setShowSideMenu(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-64 bg-white shadow-2xl z-50
        transform transition-transform duration-300
        ${showSideMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-bold text-[#002b5c]">My Account</h3>
          <MdClose
            onClick={() => setShowSideMenu(false)}
            className="text-2xl cursor-pointer text-gray-600"
          />
        </div>

        {/* MENU */}
        <div className="p-6 flex flex-col h-full text-[#002b5c] text-sm font-medium">

          <button
            onClick={() => { navigate("/dashboard"); setShowSideMenu(false); }}
            className="flex items-center gap-3 py-2 hover:text-indigo-600"
          >
            <LucideLayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={() => { navigate("/loan-application"); setShowSideMenu(false); }}
            className="flex items-center gap-3 py-2 hover:text-indigo-600"
          >
            <MdOutlineFormatAlignCenter size={18} /> Loan Applications
          </button>

          <button
            onClick={() => { navigate("/term&condition"); setShowSideMenu(false); }}
            className="flex items-center gap-3 py-2 hover:text-indigo-600"
          >
            <History size={18} /> Term&Condition
          </button>

          <button
            onClick={() => { navigate("/contact"); setShowSideMenu(false); }}
            className="flex items-center gap-3 py-2 hover:text-indigo-600"
          >
            <MdCall size={18} /> Contact Us
          </button>

          {/* PUSH LOGOUT TO BOTTOM */}
          <div className=" pt-6 border-t">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
                setShowSideMenu(false)
              }}
              className="flex items-center gap-3 text-red-600 hover:text-red-700"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
     
      {/* NAV SPACER */}
      <div className="pt-20"></div>

    </>
  );
};

export default NavBar;
