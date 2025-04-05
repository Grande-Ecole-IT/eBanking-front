/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {
  // Vérifier et initialiser transactions si null/undefined
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Trier les transactions par date (du plus récent au plus ancien)
  const sortedTransactions = [...safeTransactions].sort((a, b) => {
    // Gérer les dates manquantes ou invalides
    const dateA = a?.date ? new Date(a.date) : new Date(0);
    const dateB = b?.date ? new Date(b.date) : new Date(0);
    return dateB - dateA;
  });

  // Prendre seulement les 5 premières transactions
  const recentTransactions = sortedTransactions.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-emerald-50 rounded-xl p-6 shadow-sm border border-blue-100"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          Dernières transactions
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="group flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all duration-200"
        >
          <NavLink to="/transaction" className="flex items-center">
            Voir tout
            <ArrowUpRight
              size={16}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1"
            />
          </NavLink>
        </motion.button>
      </div>
      <div className="space-y-3">
        {recentTransactions.length === 0 ? (
          <p className="text-center text-slate-600">
            Aucune transaction pour le moment
          </p>
        ) : (
          <>
            {recentTransactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id || index}
                transaction={transaction}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TransactionList;
