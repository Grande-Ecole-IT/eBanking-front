/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { getUserDocument } from "../services/databases/users";
import { formatDate } from "../utils/function";

const TransactionItem = ({ transaction }) => {
  const [counterpartName, setCounterpartName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounterpartName = async () => {
      try {
        // Pour les réceptions seulement, on cherche le nom de l'envoyeur
        if (transaction.type === "RECEPTION" && transaction.senderId) {
          const userDoc = await getUserDocument(transaction.senderId);
          setCounterpartName(userDoc?.name || "");
        }
        // Pour les envois, on cherche le nom du receveur si le motif est vide
        else if (
          transaction.type === "ENVOI" &&
          !transaction.motif &&
          transaction.receiverId
        ) {
          const userDoc = await getUserDocument(transaction.receiverId);
          setCounterpartName(userDoc?.name || "");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounterpartName();
  }, [transaction]);

  const getTransactionDescription = () => {
    if (loading) {
      return (
        <span className="inline-block h-4 w-32 bg-blue-100 rounded animate-pulse"></span>
      );
    }

    if (transaction.type === "RECEPTION") {
      return counterpartName ? `Reçu de ${counterpartName}` : "Reçu";
    } else {
      // ENVOI
      return (
        transaction.motif ||
        (counterpartName ? `Envoi à ${counterpartName}` : "Envoi")
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-between items-center py-3 border-b border-blue-50 last:border-0 hover:bg-slate-50"
    >
      <div className="flex items-center">
        <div
          className={`p-2 rounded-lg ${
            transaction?.type === "ENVOI"
              ? "bg-blue-50 text-blue-500"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {transaction?.type === "RECEPTION" ? (
            <FiArrowDownLeft className="text-lg" />
          ) : (
            <FiArrowUpRight className="text-lg" />
          )}
        </div>
        <div className="ml-4">
          <p className="font-medium text-blue-900">
            {getTransactionDescription()}
          </p>
          <p className="text-blue-500 text-xs">
            {formatDate(transaction?.$createdAt)}
          </p>
        </div>
      </div>
      <p
        className={`font-medium ${
          transaction.type === "ENVOI" ? "text-blue-600" : "text-blue-900"
        }`}
      >
        {transaction?.montant}
      </p>
    </motion.div>
  );
};

export default TransactionItem;
