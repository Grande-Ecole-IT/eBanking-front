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
    <div className="fixed inset-0 z-0 overflow-hidden opacity-40">
      {/* Circuit Board with Glow Effect */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <motion.path
          d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100"
          stroke="rgba(56, 182, 255, 0.3)"
          strokeWidth="2"
          filter="url(#glow)"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0,300 C150,400 350,200 500,300 C650,400 850,200 1000,300"
          stroke="rgba(56, 182, 255, 0.3)"
          strokeWidth="2"
          filter="url(#glow)"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
        <motion.path
          d="M0,500 C150,600 350,400 500,500 C650,600 850,400 1000,500"
          stroke="rgba(56, 182, 255, 0.3)"
          strokeWidth="2"
          filter="url(#glow)"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
        />
      </svg>
    </div>
  );
};

export default Background;
