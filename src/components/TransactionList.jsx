/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import TransactionItem from "./TransactionItem";

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
      {transactions?.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  </motion.div>
);

export default TransactionList;
