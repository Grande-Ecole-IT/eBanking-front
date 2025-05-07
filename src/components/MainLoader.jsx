/* eslint-disable no-unused-vars */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCpu, FiDatabase, FiServer, FiWifi } from "react-icons/fi";

const MainLoader = () => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const animateLoader = async () => {
      await controls.start("visible");
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev >= 100 ? 0 : prev + Math.random() * 5 + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => controls.start("complete"), 500);
          }
          return newProgress;
        });
      }, 100 + Math.random() * 100);

      return () => clearInterval(interval);
    };

    animateLoader();
  }, [controls]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    complete: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 backdrop-blur-md"
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {/* Sphère holographique */}
      <div className="relative h-50 w-50 mb-8">
        {/* Noyau pulsant */}
        <motion.div
          className="absolute inset-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-2xl shadow-cyan-400/30"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 30px rgba(34, 211, 238, 0.3)",
              "0 0 60px rgba(34, 211, 238, 0.5)",
              "0 0 30px rgba(34, 211, 238, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Anneaux rotatifs */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute border rounded-full ${
              i === 0
                ? "inset-0 border-cyan-300/30 border-t-cyan-300/80"
                : i === 1
                ? "inset-6 border-blue-300/20 border-b-blue-300/60"
                : "inset-12 border-indigo-300/10 border-r-indigo-300/40"
            }`}
            animate={{
              rotate: 360,
              scale: [1, i === 1 ? 1.05 : 0.95, 1],
            }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Icônes flottantes */}
        {[
          { icon: <FiServer size={20} />, color: "text-cyan-300" },
          { icon: <FiDatabase size={20} />, color: "text-blue-300" },
          { icon: <FiCpu size={20} />, color: "text-indigo-300" },
          { icon: <FiWifi size={20} />, color: "text-purple-300" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color}`}
            style={{
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              transform: `rotate(${i * 90}deg) translateX(60px) rotate(-${
                i * 90
              }deg)`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Barre de progression style high-tech */}
      <div className="w-80 mb-6">
        <div className="flex justify-between text-xs text-cyan-100 mb-1">
          <span>INITIALISATION</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", damping: 10 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-1 bg-white"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Texte de statut animé */}
      <div className="text-center">
        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2"
          animate={{
            textShadow: [
              "0 0 8px rgba(34, 211, 238, 0)",
              "0 0 8px rgba(34, 211, 238, 0.3)",
              "0 0 8px rgba(34, 211, 238, 0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {progress < 30
            ? "DÉMARRAGE DU SYSTÈME"
            : progress < 70
            ? "CHARGEMENT DES DONNÉES"
            : "CONNEXION EN COURS"}
        </motion.h2>

        <motion.p
          className="text-cyan-200 text-sm font-mono"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {progress < 30
            ? "> Vérification des composants..."
            : progress < 70
            ? "> Analyse des données..."
            : "> Établissement de la connexion..."}
        </motion.p>
      </div>

      {/* Fond style grille hexagonale */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid"></div>
      </div>

      {/* Effet "pluie de code" */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/30 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-20px",
            }}
            animate={{
              y: `calc(100vh + 20px)`,
              opacity: [0, Math.random(), 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
            {Math.random() > 0.5 ? "1" : "0"}
            {Math.random() > 0.5 ? "1" : "0"}
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MainLoader;
