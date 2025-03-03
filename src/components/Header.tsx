import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
      >
        Code<span className="text-primary">Hound</span>
      </motion.h1>
      <motion.p
        className="text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Describe what you want to do, get the right function or method
      </motion.p>
    </motion.div>
  );
};

export default Header;
