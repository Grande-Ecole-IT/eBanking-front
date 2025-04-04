/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";

const MoneyTransferCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-blue-950 rounded-xl p-6 text-white"
  >
    <h3 className="text-lg font-semibold mb-4">Envoyer de l'argent</h3>
    <button className="w-full flex items-center justify-between p-4 bg-zinc-300/20 rounded-lg backdrop-blur-sm group">
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-blue-400/20 mr-3">
          <FiSend className="text-lg" />
        </div>
        <span>Virement instantané</span>
      </div>
      <span className="text-blue-200 text-2xl opacity-0 group-hover:opacity-100 delay-500">
        <LuArrowRight />
      </span>
    </button>
  </motion.div>
);

export default MoneyTransferCard;
