import { Navigate } from "react-router-dom";
import { useAuth } from "../navigation/AuthContext";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [token,setIsToken]=useState(null)

  const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsToken(null);
  };
 useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) return;

    if (isTokenExpired(storedToken)) {
      logout();
    } else {
      setIsToken(storedToken);
      // setAutoLogout(storedToken);
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" replace={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
