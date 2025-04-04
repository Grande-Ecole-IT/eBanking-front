/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiDollarSign,
  FiMessageSquare,
  FiSend,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { createTransaction } from "../services/databases/transactions";

const TransactionForm = ({ onClose }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const provider = useAuth();
  const user = provider?.user;
  const type = "envoi";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTransaction(user?.id, recipient, purpose, amount, type);
    } catch (error) {
      console.log(error);
    }

    // Simulation d'envoi
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setIsSuccess(true);
    //   setTimeout(() => {
    //     setIsSuccess(false);
    //     onClose();
    //   }, 2000);
    // }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX className="text-xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Envoyer de l'argent
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Champ Destinataire */}
          <div className="mb-4">
            <label
              htmlFor="recipient"
              className="flex  font-medium text-gray-700 mb-1  items-center"
            >
              Destinataire
            </label>
            <div className="relative">
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Nom ou numéro de compte"
                required
              />
              <FiUser className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Champ Montant */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block  font-medium text-gray-700 mb-1  items-center"
            >
              Montant
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
              <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Champ Objectif */}
          <div className="mb-6">
            <label
              htmlFor="purpose"
              className="block  font-medium text-gray-700 mb-1  items-center"
            >
              Objectif (optionnel)
            </label>
            <div className="relative">
              <input
                type="text"
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Ex: Remboursement, Cadeau..."
              />
              <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Bouton Envoyer */}
          <motion.button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors shadow-md`}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <FiSend className="mr-2" />
              </motion.span>
            ) : isSuccess ? (
              "Envoyé ✓"
            ) : (
              <>
                <FiSend className="mr-2" /> Envoyer
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Message de succès */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-green-100 text-green-800 text-center"
        >
          Transaction effectuée avec succès !
        </motion.div>
      )}
    </div>
  );
};
export default TransactionForm;
