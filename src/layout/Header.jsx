/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import logo from "../assets/Logo.png";
import Button from "../components/Button";

const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="flex justify-between items-center mb-8 md:mb-10 lg:mb-14"
  >
    <img src={logo} alt="FlashPay" className="w-30 h-auto" />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex space-x-2 sm:space-x-3 md:space-x-4"
    >
      <Button variant="outline" size="md">
        <NavLink to="/login">Connexion</NavLink>
      </Button>
      <Button variant="primary" size="md">
        <NavLink to="/register">Inscription</NavLink>
      </Button>
    </motion.div>
  </motion.header>
);

export default Header;
