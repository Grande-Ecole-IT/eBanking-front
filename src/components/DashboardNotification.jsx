import React, { useEffect, useState } from "react";
import { createTransaction } from "../services/databases/transactions";
import { getUserDocument } from "../services/databases/users";
import { formatDate } from "../utils/function";

const DashboardNotification = ({ transactionDemands }) => {
  const [receiverNames, setReceiverNames] = useState({});
  const [loading, setLoading] = useState(true);

  // Récupération des noms des receveurs
  useEffect(() => {
    if (!transactionDemands) return;

    const fetchReceiverNames = async () => {
      const names = {};
      try {
        for (const item of transactionDemands) {
          if (item.receiverId && !names[item.receiverId]) {
            const userDoc = await getUserDocument(item.receiverId);
            names[item.receiverId] =
              userDoc?.name || userDoc?.username || "Utilisateur";
          }
        }
        setReceiverNames(names);
      } catch (error) {
        console.error("Erreur récupération receveur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceiverNames();
  }, [transactionDemands]);

  const handleAccept = async (transaction) => {
    try {
      await createTransaction(
        transaction.senderId, // L'expéditeur original devient le receveur
        transaction.receiverId, // L'expéditeur original devient le receveur
        transaction.motif,
        transaction.montant,
        "ENVOI" // On inverse le type
      );
      alert("Transaction acceptée et envoyée !");
    } catch (error) {
      console.error("Erreur lors de la transaction:", error);
      alert("Erreur lors de l'acceptation");
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-md z-50 border border-gray-200">
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm">
          Demandes en attente
        </h3>

        {loading || !transactionDemands ? (
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse p-2 bg-gray-100 rounded-lg">
                <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {transactionDemands.map((item) => (
              <div
                key={item.$id}
                className="p-2 bg-gray-50 rounded-lg border border-gray-100 text-xs"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">
                      {receiverNames[item.receiverId] || "Utilisateur"}
                    </p>
                    {item.motif && (
                      <p className="text-gray-600 mt-0.5 truncate">
                        {item.motif}
                      </p>
                    )}
                  </div>
                  <span
                    className={`font-medium ml-2 ${
                      item.type === "RECEPTION"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {item.montant} €
                  </span>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500">
                    {formatDate(item.$createdAt)}
                  </span>
                  <button
                    onClick={() => handleAccept(item)}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                  >
                    Accepter
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNotification;
