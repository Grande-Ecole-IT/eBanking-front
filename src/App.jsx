import { Route, BrowserRouter as Router, Routes } from "react-router";
import AuthContextProvider from "./components/AuthContextProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransactionPage from "./pages/TransactionPage";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/transaction" element={<TransactionPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
