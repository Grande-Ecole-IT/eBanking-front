import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * provide this
 * @returns {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated,
  }
 */
export const useAuth = () => useContext(AuthContext);