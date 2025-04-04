/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiDollarSign,
  FiMessageSquare,
  FiSend,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { createTransaction } from "../services/databases/transactions";

const TransactionForm = ({ onClose, users = [] }) => {
  const { user: currentUser } = useAuth() || {};
  const [formData, setFormData] = useState({
    recipientId: null,
    recipientName: "",
    amount: "",
    purpose: "",
    searchTerm: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      if (user.$id === currentUser?.$id) return false;

      if (formData.searchTerm.trim() === "") return true;

      return (
        user.name?.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(formData.searchTerm.toLowerCase())
      );
    });

    setFilteredUsers(filtered);
  }, [users, currentUser?.$id, formData.searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectRecipient = (user) => {
    setFormData((prev) => ({
      ...prev,
      recipientId: user.$id,
      recipientName: user.name,
      searchTerm: user.name,
    }));
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.recipientId) {
      console.error("No recipient selected");
      return;
    }

    setIsSubmitting(true);

    try {
      await createTransaction(
        currentUser?.$id,
        formData.recipientId,
        formData.purpose,
        parseFloat(formData.amount),
        "ENVOI"
      );

      setIsSuccess(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("Transaction error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Envoyer de l'argent
            </h2>
            <p className="text-gray-600 mt-1">Transfert vers un autre compte</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Recipient Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destinataire <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden has-[:focus]:ring-2 has-[:focus]:ring-blue-500 has-[:focus]:border-blue-500">
              <span className="pl-3 pr-2 text-gray-400">
                <FiUser />
              </span>
              <input
                name="searchTerm"
                value={formData.searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                className="flex-1 py-3 px-2 outline-none"
                placeholder="Rechercher un utilisateur"
                required
              />
              <button
                type="button"
                className="px-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FiChevronDown
                  className={`transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto"
              >
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.$id}
                      className="p-3 hover:bg-blue-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
                      onClick={() => selectRecipient(user)}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {users.length === 0
                      ? "Aucun utilisateur disponible"
                      : "Aucun résultat trouvé"}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Amount Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden has-[:focus]:ring-2 has-[:focus]:ring-blue-500 has-[:focus]:border-blue-500">
            <span className="pl-3 pr-2 text-gray-400">
              <FiDollarSign />
            </span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="flex-1 py-3 px-2 outline-none"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        {/* Purpose Field */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objectif (optionnel)
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden has-[:focus]:ring-2 has-[:focus]:ring-blue-500 has-[:focus]:border-blue-500">
            <span className="pl-3 pr-2 text-gray-400">
              <FiMessageSquare />
            </span>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="flex-1 py-3 px-2 outline-none"
              placeholder="Ex: Remboursement, Cadeau..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors shadow-md`}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || !formData.recipientId}
        >
          {isSubmitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block mr-2"
              >
                <FiSend />
              </motion.span>
              En cours...
            </>
          ) : isSuccess ? (
            "Envoyé ✓"
          ) : (
            <>
              <FiSend className="mr-2" />
              Envoyer
            </>
          )}
        </motion.button>
      </form>

      {/* Success Message */}
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
