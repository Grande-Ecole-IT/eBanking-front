/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Button from "../components/Button";

const CTA = () => (
  <motion.section
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center py-12 md:py-16 px-6 md:px-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-blue-200 relative overflow-hidden shadow-lg mb-16 md:mb-24 lg:mb-32"
  >
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"
      />
    </div>

    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 relative z-10 text-blue-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      Prêt pour la révolution bancaire ?
    </motion.h2>

    <motion.p
      className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
    >
      Rejoignez la liste d'attente et soyez parmi les premiers à essayer notre
      application.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <Button variant="primary" size="lg" icon="arrow">
        S'inscrire maintenant
      </Button>
    </motion.div>
  </motion.section>
);

export default CTA;
