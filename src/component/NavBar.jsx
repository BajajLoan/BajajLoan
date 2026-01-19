import { FaRegUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import logo from "../assets/BajajLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const NavBar = ()=>{
  const navigation = useNavigate();
    const [showSideMenu ,setShowSideMenu]=useState(false)
    return (
        <>
      <nav className="bg-[#002b5c] text-white px-4 py-3 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <img onClick={() => navigate("/")} src={logo} alt="Bajaj Logo" className="h-8 w-auto object-contain" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide">
              BAJAJ FINANCE LIMITED
            </span>
          </div>

          <div className="flex items-center gap-5 text-base sm:text-lg relative">
            {(location.pathname !== "/signin") && (
              <>
                <button className="focus:outline-none">
                  {/* {user && <FaBell className="text-xl sm:text-2xl" />} */}
                </button>
                <button onClick={()=>navigation("/dashboard")}  className="focus:outline-none">
                  <FaRegUser className="text-xl sm:text-2xl" />
                </button>
               <button onClick={()=>navigation("/previewPage")}>
                <MdMenu/>
               </button>
              </>
            )}
          </div>

          {/* Profile Popup */}
          {/* {showProfile  (
            <div
              ref={profileRef}
              className="absolute top-14 right-4 sm:right-6 bg-white text-black p-4 rounded-lg shadow-xl w-72 z-40 text-sm"
            >
              <p><strong>Name:</strong> {details.fname} {details.lname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {details.phone}</p>

              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-md text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          )} */}

          {/* Notifications Dropdown */}
          {/* {showNotifications && user && (
            <div
              ref={notificationRef}
              className="absolute top-14 right-2 sm:right-20 bg-white text-black p-4 rounded-lg shadow-xl w-[90vw] sm:w-80 z-40 text-sm max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-base sm:text-lg font-semibold mb-2">Notifications</h2>
              {messages.length === 0 ? (
                <p className="text-gray-600">No loan messages received yet.</p>
              ) : (
                <ul className="space-y-3">
                  {messages.map((msg, index) => (
                    <li key={index} className="border-b pb-2">
                      <p><strong>Loan:</strong> {msg.loanName}</p>
                      <p><strong>Amount:</strong> ₹{msg.loanAmount?.toLocaleString()}</p>
                      <p><strong>Charge:</strong> {msg.chargesName}</p>
                      <p><strong>Charges Applicable:</strong> ₹{msg.charges?.toLocaleString()}</p>
                      <p><strong>Status:</strong> {msg.status || "pending"}</p>
                      {msg.createdAt?.seconds && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.createdAt.seconds * 1000).toLocaleString()}
                        </p>
                      )}
                      <button
                        onClick={() =>
                          navigate("/payment", {
                            state: {
                              chargesName: msg.chargesName,
                              charges: msg.charges,
                              loanAmount: msg.loanAmount,
                              loanName: msg.loanName,
                              requestId: msg.id,
                            },
                          })
                        }
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md text-sm font-semibold transition"
                      >
                        Payment Now
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )} */}
        </div>
      </nav>

      {/* Side Stripe Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${showSideMenu ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col gap-6 text-[#002b5c] font-semibold text-sm sm:text-base">
          <button onClick={() => { navigate("/history"); setShowSideMenu(false); }}>📜 History</button>
          <button onClick={() => { navigate("/terms"); setShowSideMenu(false); }}>📄 Terms & Conditions</button>
          <button onClick={() => { navigate("/contact"); setShowSideMenu(false); }}>📞 Contact Us</button>
          <button onClick={{}} className="text-red-600 hover:text-red-700 transition">🚪 Logout</button>
          <button onClick={() => setShowSideMenu(false)} className="mt-auto text-gray-400 hover:text-gray-600 text-sm">❌ Close Menu</button>
        </div>
      </div>

      {/* Overlay for side menu */}
      {/* {showSideMenu && (
        <div onClick={() => setShowSideMenu(false)} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )} */}

      {/* Spacer below fixed navbar */}
      <div className="pt-20"></div>
    </>
    )
}
export default NavBar