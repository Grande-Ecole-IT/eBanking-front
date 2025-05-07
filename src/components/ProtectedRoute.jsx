import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import MainLoader from "./MainLoader";

export const ProtectedRoute = ({ children }) => {
  const provider = useAuth();

  if (provider?.loading) {
    return <MainLoader />;
  }
  if (!provider?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
