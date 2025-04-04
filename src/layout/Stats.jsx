/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const stats = [
  { value: "2M+", label: "Utilisateurs satisfaits" },
  { value: "99.9%", label: "Disponibilité" },
  { value: "0€", label: "Frais cachés" },
];

const Stats = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-16 md:mb-24 lg:mb-32 bg-blue-500/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center"
  >
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="p-4 md:p-6"
        >
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 mb-2">
            {stat.value}
          </div>
          <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default Stats;
