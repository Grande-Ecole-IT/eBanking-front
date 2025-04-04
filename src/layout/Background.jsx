/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100"
          stroke="rgba(99, 179, 237, 0.15)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0,300 C150,400 350,200 500,300 C650,400 850,200 1000,300"
          stroke="rgba(99, 179, 237, 0.15)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />
      </svg>

      {[...Array(isMobile ? 8 : 15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 100, y: Math.random() * 100 }}
          animate={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            transition: {
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="absolute rounded-full bg-blue-200/30 border border-blue-300/30"
          style={{
            width: `${Math.random() * (isMobile ? 10 : 20) + 10}px`,
            height: `${Math.random() * (isMobile ? 10 : 20) + 10}px`,
          }}
        />
      ))}

      {!isMobile &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs font-mono text-blue-300/50"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 0.8, 0] }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
    </div>
  );
};

export default Background;
