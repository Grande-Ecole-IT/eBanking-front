// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiDollarSign,
  FiDownload,
  FiMessageSquare,
  FiSend,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { createTransaction } from "../services/databases/transactions";

const TransactionForm = ({ onClose, users, transactionType }) => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState({
    contactId: "",
    contactName: "",
    amount: "",
    motif: "",
    searchTerm: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (users) {
      const filtered = users.filter(
        (user) =>
          user.$id !== currentUser?.$id &&
          (formData.searchTerm === "" ||
            user.name
              .toLowerCase()
              .includes(formData.searchTerm.toLowerCase()) ||
            user.email
              .toLowerCase()
              .includes(formData.searchTerm.toLowerCase()))
      );
      setFilteredUsers(filtered);
    }
  }, [formData.searchTerm, users, currentUser]);

  const handleSelectUser = (user) => {
    setFormData({
      ...formData,
      contactId: user.$id,
      contactName: user.name,
      searchTerm: user.name,
    });
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contactId) return;

    setIsSubmitting(true);

    try {
      if (transactionType === "ENVOI") {
        await createTransaction(
          currentUser.$id,
          formData.contactId,
          formData.motif,
          parseFloat(formData.amount),
          "ENVOI"
        );
      } else {
        await createTransaction(
          formData.contactId,
          currentUser.$id,
          formData.motif,
          parseFloat(formData.amount),
          "RECEPTION"
        );
      }
      setIsSuccess(true);
      setTimeout(onClose, 1500);
    } catch (error) {
      console.error("Erreur de transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
    >
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {transactionType === "ENVOI"
            ? "Envoyer de l'argent"
            : "Demander de l'argent"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {transactionType === "ENVOI" ? "À" : "De"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.searchTerm}
              onChange={(e) => {
                setFormData({ ...formData, searchTerm: e.target.value });
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rechercher un contact..."
            />
            {showDropdown && filteredUsers.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredUsers.map((user) => (
                  <li
                    key={user.$id}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex items-center"
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FiUser className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant (£)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motif (optionnel)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMessageSquare className="text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.motif}
              onChange={(e) =>
                setFormData({ ...formData, motif: e.target.value })
              }
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Remboursement, Cadeau..."
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || !formData.contactId || !formData.amount}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            transactionType === "ENVOI"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          } transition-colors flex items-center justify-center disabled:opacity-70`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block mr-2"
              >
                {transactionType === "ENVOI" ? <FiSend /> : <FiDownload />}
              </motion.span>
              {transactionType === "ENVOI"
                ? "Envoi en cours..."
                : "Demande en cours..."}
            </span>
          ) : isSuccess ? (
            transactionType === "ENVOI" ? (
              "Envoyé ✓"
            ) : (
              "Demande envoyée ✓"
            )
          ) : (
            <span className="flex items-center">
              {transactionType === "ENVOI" ? (
                <FiSend className="mr-2" />
              ) : (
                <FiDownload className="mr-2" />
              )}
              {transactionType === "ENVOI"
                ? "Confirmer l'envoi"
                : "Envoyer la demande"}
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TransactionForm;
