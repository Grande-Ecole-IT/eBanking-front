/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Réseau de connexions animé (style circuit imprimé) */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,50 Q100,100 200,50 T400,50 T600,30 T800,70 T1000,50"
          stroke="#88C9FF"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,70 Q150,20 300,70 T500,90 T700,30 T1000,60"
          stroke="#A0D9FF"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{
            duration: 20,
            delay: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      {/* Grille technologique animée */}
      <motion.div
        className="absolute inset-0 bg-grid-blue-200"
        style={{
          backgroundImage: `linear-gradient(to right, #B5D7FF 1px, transparent 1px), linear-gradient(to bottom, #B5D7FF 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "90% 90%"],
        }}
        transition={{
          duration: 700,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Hologramme central (data sphere) */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "50%",
          left: "50%",
          width: "300px",
          height: "300px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(160,217,255,0.2) 0%, rgba(136,201,255,0) 70%)",
          borderRadius: "50%",
          boxShadow: "0 0 40px rgba(160, 217, 255, 0.3)",
        }}
      >
        {/* Points de données animés */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              backgroundColor: "#88C9FF",
              borderRadius: "50%",
              top: `${50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}%`,
              left: `${50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Barres de données animées (style dashboard) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-200"
          style={{
            bottom: 0,
            left: `${10 + i * 12}%`,
            width: "60px",
            height: "20%",
            opacity: 0.4,
          }}
          animate={{
            height: [
              `${20 + Math.random() * 30}%`,
              `${40 + Math.random() * 50}%`,
              `${20 + Math.random() * 30}%`,
            ],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Background;
