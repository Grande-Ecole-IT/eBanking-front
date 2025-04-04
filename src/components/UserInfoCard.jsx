/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const UserInfoCard = () => {
  const provider = useAuth();
  const user = provider?.user;
  const navigate = useNavigate();

  console.log(user);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await provider?.logout();
      navigate("/login");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img
              src={user?.picture}
              alt="Profil picture"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-blue-900 font-semibold">{user?.name}</h3>
              <p className="text-blue-600 text-sm">{user?.email}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            title="Déconnexion"
            onClick={handleLogout}
          >
            <FiLogOut className="text-lg" />
          </motion.button>
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
            <FiUser className="text-sm" />
          </div>
          <div>
            <p className="text-blue-500 text-xs">Membre depuis</p>
            <p className="text-blue-800 font-medium text-sm">
              {user.memberSince}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
            <FiClock className="text-sm" />
          </div>
          <div>
            <p className="text-blue-500 text-xs">Dernière connexion</p>
            <p className="text-blue-800 font-medium text-sm">
              {user.lastLogin}
            </p>
          </div>
        </div>
      </div> */}
      </div>
    </motion.div>
  );
};

export default UserInfoCard;
