import React, { useState, useRef } from "react";
import Header from "./Header";
import ResultsContainer from "./ResultsContainer";
import LoadingSpinner from "./LoadingSpinner";
import SearchManager from "./SearchManager";
import ApiKeyWarning from "./ApiKeyWarning";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchManagerHandle } from "../types/components";
import { useAppContext } from "../context/AppContext";

const MainTemplate: React.FC = () => {
  const {
    results,
    loading,
    error,
    currentLanguage,
    apiKey,
    setResults,
    setError,
    setLoading,
    setCurrentLanguage,
  } = useAppContext();

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const searchManagerRef = useRef<SearchManagerHandle>(null);

  const handleLoadMore = () => {
    if (searchManagerRef.current) {
      setIsLoadingMore(true);
      searchManagerRef.current.handleLoadMore();
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Header />
      <ApiKeyWarning apiKey={apiKey} />
      <SearchManager
        ref={searchManagerRef}
        currentLanguage={currentLanguage}
        apiKey={apiKey}
        onSearchResults={(newResults) => {
          setResults(newResults);
          setIsLoadingMore(false);
        }}
        onError={setError}
        onLoadingChange={setLoading}
        setCurrentLanguage={setCurrentLanguage}
      />
      {loading && <LoadingSpinner />}
      {!loading && !error && results.length > 0 && (
        <ResultsContainer
          results={results}
          language={currentLanguage}
          onCopy={handleCopy}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </div>
  );
};

export default MainTemplate;
