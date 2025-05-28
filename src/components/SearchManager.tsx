import React, { useState, useImperativeHandle, forwardRef } from "react";
import { searchFunctions } from "../repository";
import SearchForm from "./SearchForm";
import { toast } from "react-toastify";
import { SearchManagerHandle } from "../types/components";
import { FunctionResult } from "../types/functions";

interface SearchManagerProps {
  currentLanguage: string;
  apiKey: string;
  onSearchResults: (results: FunctionResult[]) => void;
  onError: (message: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
  setCurrentLanguage?: (language: string) => void;
}

const SearchManager = forwardRef<SearchManagerHandle, SearchManagerProps>(
  (
    {
      currentLanguage,
      apiKey,
      onSearchResults,
      onError,
      onLoadingChange,
      setCurrentLanguage = () => {},
    },
    ref
  ) => {
    const [lastQuery, setLastQuery] = useState<string>("");
    const [currentResults, setCurrentResults] = useState<FunctionResult[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const handleSearch = async (query: string, isLoadMore = false) => {
      if (!query.trim()) return;

      setLastQuery(query);

      if (!isLoadMore) {
        setCurrentResults([]);
        onSearchResults([]);
        onError("");
        onLoadingChange(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const result = await searchFunctions({
          query,
          language: currentLanguage,
          apiKey,
          page: isLoadMore ? Math.ceil(currentResults.length / 5 + 1) : 1,
        });

        if (!result.success) {
          const errorMessage =
            result.error?.message || "An unexpected error occurred";
          onError(errorMessage);
          toast.error(errorMessage);

          if (result.error?.status === 429) {
            toast.info("Rate limit error. Retrying in 5 seconds...");
            setTimeout(() => {
              if (lastQuery) {
                handleSearch(lastQuery, isLoadMore);
              }
            }, 5000);
          }
          return;
        }

        if (isLoadMore) {
          const newResults = [...currentResults, ...(result.data || [])];
          setCurrentResults(newResults);
          onSearchResults(newResults);
          setIsLoadingMore(false);
        } else {
          setCurrentResults(result.data || []);
          onSearchResults(result.data || []);
        }
      } catch (err: any) {
        const errorMessage = "An unexpected error occurred. Please try again.";
        onError(errorMessage);
        toast.error(errorMessage);
        console.error("Error:", err);
      } finally {
        if (!isLoadMore) {
          onLoadingChange(false);
        } else {
          setIsLoadingMore(false);
        }
      }
    };

    const handleLoadMore = () => {
      if (lastQuery) {
        handleSearch(lastQuery, true);
      }
    };
    useImperativeHandle(
      ref,
      () => {
        return {
          handleLoadMore,
          isLoadingMore,
        };
      },
      [lastQuery, isLoadingMore]
    );

    return (
      <div>
        <SearchForm
          onSearch={handleSearch}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          lastQuery={lastQuery}
        />
      </div>
    );
  }
);

export default SearchManager;
