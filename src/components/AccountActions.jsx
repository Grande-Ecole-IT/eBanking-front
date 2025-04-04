/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiBell, FiCreditCard, FiPieChart, FiSettings } from "react-icons/fi";

const ActionButton = ({ icon, label }) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
  >
    <div className="text-blue-600 text-xl mb-2">{icon}</div>
    <span className="text-blue-800 text-sm font-medium">{label}</span>
  </motion.button>
);

const AccountActions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
  >
    <h3 className="text-lg font-semibold text-blue-900 mb-4">
      Gestion du compte
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <ActionButton icon={<FiCreditCard />} label="Mes cartes" />
      <ActionButton icon={<FiPieChart />} label="Budget" />
      <ActionButton icon={<FiSettings />} label="Paramètres" />
      <ActionButton icon={<FiBell />} label="Alertes" />
    </div>
  </motion.div>
);

export default AccountActions;
