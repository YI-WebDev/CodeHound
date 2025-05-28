import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      className="flex justify-center items-center my-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="border-4 border-gray-200 border-l-primary rounded-full w-8 h-8 animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.p
        className="ml-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Searching for the best functions...
      </motion.p>
    </motion.div>
  );
};

export default LoadingSpinner;
