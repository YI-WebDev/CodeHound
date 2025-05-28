import React, { createContext, useState, useContext, ReactNode } from "react";
import { FunctionResult } from "../types/functions";

interface AppContextType {
  results: FunctionResult[];
  loading: boolean;
  error: string;
  currentLanguage: string;
  apiKey: string;
  setResults: (results: FunctionResult[]) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrentLanguage: (language: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [results, setResults] = useState<FunctionResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("python");
  const [apiKey] = useState<string>(
    import.meta.env.VITE_OPENROUTER_API_KEY || ""
  );

  const value = {
    results,
    loading,
    error,
    currentLanguage,
    apiKey,
    setResults,
    setLoading,
    setError,
    setCurrentLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
