import { Route, BrowserRouter as Router, Routes } from "react-router";
import AuthContextProvider from "./components/AuthContextProvider";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
