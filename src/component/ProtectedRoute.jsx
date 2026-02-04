import { Navigate } from "react-router-dom";
import { useAuth } from "../navigation/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [token,setToken]=useState(null)
  useEffect(()=>{
    const res=localStorage.getItem("token")
    setToken(res)
  },[])

  if (!token) {
    return <Navigate to="/login" replace={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
