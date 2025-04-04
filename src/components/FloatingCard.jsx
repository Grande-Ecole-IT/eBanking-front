/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const FloatingCard = () => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 border border-blue-200 overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-300"></div>
    <div className="h-40 md:h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
      <div className="relative">
        <div className="w-56 md:w-64 h-32 md:h-40 bg-blue-500 rounded-lg shadow-md flex flex-col justify-between p-3 md:p-4">
          <div className="flex justify-between items-start">
            <div className="text-white font-medium text-sm md:text-base">
              FlashPay
            </div>
            <div className="text-white text-xs">VISA</div>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="w-10 md:w-12 h-6 md:h-8 bg-blue-300 rounded-md"></div>
          </div>
          <div className="text-white text-xs md:text-sm">
            •••• •••• •••• 4242
          </div>
        </div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute -top-6 -right-6 text-3xl md:text-4xl opacity-60"
        >
          💳
        </motion.div>
      </div>
    </div>
    <div className="mt-3 md:mt-4 text-left">
      <div className="text-xs md:text-sm text-blue-500 font-medium">
        Carte FlashPay
      </div>
      <div className="text-lg md:text-xl font-semibold mt-1 text-blue-800">
        Votre porte-monnaie numérique sécurisé
      </div>
    </div>
  </motion.div>
);

export default FloatingCard;
