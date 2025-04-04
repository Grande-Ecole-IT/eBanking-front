/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiMapPin, FiMonitor, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

const HistoricalItem = ({ historical }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col py-3 border-b border-blue-50 last:border-0 hover:bg-slate-50 px-2"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-start">
        <div
          className={`p-2 rounded-lg mt-1 ${
            historical.status === "success"
              ? "bg-green-50 text-green-500"
              : "bg-red-50 text-red-500"
          }`}
        >
          {historical.status === "success" ? (
            <FiCheckCircle className="text-lg" />
          ) : (
            <FiXCircle className="text-lg" />
          )}
        </div>
        <div className="ml-4">
          <p className="font-medium text-blue-900">{historical.device}</p>
          <div className="flex items-center text-blue-500 text-xs mt-1">
            <FiMapPin className="mr-1" />
            <span>{historical.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs mt-1">
            <FiMonitor className="mr-1" />
            <span>{historical.ipAddress}</span>
          </div>
          {historical.reason && (
            <p className="text-red-500 text-xs mt-1">{historical.reason}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="text-blue-900 text-sm font-medium">{historical.date}</p>
        <span
          className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
            historical.status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {historical.status === "success" ? "Réussie" : "Échec"}
        </span>
      </div>
    </div>
  </motion.div>
);

const HistoricalList = ({ historicals }) => {
  const [showAll, setShowAll] = useState(false);
  
  const maxVisibleItems = 3;
  const displayedHistoricals = showAll ? historicals : historicals.slice(0, maxVisibleItems);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mt-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          Historique des Connexions
        </h3>
        {historicals.length > maxVisibleItems && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors flex items-center"
          >
            {showAll ? (
              <>
                <span>Voir moins</span>
                <FiChevronUp className="ml-1" />
              </>
            ) : (
              <>
                <span>Voir tout ({historicals.length})</span>
                <FiChevronDown className="ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      
      <div 
        className={`space-y-3 ${showAll ? 'max-h-96 overflow-y-auto pr-2' : ''}`}
        style={{ scrollbarWidth: 'thin' }}
      >
        {displayedHistoricals.map((historical) => (
          <HistoricalItem key={historical.id} historical={historical} />
        ))}
      </div>
    </motion.div>
  );
};

export default HistoricalList;