import { FunctionResult } from '../types/functions';

export interface SearchOptions {
  query: string;
  language: string;
  apiKey: string;
  page?: number;
}

export interface FunctionSearchResult {
  success: boolean;
  data?: FunctionResult[];
  error?: {
    message: string;
    status?: number;
  };
} 