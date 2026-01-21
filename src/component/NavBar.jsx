import { FaRegUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdMenu, MdClose, MdCall, MdOutlineFormatAlignCenter } from "react-icons/md";
import logo from "../assets/BajajLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { History, LogOut, LucideLayoutDashboard } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSideMenu, setShowSideMenu] = useState(false);

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
              <FaBell className="hidden sm:block cursor-pointer" />
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
            onClick={() => { navigate("/applications"); setShowSideMenu(false); }}
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
                navigate("/signin");
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
