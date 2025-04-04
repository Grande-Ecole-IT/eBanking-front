/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiEye } from "react-icons/fi";

const iconMap = {
  download: FiDownload,
  eye: FiEye,
  arrow: FiArrowRight,
};

const Button = ({ variant = "primary", size = "md", icon, children }) => {
  const baseClasses =
    "rounded-lg flex items-center justify-center transition-all";
  const sizeClasses = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-6 py-2 md:px-8 md:py-3 text-base",
  };
  const variantClasses = {
    primary:
      "bg-blue-500 text-white shadow-lg shadow-blue-300/30 hover:bg-blue-600",
    outline:
      "border border-blue-300 text-blue-600 bg-white/80 backdrop-blur-sm hover:bg-blue-50",
  };

  const Icon = icon ? iconMap[icon] : null;

  return (
    <motion.button
      whileHover={{ scale: variant === "primary" ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </motion.button>
  );
};

export default Button;
