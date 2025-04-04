/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Button from "../components/Button";
import { NavLink } from "react-router";

const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="flex justify-between items-center mb-12 md:mb-16 lg:mb-24"
  >
    <div className="flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl font-bold text-blue-800"
      >
        FlashPay
      </motion.div>
    </div>
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
