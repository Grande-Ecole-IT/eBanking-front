import { useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiFilter,
  FiSearch,
  FiType,
  FiUser,
} from "react-icons/fi";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import Background from "../layout/Background";
import { getTransactionsByUser } from "../services/databases/transactions";
import { getUserDocument } from "../services/databases/users";
import { formatDate } from "../utils/function";

const TransactionPage = () => {
  const { user: currentUser } = useAuth() || {};
  const [transactions, setTransactions] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [userPictures, setUserPictures] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingNames, setLoadingNames] = useState(false);

  // États des filtres
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    dateRange: "all",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const itemsPerPageOptions = [5, 10, 20, 50];

  // Chargement initial des données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getTransactionsByUser(currentUser?.$id);
        if (res?.documents) {
          setTransactions(res.documents);
          await loadUserNamesAndPictures(res.documents);
        }
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser?.$id]);

  // Chargement des noms et photos d'utilisateurs
  const loadUserNamesAndPictures = async (transactions) => {
    try {
      setLoadingNames(true);
      const names = {};
      const pictures = {};

      // Collecter tous les IDs uniques (en excluant l'utilisateur courant)
      const userIds = new Set();
      transactions.forEach((t) => {
        if (t.senderId && t.senderId !== currentUser?.$id)
          userIds.add(t.senderId);
        if (t.receiverId && t.receiverId !== currentUser?.$id)
          userIds.add(t.receiverId);
      });

      // Paralléliser les requêtes avec gestion des erreurs
      await Promise.all(
        Array.from(userIds).map(async (id) => {
          try {
            const user = await getUserDocument(id);
            if (user) {
              names[id] = user?.name || `Utilisateur ${id.slice(0, 6)}...`;
              if (user?.picture) {
                pictures[id] = user.picture;
              }
            }
          } catch (error) {
            console.error(`Failed to load user ${id}:`, error);
            names[id] = `Utilisateur (${id.slice(0, 6)}...)`;
          }
        })
      );

      setUserNames(names);
      setUserPictures(pictures);
    } catch (error) {
      console.error("Failed to load user names:", error);
    } finally {
      setLoadingNames(false);
    }
  };

  // Filtrer les transactions
  const filteredTransactions = transactions.filter((t) => {
    // Filtre par type
    if (filters.type !== "all" && t.type !== filters.type) return false;

    // Filtre par recherche
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesName =
        userNames[t.receiverId]?.toLowerCase().includes(searchTerm) ||
        userNames[t.senderId]?.toLowerCase().includes(searchTerm);
      const matchesMotif = t.motif?.toLowerCase().includes(searchTerm);

      if (!matchesName && !matchesMotif) return false;
    }

    // Filtre par date
    if (filters.dateRange !== "all") {
      const transactionDate = new Date(t.$createdAt);
      const now = new Date();
      let cutoffDate;

      switch (filters.dateRange) {
        case "week":
          cutoffDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "year":
          cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          cutoffDate = new Date(0);
      }

      if (transactionDate < cutoffDate) return false;
    }

    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Calcul des statistiques
  const stats = transactions.reduce(
    (acc, t) => {
      if (t.type === "reception") {
        acc.income += t.montant;
        acc.balance += t.montant;
      } else {
        acc.expenses += t.montant;
        acc.balance -= t.montant;
      }
      return acc;
    },
    { balance: 0, income: 0, expenses: 0 }
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      dateRange: "all",
    });
  };

  // Détermine l'autre partie de la transaction et le type affiché
  const getTransactionDisplayInfo = (transaction) => {
    const isCurrentUserSender = transaction.senderId === currentUser?.$id;

    return {
      otherPartyId: isCurrentUserSender
        ? transaction.receiverId
        : transaction.senderId,
      otherPartyRole: isCurrentUserSender ? "Destinataire" : "Expéditeur",
      displayType: isCurrentUserSender ? "ENVOI" : "RECEPTION",
      amountSign: isCurrentUserSender ? "-" : "+",
      amountColor: isCurrentUserSender ? "text-red-600" : "text-green-600",
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Background />

      <div className="container mx-auto px-4  relative z-10 max-w-7xl">
        {/* Header */}
        <Navbar />

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-5">
          <StatCard
            title="Solde Total"
            value={stats.balance}
            icon={<FiDollarSign className="text-blue-500" />}
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Revenus"
            value={stats.income}
            icon={<FiArrowUp className="text-green-500" />}
            bgColor="bg-green-50"
            isPositive
          />
          <StatCard
            title="Dépenses"
            value={stats.expenses}
            icon={<FiArrowDown className="text-red-500" />}
            bgColor="bg-red-50"
          />
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FiFilter className="mr-2" /> Filtres
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Réinitialiser
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterSelect
              icon={<FiType />}
              value={filters.type}
              onChange={(v) => handleFilterChange("type", v)}
              options={[
                { value: "all", label: "Tous types" },
                { value: "ENVOI", label: "Envois" },
                { value: "RECEPTION", label: "Reçus" },
              ]}
            />

            <FilterSelect
              icon={<FiCalendar />}
              value={filters.dateRange}
              onChange={(v) => handleFilterChange("dateRange", v)}
              options={[
                { value: "all", label: "Toutes dates" },
                { value: "week", label: "7 derniers jours" },
                { value: "month", label: "30 derniers jours" },
                { value: "year", label: "Cette année" },
              ]}
            />

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tableau des transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              {filteredTransactions.length} transactions trouvées
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Afficher :</span>
              <select
                className="border border-gray-300 rounded-lg py-1 px-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {itemsPerPageOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {loadingNames ? "Chargement..." : "Utilisateur"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Motif
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((t) => {
                      const {
                        otherPartyId,
                        otherPartyRole,
                        displayType,
                        amountSign,
                        amountColor,
                      } = getTransactionDisplayInfo(t);

                      return (
                        <tr
                          key={t.$id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loadingNames ? (
                              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                            ) : (
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                                  {userPictures[otherPartyId] ? (
                                    <img
                                      src={userPictures[otherPartyId]}
                                      alt="Profile"
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <FiUser className="text-blue-500" />
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {userNames[otherPartyId] || otherPartyRole}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {otherPartyRole}
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                displayType === "ENVOI"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {displayType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(t.$createdAt)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {t.motif || "Aucun motif spécifié"}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${amountColor}`}
                          >
                            {amountSign} {formatCurrency(t.montant)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                Affichage {indexOfFirstItem + 1} à{" "}
                {Math.min(indexOfLastItem, filteredTransactions.length)} sur{" "}
                {filteredTransactions.length} transactions
              </div>

              <div className="flex items-center space-x-2">
                <PaginationButton
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft />
                </PaginationButton>

                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }

                  return (
                    <PaginationButton
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      active={page === currentPage}
                    >
                      {page}
                    </PaginationButton>
                  );
                })}

                <PaginationButton
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <FiChevronRight />
                </PaginationButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Composants supplémentaires (restent inchangés)
const StatCard = ({ title, value, icon, bgColor, isPositive }) => (
  <div
    className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-200 transition-transform hover:scale-[1.02]`}
  >
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p
          className={`text-2xl font-bold ${
            isPositive ? "text-green-600" : "text-gray-800"
          }`}
        >
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(value)}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${bgColor.replace("50", "100")}`}>
        {icon}
      </div>
    </div>
  </div>
);

const FilterSelect = ({ icon, value, onChange, options }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <select
      className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const PaginationButton = ({ children, onClick, disabled, active = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

export default TransactionPage;
