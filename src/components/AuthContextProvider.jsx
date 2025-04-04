import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUser,
  getCurrentUser,
  loginWithEmail,
  logout,
} from "../services/authService";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        throw new Error(err.message);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const signup = async (email, password, name, profileImage = null) => {
    try {
      await createUser(email, password, name, profileImage);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const currentUser = await loginWithEmail(email, password);
      setUser(currentUser);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout: logoutUser,
    isAuthenticated: !!user,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthContextProvider;
