import { useState, useEffect } from "react";
import {
  FiCreditCard,
  FiArrowUp,
  FiArrowDown,
  FiDollarSign,
  FiSettings,
  FiHelpCircle,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiType,
  FiCheckCircle,
  FiTag,
} from "react-icons/fi";
import Background from "../layout/Background";

const TransactionPage = () => {
  // Données de démonstration
  const allTransactions = [
    {
      id: "MSB-00587",
      name: "SOPHIA WILLIAMS",
      date: new Date("2024-06-23"),
      status: "success",
      amount: 200.0,
      type: "debit",
      category: "shopping",
    },
    {
      id: "MSB-00586",
      name: "ALEX DUBOIS",
      date: new Date("2024-06-22"),
      status: "success",
      amount: 450.0,
      type: "credit",
      category: "salary",
    },
    {
      id: "MSB-00585",
      name: "EMMA JOHNSON",
      date: new Date("2024-06-21"),
      status: "pending",
      amount: 125.5,
      type: "debit",
      category: "utilities",
    },
    {
      id: "MSB-00584",
      name: "MICHAEL BROWN",
      date: new Date("2024-06-20"),
      status: "success",
      amount: 320.0,
      type: "debit",
      category: "shopping",
    },
    {
      id: "MSB-00583",
      name: "FREELANCE PAYMENT",
      date: new Date("2024-06-19"),
      status: "success",
      amount: 1300.0,
      type: "credit",
      category: "freelance",
    },
    {
      id: "MSB-00582",
      name: "AMAZON PURCHASE",
      date: new Date("2024-06-18"),
      status: "success",
      amount: 89.99,
      type: "debit",
      category: "shopping",
    },
    {
      id: "MSB-00581",
      name: "CLIENT PAYMENT",
      date: new Date("2024-06-17"),
      status: "success",
      amount: 750.0,
      type: "credit",
      category: "freelance",
    },
    {
      id: "MSB-00580",
      name: "ELECTRIC BILL",
      date: new Date("2024-06-16"),
      status: "success",
      amount: 85.0,
      type: "debit",
      category: "utilities",
    },
    {
      id: "MSB-00579",
      name: "NETFLIX SUBSCRIPTION",
      date: new Date("2024-06-15"),
      status: "success",
      amount: 15.99,
      type: "debit",
      category: "entertainment",
    },
    {
      id: "MSB-00578",
      name: "RESTAURANT",
      date: new Date("2024-06-14"),
      status: "success",
      amount: 45.3,
      type: "debit",
      category: "food",
    },
  ];

  // États
  const [activeTab, setActiveTab] = useState("Transactions");
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    status: "all",
    category: "all",
    dateRange: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Options de filtrage
  const statusOptions = ["success", "pending", "failed"];
  const categoryOptions = [...new Set(allTransactions.map((t) => t.category))];
  const itemsPerPageOptions = [5, 10, 15, 20];

  // Filtrer les transactions
  const filteredTransactions = allTransactions.filter((transaction) => {
    // Filtre par recherche
    if (
      filters.search &&
      !transaction.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !transaction.id.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Filtre par type
    if (filters.type !== "all" && transaction.type !== filters.type) {
      return false;
    }

    // Filtre par statut
    if (filters.status !== "all" && transaction.status !== filters.status) {
      return false;
    }

    // Filtre par catégorie
    if (
      filters.category !== "all" &&
      transaction.category !== filters.category
    ) {
      return false;
    }

    // Filtre par date
    if (filters.dateRange !== "all") {
      const today = new Date();
      const startDate = new Date(today);

      if (filters.dateRange === "week") {
        startDate.setDate(today.getDate() - 7);
      } else if (filters.dateRange === "month") {
        startDate.setMonth(today.getMonth() - 1);
      } else if (filters.dateRange === "year") {
        startDate.setFullYear(today.getFullYear() - 1);
      }

      if (transaction.date < startDate) {
        return false;
      }
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

  // Gestion des filtres
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      status: "all",
      category: "all",
      dateRange: "all",
    });
  };

  // Formater la date
  const formatDate = (date) => {
    return date
      .toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  };

  // Statistiques
  const totalBalance = 90680.32;
  const totalIncome = 65560.52;
  const totalExpenses = 38240.28;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Background />
      {/* Sidebar */}
      <div className="z-10 w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">FlashPay</h1>

        <nav className="space-y-2">
          {[
            "Dashboard",
            "My Cards",
            "Transfer",
            "Transactions",
            "Payments",
            "Exchange",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                activeTab === item
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item === "My Cards" && <FiCreditCard className="mr-3" />}
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <nav className="space-y-2">
            {["Settings", "Support"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                  activeTab === item
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item === "Settings" ? (
                  <FiSettings className="mr-3" />
                ) : (
                  <FiHelpCircle className="mr-3" />
                )}
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
            <p className="text-gray-500">Gérez votre historique financier</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Assistant: Jason R.</span>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Balance</p>
                <h3 className="text-2xl font-bold mt-1">
                  $
                  {totalBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FiDollarSign className="text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Income */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Income</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">
                  +$
                  {totalIncome.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiArrowUp className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Expenses</p>
                <h3 className="text-2xl font-bold mt-1 text-red-600">
                  -$
                  {totalExpenses.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiArrowDown className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FiFilter className="mr-2" /> Advanced Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiType className="text-gray-400" />
              </div>
              <select
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 appearance-none"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

            {/* Status */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCheckCircle className="text-gray-400" />
              </div>
              <select
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 appearance-none"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="all">All Statuses</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-gray-400" />
              </div>
              <select
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 appearance-none"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="all">All Categories</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-400" />
              </div>
              <select
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 appearance-none"
                value={filters.dateRange}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)
                }
              >
                <option value="all">All Dates</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Résultats et pagination */}

          <div className="z-10 flex justify-between items-center my-4">
            <div className="text-sm text-gray-500">
              {filteredTransactions.length} transactions found
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Show:</span>
              <select
                className="border border-gray-300 rounded-lg py-1 px-2 text-sm focus:ring-2 focus:ring-indigo-200"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500">per page</span>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DATE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {transaction.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === "success"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status.toUpperCase()}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            transaction.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No transactions found with these criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredTransactions.length)} of{" "}
              {filteredTransactions.length} transactions
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm ${
                      pageNum === currentPage
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
