/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";

const BalanceCard = ({ balance }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-blue-600 text-sm font-medium">SOLDE DISPONIBLE</p>
        <p className="text-3xl font-bold mt-2 text-blue-900">{balance} €</p>
      </div>
      <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
        <FiDollarSign className="text-xl" />
      </div>
    </div>
    <div className="flex justify-between mt-6">
      <div>
        <p className="text-blue-500 text-xs">Compte principal</p>
        <p className="text-blue-800 font-medium">•••• 4242</p>
      </div>
      <button className="text-blue-500 text-sm font-medium px-3 py-1 bg-blue-50 rounded-lg">
        Détails
      </button>
    </div>
  </motion.div>
);

export default BalanceCard;
