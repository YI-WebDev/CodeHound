import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { languages } from "../types/language";

interface SearchFormProps {
  onSearch: (query: string) => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  lastQuery: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  currentLanguage,
  setCurrentLanguage,
  lastQuery,
}) => {
  const [query, setQuery] = useState<string>(lastQuery || "");

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    if (query) {
      onSearch(query);
    } else {
      onSearch(lastQuery);
    }
  };

  useEffect(() => {
    if (lastQuery) {
      setQuery(lastQuery);
    }
  }, [lastQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-center mb-6 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {languages.map((language) => (
          <motion.button
            key={language.id}
            type="button"
            onClick={() => handleLanguageChange(language.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentLanguage === language.id
                ? `${language.bgColor} ${language.textColor}`
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language.name}
          </motion.button>
        ))}
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="mb-4">
          <motion.label
            htmlFor="search-input"
            className="block mb-2 text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            I want to...
          </motion.label>
          <motion.textarea
            id="search-input"
            rows={3}
            className="block w-full p-2.5 text-base rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g., 'sort a list alphabetically' or 'convert a string to lowercase'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
        </div>
        <motion.button
          type="submit"
          className="text-white bg-primary hover:bg-primary-dark font-medium rounded-lg text-base px-5 py-2.5 text-center transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          Search
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default SearchForm;
