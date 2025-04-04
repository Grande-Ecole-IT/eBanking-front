/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiClock, FiLogOut, FiUser } from "react-icons/fi";

const UserInfoCard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
  >
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {user.initials}
          </div>
          <div>
            <h3 className="text-blue-900 font-semibold">{user.name}</h3>
            <p className="text-blue-600 text-sm">{user.email}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
          title="Déconnexion"
        >
          <FiLogOut className="text-lg" />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  </motion.div>
);

export default UserInfoCard;
