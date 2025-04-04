/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="mt-16 md:mt-24 lg:mt-32 pb-12 md:pb-16 flex flex-col md:flex-row justify-between items-center">
    <motion.div
      className="flex items-center mb-6 md:mb-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-xl font-bold text-blue-800">NeoBank</div>
    </motion.div>
    <motion.div
      className="flex flex-wrap justify-center gap-4 md:gap-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >
      {["Confidentialité", "Conditions", "Sécurité", "Contact"].map(
        (item, index) => (
          <motion.a
            key={index}
            whileHover={{ y: -3 }}
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors text-sm md:text-base"
          >
            {item}
          </motion.a>
        )
      )}
    </motion.div>
  </footer>
);

export default Footer;
