/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";
import { getAllUsers } from "../services/databases/users";
import TransactionForm from "./TransactionForm";

const MoneyTransferCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.documents);
    });
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-950 rounded-xl p-6 text-white"
      >
        <h3 className="text-lg font-semibold mb-4">Envoyer de l'argent</h3>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-4 bg-zinc-300/20 rounded-lg backdrop-blur-sm group"
          onClick={() => setShowModal(true)}
        >
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-400/20 mr-3">
              <FiSend className="text-lg" />
            </div>
            <span>Virement instantané</span>
          </div>
          <span className="text-blue-200 text-2xl opacity-0 group-hover:opacity-100 delay-500">
            <LuArrowRight />
          </span>
        </motion.button>
      </motion.div>

      {/* Modal TransactionForm */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-800/20 to-blue-900/20 backdrop-blur-md h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 10 }}
              className="relative w-full max-w-md"
            >
              <TransactionForm
                onClose={() => setShowModal(false)}
                users={users}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MoneyTransferCard;
