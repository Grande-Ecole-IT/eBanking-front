/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight, FiSend, FiShield, FiZap } from "react-icons/fi";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      title: "Paiement Social Instantané",
      desc: "Envoyez de l'argent par simple lien, sans RIB",
      icon: <FiSend className="text-2xl md:text-3xl" />,
    },
    {
      title: "Assistant Bancaire IA",
      desc: "Votre conseiller financier 24/7",
      icon: <FiZap className="text-2xl md:text-3xl" />,
    },
    {
      title: "Portefeuille Sécurisé",
      desc: "Gérez tout vos actifs au même endroit",
      icon: <FiShield className="text-2xl md:text-3xl" />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="mb-16 md:mb-24 lg:mb-32 px-4"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Des fonctionnalités{" "}
        <span className="relative">
          <span className="relative z-10">innovantes</span>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-1 left-0 h-2 bg-blue-200/60 z-0"
          />
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`p-6 md:p-8 rounded-xl bg-white/90 backdrop-blur-sm border border-blue-100 cursor-pointer transition-all ${
              activeFeature === index ? "ring-2 ring-blue-300" : ""
            }`}
            onClick={() => setActiveFeature(index)}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
              {feature.icon}
            </div>
            <div className="text-lg md:text-xl mb-3 font-semibold text-blue-800">
              {feature.title}
            </div>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              {feature.desc}
            </p>
            <div className="flex items-center text-blue-500 font-medium text-sm md:text-base">
              En savoir plus <FiArrowRight className="ml-2" />
            </div>
            <motion.div
              animate={{ width: activeFeature === index ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
              className="h-1 bg-gradient-to-r from-blue-300 to-blue-400 mt-4 rounded-full"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Features;
