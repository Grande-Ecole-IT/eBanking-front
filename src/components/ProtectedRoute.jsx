import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const provider = useAuth();

  if (!provider?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
