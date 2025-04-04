import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function AuthLayout({ children, title, subtitle, features }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span className="hidden sm:inline">Retour à l'accueil</span>
      </motion.button>

      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #3b82f6 1%, #2563eb 1%)",
        }}
      >
        <div className="absolute w-full h-full overflow-hidden z-0">
          <div className="absolute w-64 h-64 bg-white/10 rounded-full -bottom-32 -left-32"></div>
          <div className="absolute w-48 h-48 bg-white/10 rounded-full top-1/2 -right-24"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="text-xl opacity-90 mb-8">{subtitle}</p>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="opacity-75">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;
