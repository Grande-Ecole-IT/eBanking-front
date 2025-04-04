/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import BalanceCard from "../components/BalanceCard";
import MoneyTransferCard from "../components/MoneyTransferCard";
import TransactionList from "../components/TransactionList";
import UserInfoCard from "../components/UserInfoCard";

const Dashboard = () => {
  const user = {
    name: "Alex Dupont",
    email: "alex.dupont@example.com",
    initials: "AD",
    memberSince: "Jan 2022",
    lastLogin: "Aujourd'hui, 09:42",
  };

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

  return (
    <div className="h-screen bg-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
            Tableau de bord
          </h1>
          <div className="text-blue-500 text-sm">Mis à jour à l'instant</div>
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
                  <p className="text-blue-900 font-bold text-xl">1,245.60 €</p>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-blue-500 text-sm">Économies</p>
                  <p className="text-blue-900 font-bold text-xl">8,740.25 €</p>
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
  );
};

export default Dashboard;
