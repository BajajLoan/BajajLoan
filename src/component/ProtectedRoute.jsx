import { Navigate } from "react-router-dom";
import { useAuth } from "../navigation/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token,  } = useAuth();

//   if (loading) return <h3>Loading...</h3>;

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
