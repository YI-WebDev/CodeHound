import React, { useState, useMemo } from "react";
import ResultCard from "./ResultCard";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { FunctionResult } from "../types/functions";

interface ResultsContainerProps {
  results: FunctionResult[];
  language: string;
  onCopy: (code: string) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  results,
  language,
  onCopy,
  onLoadMore,
  isLoadingMore = false,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  if (!results || results.length === 0) {
    return null;
  }

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(results.map((result) => result.category))
    );
    return uniqueCategories;
  }, [results]);

  const categoryCounts = useMemo(() => {
    return categories.reduce((counts, category) => {
      counts[category] = results.filter(
        (result) => result.category === category
      ).length;
      return counts;
    }, {} as Record<string, number>);
  }, [results, categories]);

  const filteredResults =
    categoryFilter === "all"
      ? results
      : results.filter((result) => result.category === categoryFilter);

  const getCategoryColor = (category: string) => {
    const lowerCaseCategory = category.toLowerCase();

    switch (lowerCaseCategory) {
      case "function":
        return "bg-blue-500";
      case "method":
        return "bg-purple-500";
      case "class":
        return "bg-red-500";
      case "property":
        return "bg-yellow-500";
      case "decorator":
        return "bg-green-500";
      case "module":
        return "bg-indigo-500";
      case "library":
        return "bg-pink-500";
      case "operator":
        return "bg-orange-500";
      case "event":
        return "bg-teal-500";
      default:
        return "bg-green-800";
    }
  };

  return (
    <div>
      <motion.div
        className="mb-4 flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-medium flex items-center">
          <FaFilter className="mr-1" /> Filter:
        </span>
        <motion.button
          className={`px-3 py-1 rounded-full text-sm flex items-center ${
            categoryFilter === "all"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
          onClick={() => setCategoryFilter("all")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All ({results.length})
        </motion.button>

        {categories.map(
          (category) =>
            categoryCounts[category] > 0 && (
              <motion.button
                key={category}
                className={`px-3 py-1 rounded-full text-sm flex items-center ${
                  categoryFilter === category
                    ? `${getCategoryColor(category)} text-white`
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
                onClick={() => setCategoryFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)} (
                {categoryCounts[category]})
              </motion.button>
            )
        )}
      </motion.div>

      {filteredResults.length === 0 ? (
        <motion.div
          className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No results found
        </motion.div>
      ) : (
        <>
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.3 }}
            key={categoryFilter}
          >
            {filteredResults.map((func, index) => (
              <ResultCard
                key={`${func.name}-${func.category}-${index}`}
                func={func}
                language={language}
                onCopy={onCopy}
                index={index}
              />
            ))}
          </motion.div>
          {onLoadMore && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {/* <motion.button
                className="bg-primary text-white px-6 py-2 rounded-full flex items-center justify-center"
                onClick={onLoadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading more results...
                  </>
                ) : (
                  "Load more"
                )}
              </motion.button> */}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultsContainer;
