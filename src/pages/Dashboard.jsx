/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import BalanceCard from "../components/BalanceCard";
import Button from "../components/Button";
import ChatBot from "../components/ChatBot";
import MoneyTransferCard from "../components/MoneyTransferCard";
import TransactionList from "../components/TransactionList";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../hooks/useAuth";
import Background from "../layout/Background";

const Dashboard = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const { user } = useAuth();

  const transactions = [
    {
      name: "Salaire Acme Inc",
      date: "Aujourd'hui",
      amount: "+2,450.00 €",
      type: "credit",
    },
    {
      name: "Courses Supermarché",
      date: "Hier",
      amount: "-87.30 €",
      type: "debit",
    },
    {
      name: "Abonnement Spotify",
      date: "Hier",
      amount: "-9.99 €",
      type: "debit",
    },
    {
      name: "Virement Jean D.",
      date: "05/06",
      amount: "+150.00 €",
      type: "credit",
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
