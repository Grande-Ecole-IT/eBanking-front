/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import Button from "../components/Button";
import Card from "../components/Card";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 lg:mb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-500 text-sm font-medium"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Nouvelle génération bancaire
          </motion.span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          <AnimatedText text="La banque intelligente pour votre quotidien" />
        </h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
          variants={itemVariants}
        >
          Une expérience financière simplifiée, sécurisée et conçue pour vous
          faire gagner du temps.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 items-center max-w-xs mx-auto"
          variants={itemVariants}
        >
          <Button variant="primary" size="lg" icon="eye">
            Voir la démo
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 md:mt-16 relative w-full max-w-md px-4"
      >
        <Card />
      </motion.div>
    </section>
  );
};

export default Hero;
