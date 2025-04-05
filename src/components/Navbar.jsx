/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import Logo from "../assets/Logo.png";
import { useAuth } from "../hooks/useAuth";
import DashboardNotification from './DashboardNotification';
import { useEffect, useState } from "react";
import { getReceptionTransactions } from "../services/databases/transactions";

const Navbar = ({ logo }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [transactionDemands, setTransactionDemands] = useState(null);
  const provider = useAuth();
  const [notificationCardView, setNotificationCardView] = useState(false);

  const toggleNotificationCardView = () => setNotificationCardView(v => !v);

    useEffect(() => {
      getReceptionTransactions(provider?.user?.$id).then(res => setTransactionDemands(res.documents)).catch(console.log);
    }, [provider?.user?.$id])

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-20 ">
      <div className="container mx-auto px-4 backdrop-blur-3xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="FlashPay" className="w-25" />
          </div>

          {/* Navigation centrale */}
          <nav className="hidden md:flex items-center space-x-8 mx-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-2"
                  : "text-gray-500 hover:text-blue-600 transition-colors duration-200"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-2"
                  : "text-gray-500 hover:text-blue-600 transition-colors duration-200"
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-2"
                  : "text-gray-500 hover:text-blue-600 transition-colors duration-200"
              }
            >
              Analysis
            </NavLink>
          </nav>

          {/* Section droite avec notifications et profil */}
          <div className="flex items-center space-x-6">
            {/* Icône de notifications */}
              <div>
              <button onClick={toggleNotificationCardView} className="relative p-1 text-gray-500 hover:text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div>
              {notificationCardView && <DashboardNotification  transactionDemands={transactionDemands}/>}
            </div>
              </div>

            {/* Profil utilisateur avec déconnexion */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-100"
                />
                <div className="hidden md:block">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {user?.name}
                  </h3>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                title="Déconnexion"
                onClick={handleLogout}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation mobile */}
        <nav className="flex md:hidden items-center justify-center mt-4 overflow-x-auto pb-2 space-x-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium px-2 whitespace-nowrap"
                : "text-gray-500 px-2 whitespace-nowrap"
            }
          >
            All
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium px-2 whitespace-nowrap"
                : "text-gray-500 px-2 whitespace-nowrap"
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium px-2 whitespace-nowrap"
                : "text-gray-500 px-2 whitespace-nowrap"
            }
          >
            Analysis
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
