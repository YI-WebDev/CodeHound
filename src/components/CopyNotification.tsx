import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyNotificationProps {
  show: boolean;
}

const CopyNotification: React.FC<CopyNotificationProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed bottom-5 right-5 bg-primary text-white py-3 px-4 rounded"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5}}
        >
          Code copied to clipboard!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CopyNotification; 