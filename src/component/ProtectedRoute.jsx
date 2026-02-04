import { Navigate } from "react-router-dom";
import { useAuth } from "../navigation/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useAuth();

  if (authLoading) return null;
  if (!token) {
    return <Navigate to="/login" replace={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
