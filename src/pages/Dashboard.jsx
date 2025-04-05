/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, Calendar, CreditCard, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { BiDownload, BiSend } from "react-icons/bi";
import { FiZap } from "react-icons/fi";
import { useNavigate } from "react-router";
import ChatBot from "../components/ChatBot";
import FinancialLineChart from "../components/FinancialLineChart";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useAuth } from "../hooks/useAuth";
import Background from "../layout/Background";
import { client, DATABASE_ID } from "../lib/appwrite";
import { getTransactionsByUser } from "../services/databases/transactions";
import { getAllUsers } from "../services/databases/users";

const Dashboard = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const provider = useAuth();

  useEffect(() => {
    try {
      getTransactionsByUser(provider?.user?.$id).then((res) => {
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

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.documents);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900 overflow-hidden">
      <Background />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-10">
        <ChatBot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
        <Navbar />

        <div className="grid grid-cols-[1fr_0.72fr] mt-6 space-x-6">
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-evenly">
              {/* Balance Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-gray-600 mb-2">Total Solde</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">£31,180</span>
                  <span className="text-gray-400">.24</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-1.5 bg-blue-100/50 text-blue-700 px-6 py-2 rounded-xl hover:bg-blue-100"
                  >
                    <BiSend size={20} />
                    Envoyer
                  </button>
                  <button className="flex items-center gap-2 bg-blue-100/50 text-blue-700 px-6 py-2 rounded-xl hover:bg-blue-100">
                    <BiDownload size={20} />
                    Demander
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">My cards</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {/* Card 1 */}
                    <div className="min-w-full h-[170px] bg-blue-400 rounded-xl p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <CreditCard className="text-white mb-4" size={24} />
                      <div className="text-white mt-auto">
                        <div className="text-sm opacity-80">
                          **** **** **** 4455
                        </div>
                        <div className="mt-1">{user?.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Content */}
              <div className="flex flex-col justify-between space-y-6">
                {/* Spending Card */}
                <div className="bg-blue-200 rounded-3xl p-6 shadow-sm h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Depense</h2>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Calendar size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="text-blue-500" size={20} />
                        <span className="text-gray-600">Mensuel</span>
                      </div>
                      <div className="text-2xl font-semibold">£2,778.00</div>
                      <div className="text-sm text-gray-500">à $3,042.00</div>
                    </div>
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <PieChart className="text-blue-500" size={32} />
                    </div>
                  </div>
                </div>

                {/* AI assistant */}
                <div className="bg-white rounded-3xl p-6 shadow-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">FlashPay AI</h2>
                    <div className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                      <FiZap className="mr-1" size={14} />
                      Nouveau
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    Notre assistant intelligent peut exécuter des actions par
                    message vocal ou texte.
                  </p>

                  <p className="text-xs text-gray-400 my-4 text-center">
                    Essayez de dire : "Envoie 50€ à Marie pour le dîner"
                  </p>
                  <motion.button
                    onClick={() => setChatbotOpen(true)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 border border-blue-200 "
                  >
                    <span className="font-medium text-gray-800">Démarrer</span>
                    <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-1 rounded-md">
                      Ctrl+K
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
            <FinancialLineChart />
          </div>
          <div className="flex flex-col">
            <TransactionList transactions={transactions} />
            <div className="rounded-3xl bg-white h-auto mt-6 p-6 shadow-md relative overflow-hidden">
              {/* Titre et menu */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Financial Health
                </h3>
                <button className="text-blue-600 text-sm">View Details</button>
              </div>

              {/* Conteneur du graphique */}
              <div className="relative h-32 w-full flex items-center justify-center">
                {/* Graphique Doughnut personnalisé */}
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 36 36"
                  className="transform -rotate-90 mb-4"
                >
                  {/* Segment 1 (Dettes) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeDasharray="30, 100"
                    strokeLinecap="round"
                  />
                  {/* Segment 2 (Épargne) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-30"
                    strokeLinecap="round"
                  />
                  {/* Segment 3 (Investissements) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="45, 100"
                    strokeDashoffset="-55"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Texte central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">72%</span>
                  <span className="text-xs text-gray-500">Healthy</span>
                </div>
              </div>

              {/* Légende */}
              <div className="flex justify-center space-x-6 m-5">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Debt</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Savings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Investments</span>
                </div>
              </div>

              {/* Indicateur de performance */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal TransactionForm */}
          <AnimatePresence>
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-800/20 to-blue-900/20 backdrop-blur-md h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="relative w-full max-w-md"
                >
                  <TransactionForm
                    onClose={() => setShowModal(false)}
                    users={users}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
