import React from "react";
import { FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import { FunctionResult } from "../types/functions";

interface ResultCardProps {
  func: FunctionResult;
  language: string;
  onCopy: (code: string) => void;
  index: number;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const getCategoryStyles = (category: string) => {
  const lowerCaseCategory = category.toLowerCase();

  switch (lowerCaseCategory) {
    case "function":
      return {
        bgColor: "bg-blue-500",
        hoverBgColor: "bg-blue-600",
        borderColor: "border-blue-500",
        color: "#3b82f6",
      };
    case "method":
      return {
        bgColor: "bg-purple-500",
        hoverBgColor: "bg-purple-600",
        borderColor: "border-purple-500",
        color: "#a855f7",
      };
    case "class":
      return {
        bgColor: "bg-red-500",
        hoverBgColor: "bg-red-600",
        borderColor: "border-red-500",
        color: "#ef4444",
      };
    case "property":
      return {
        bgColor: "bg-yellow-500",
        hoverBgColor: "bg-yellow-600",
        borderColor: "border-yellow-500",
        color: "#eab308",
      };
    case "decorator":
      return {
        bgColor: "bg-green-500",
        hoverBgColor: "bg-green-600",
        borderColor: "border-green-500",
        color: "#22c55e",
      };
    case "module":
      return {
        bgColor: "bg-indigo-500",
        hoverBgColor: "bg-indigo-600",
        borderColor: "border-indigo-500",
        color: "#6366f1",
      };
    case "library":
      return {
        bgColor: "bg-pink-500",
        hoverBgColor: "bg-pink-600",
        borderColor: "border-pink-500",
        color: "#ec4899",
      };
    case "operator":
      return {
        bgColor: "bg-orange-500",
        hoverBgColor: "bg-orange-600",
        borderColor: "border-orange-500",
        color: "#f97316",
      };
    case "event":
      return {
        bgColor: "bg-teal-500",
        hoverBgColor: "bg-teal-600",
        borderColor: "border-teal-500",
        color: "#14b8a6",
      };
    default:
      return {
        bgColor: "bg-green-800",
        hoverBgColor: "bg-green-900",
        borderColor: "border-green-800",
        color: "#166534",
      };
  }
};

const ResultCard: React.FC<ResultCardProps> = ({
  func,
  language,
  onCopy,
  index,
}) => {
  const capitalizeFirstLetter = (str: string) => {
    if (str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const categoryStyles = getCategoryStyles(func.category);

  return (
    <motion.div
      className={`bg-[var(--card-bg)] rounded-lg border-l-4 ${categoryStyles.borderColor} border border-[var(--border-color)] p-4`}
      variants={item}
      layout="position"
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: categoryStyles.color,
      }}
      transition={{ duration: 0.2 }}
      key={func.category}
    >
      <motion.div
        className="flex flex-wrap items-center justify-between mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
      >
        <div className="flex items-center">
          <h3 className="text-xl font-bold">{func.name}</h3>
          <motion.span
            className={`ml-2 text-xs px-2 py-1 rounded-full ${categoryStyles.bgColor} text-white flex items-center`}
            whileHover={{ scale: 1.05, backgroundColor: categoryStyles.color }}
          >
            {capitalizeFirstLetter(func.category)}
          </motion.span>
        </div>
        <motion.span
          className="text-sm px-2 py-1 rounded-full bg-primary text-white"
          whileHover={{ scale: 1.05 }}
        >
          {capitalizeFirstLetter(language)}
        </motion.span>
      </motion.div>

      <motion.p
        className="mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 * (index + 1), duration: 0.3 }}
      >
        {func.description || "No description available"}
      </motion.p>

      <motion.h4
        className="text-lg font-medium mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 * (index + 1), duration: 0.3 }}
      >
        Syntax:
      </motion.h4>
      <motion.div
        className="code-block relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          backgroundColor: "rgba(var(--primary-rgb), 0.05)",
          scale: 1.01,
        }}
      >
        <motion.button
          className="absolute top-2 right-4 p-1 bg-primary text-white rounded text-xs hover:bg-primary-dark transition-colors z-10"
          onClick={() => onCopy(func.syntax || "")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCopy className="inline mr-1" /> Copy
        </motion.button>
        <pre className="overflow-auto relative pr-16 py-5">
          <code>{func.syntax || "No syntax information available"}</code>
        </pre>
      </motion.div>

      {func.parameters && func.parameters.length > 0 && (
        <>
          <motion.h4
            className="text-lg font-medium mt-3 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 * (index + 1), duration: 0.3 }}
          >
            Parameters:
          </motion.h4>
          <motion.ul
            className="list-disc pl-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 * (index + 1), duration: 0.3 }}
          >
            {func.parameters.map((param, paramIndex) => (
              <motion.li
                key={paramIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ x: 5, color: "var(--primary-color)" }}
              >
                <strong>{param.name}</strong>{" "}
                {param.required ? "(required)" : "(optional)"}:
                {param.description || "No description available"}
              </motion.li>
            ))}
          </motion.ul>
        </>
      )}

      {func.returnValue && (
        <>
          <motion.h4
            className="text-lg font-medium mt-3 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 * (index + 1), duration: 0.3 }}
          >
            Return Value:
          </motion.h4>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ color: "var(--primary-color)" }}
          >
            {func.returnValue}
          </motion.p>
        </>
      )}

      <motion.h4
        className="text-lg font-medium mt-3 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 * (index + 1), duration: 0.3 }}
      >
        Example:
      </motion.h4>
      <motion.div
        className="code-block relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          backgroundColor: "rgba(var(--primary-rgb), 0.05)",
          scale: 1.01,
        }}
      >
        <pre className="overflow-auto relative pr-16 py-2">
          <code>{func.example || "No example available"}</code>
        </pre>
        <motion.button
          className="absolute top-2 right-4 p-1 bg-primary text-white rounded text-xs hover:bg-primary-dark transition-colors z-10"
          onClick={() => onCopy(func.example || "")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCopy className="inline mr-1" /> Copy
        </motion.button>
      </motion.div>

      {func.alternatives && func.alternatives.length > 0 && (
        <motion.div
          className="mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 * (index + 1), duration: 0.3 }}
        >
          <motion.h4 className="text-lg font-medium mb-2">
            Alternatives:
          </motion.h4>
          <div>
            {func.alternatives.map((alt, altIndex) => (
              <motion.span
                key={altIndex}
                className="inline-block px-2 py-1 bg-primary text-white rounded-full text-xs mr-2 mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1 * altIndex + 1.1 * (index + 1),
                  duration: 0.2,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "var(--primary-dark-color)",
                }}
              >
                {alt}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultCard;
