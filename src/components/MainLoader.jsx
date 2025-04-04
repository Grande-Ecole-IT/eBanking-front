/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MainLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cercle holographique */}
      <div className="relative h-64 w-64 mb-8">
        {/* Cercle externe animé */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-400 border-opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cercle intermédiaire */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-blue-300 border-opacity-50"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Cercle central avec effet de pulsation */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-lg shadow-blue-500/30"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px rgba(96, 165, 250, 0.3)",
              "0 0 40px rgba(96, 165, 250, 0.5)",
              "0 0 20px rgba(96, 165, 250, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Points tournants */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-3 w-3 bg-blue-200 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                transform: `rotate(${i * 45}deg) translateX(40px) rotate(-${
                  i * 45
                }deg)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Barre de progression futuriste */}
      <div className="w-72 h-2 bg-blue-900 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Texte animé */}
      <motion.h2
        className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-2"
        animate={{
          opacity: [0.8, 1, 0.8],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Chargement du système
      </motion.h2>

      <motion.p
        className="text-blue-300 text-sm"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {progress < 50
          ? "Analyse des modules..."
          : progress < 80
          ? "Configuration en cours..."
          : "Finalisation..."}
      </motion.p>

      {/* Effets de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -50, -100],
              x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MainLoader;
