/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import ChatBot from "../components/ChatBot";
import TransactionList from "../components/TransactionList";
import { useAuth } from "../hooks/useAuth";
import Background from "../layout/Background";
import { client, DATABASE_ID } from "../lib/appwrite";
import { getRecentTransactionsByUser } from "../services/databases/transactions";
import { useNavigate } from "react-router";
import { getAllUsers } from "../services/databases/users";
import { BiDownload, BiSend } from "react-icons/bi";
import { BarChart2, Calendar, CreditCard, PieChart, Settings } from "lucide-react";
import TransactionForm from "../components/TransactionForm";

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

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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

        {/* Header simplifié comme dans le screenshot */}
        <header className="sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <img src={logo} alt="Bankio" className="w-20" />
              </div>

              {/* Navigation centrale */}
              <nav className="hidden md:flex items-center space-x-8 mx-6">
                <a
                  href="#"
                  className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  Transactions
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  Analysis
                </a>
              </nav>

              {/* Section droite avec search, notifications et profil */}
              <div className="flex items-center space-x-6">
                {/* Icône de notifications */}
                <button className="relative p-1 text-gray-500 hover:text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Profil utilisateur avec déconnexion */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.picture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-blue-100"
                    />
                    <div className="hidden md:block">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {user?.name}
                      </h3>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Déconnexion"
                    onClick={handleLogout}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Navigation mobile */}
            <nav className="flex md:hidden items-center justify-center mt-4 overflow-x-auto pb-2 space-x-6">
              <a
                href="#"
                className="text-blue-600 font-medium px-2 whitespace-nowrap"
              >
                All
              </a>
              <a href="#" className="text-gray-500 px-2 whitespace-nowrap">
                Transactions
              </a>
              <a href="#" className="text-gray-500 px-2 whitespace-nowrap">
                Analysis
              </a>
            </nav>
          </div>
        </header>

        <div className="grid grid-cols-[1fr_0.72fr] mt-6 space-x-6">
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-evenly">
              {/* Balance Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-gray-600 mb-2">Total Balance</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$31,180</span>
                  <span className="text-gray-400">.24</span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-100/50 text-blue-700 px-6 py-2 rounded-full hover:bg-blue-100"
                  >
                    <BiSend size={20} />
                    Send
                  </button>
                  <button className="flex items-center gap-2 bg-blue-100/50 text-blue-700 px-6 py-2 rounded-full hover:bg-blue-100">
                    <BiDownload size={20} />
                    Receive
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
                    <h2 className="text-lg font-semibold">Spending</h2>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Calendar size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="text-blue-500" size={20} />
                        <span className="text-gray-600">Monthly</span>
                      </div>
                      <div className="text-2xl font-semibold">$2,778.00</div>
                      <div className="text-sm text-gray-500">
                        from $3,042.00
                      </div>
                    </div>
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <PieChart className="text-blue-500" size={32} />
                    </div>
                  </div>
                </div>

                {/* How to Save Money Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm h-full">
                  <h2 className="text-lg font-semibold mb-4">
                    How to Save Money
                  </h2>
                  <button className="w-full text-left hover:bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Learn More</div>
                        <div className="text-sm text-gray-500">
                          Save money for future
                        </div>
                      </div>
                      <Settings className="text-gray-400" size={20} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white w-full h-60 rounded-3xl my-6"></div>
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
