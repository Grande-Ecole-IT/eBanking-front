/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import BalanceCard from "../components/BalanceCard";
import Button from "../components/Button";
import ChatBot from "../components/ChatBot";
import HistoricalList from "../components/HistoricalList";
import MoneyTransferCard from "../components/MoneyTransferCard";
import TransactionList from "../components/TransactionList";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../hooks/useAuth";
import Background from "../layout/Background";
import { client, DATABASE_ID } from "../lib/appwrite";
import { getRecentTransactionsByUser } from "../services/databases/transactions";

const Dashboard = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const provider = useAuth();

  useEffect(() => {
    try {
      getRecentTransactionsByUser(provider?.user?.$id).then((res) => {
        setTransactions(res.documents);
      });
    } catch (error) {
      console.log(error);
    }
  }, [provider?.user?.$id]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.transactions.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          // Vérifier que le payload est valide
          if (response.payload && typeof response.payload === "object") {
            setTransactions((prev) => [response.payload, ...(prev || [])]);
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const historicals = [
    {
      id: 1,
      date: "Aujourd'hui, 09:42",
      device: "iPhone 13 Pro",
      location: "Paris, France",
      status: "success",
      ipAddress: "192.168.1.45",
    },
    {
      id: 2,
      date: "Hier, 22:15",
      device: "MacBook Pro (M1)",
      location: "Lyon, France",
      status: "success",
      ipAddress: "85.203.45.12",
    },
    {
      id: 3,
      date: "05/06/2023, 14:30",
      device: "Samsung Galaxy S21",
      location: "Marseille, France",
      status: "failed",
      ipAddress: "176.129.78.34",
      reason: "Mot de passe incorrect",
    },
    {
      id: 4,
      date: "04/06/2023, 08:12",
      device: "iPad Air",
      location: "Bordeaux, France",
      status: "success",
      ipAddress: "91.167.23.156",
    },
    {
      id: 5,
      date: "02/06/2023, 19:45",
      device: "Windows PC (Chrome)",
      location: "Toulouse, France",
      status: "success",
      ipAddress: "78.245.12.89",
    },
    {
      id: 6,
      date: "01/06/2023, 11:20",
      device: "Android (Xiaomi Redmi Note 10)",
      location: "Lille, France",
      status: "failed",
      ipAddress: "154.76.34.98",
      reason: "Tentative de mot de passe expiré",
    },
    {
      id: 7,
      date: "30/05/2023, 16:33",
      device: "iPhone 12",
      location: "Nice, France",
      status: "success",
      ipAddress: "92.154.76.211",
    },
    {
      id: 8,
      date: "28/05/2023, 09:15",
      device: "MacBook Air (M2)",
      location: "Nantes, France",
      status: "success",
      ipAddress: "85.203.45.12",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setChatbotOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900 overflow-hidden">
      <Background />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-10">
        <ChatBot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />

        <div className="max-w-7xl mx-auto">
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center mb-2"
          >
            <img src={logo} alt="FlashPay" className="w-30 h-auto" />

            <div className="flex items-center space-x-4">
              <Button onClick={() => setChatbotOpen(true)} variant="primary">
                <span>Assistant (Ctrl+K)</span>
              </Button>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6 lg:col-span-2">
              <BalanceCard balance="12,450.50" />
              <TransactionList transactions={transactions} />
            </div>

            <div className="space-y-6">
              <UserInfoCard user={user} />
              <MoneyTransferCard />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Statistiques
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-500 text-sm">Dépenses mensuelles</p>
                    <p className="text-blue-900 font-bold text-xl">
                      1,245.60 €
                    </p>
                    <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-500 text-sm">Économies</p>
                    <p className="text-blue-900 font-bold text-xl">
                      8,740.25 €
                    </p>
                    <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <HistoricalList historicals={historicals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
