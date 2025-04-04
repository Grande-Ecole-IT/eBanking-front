/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";

const TransactionItem = ({ transaction }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-between items-center py-3 border-b border-blue-50 last:border-0"
  >
    <div className="flex items-center">
      <div
        className={`p-2 rounded-lg ${
          transaction.type === "credit"
            ? "bg-blue-50 text-blue-500"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {transaction.type === "credit" ? (
          <FiArrowDownLeft className="text-lg" />
        ) : (
          <FiArrowUpRight className="text-lg" />
        )}
      </div>
      <div className="ml-4">
        <p className="font-medium text-blue-900">{transaction.name}</p>
        <p className="text-blue-500 text-xs">{transaction.date}</p>
      </div>
    </div>
    <p
      className={`font-medium ${
        transaction.type === "credit" ? "text-blue-600" : "text-blue-900"
      }`}
    >
      {transaction.amount}
    </p>
  </motion.div>
);

const TransactionList = ({ transactions }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-blue-900">
        Dernières transactions
      </h3>
      <button className="text-blue-500 text-sm font-medium">Voir tout</button>
    </div>
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  </motion.div>
);

export default TransactionList;
