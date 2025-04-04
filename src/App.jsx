import { Route, BrowserRouter as Router, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
