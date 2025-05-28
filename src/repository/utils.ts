import { API_CONFIG } from './constants';
import { SearchResponse } from '../types/functions';

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const exponentialBackoff = (retryCount: number): number => {
  return Math.min(API_CONFIG.BASE_DELAY_MS * Math.pow(2, retryCount), API_CONFIG.MAX_DELAY_MS);
};

export const parseApiResponse = (content: string): SearchResponse | null => {
  const jsonStartIndex = content.indexOf('{');
  const jsonEndIndex = content.lastIndexOf('}');

  if (jsonStartIndex === -1 || jsonEndIndex === -1) {
    return null;
  }

  try {
    const jsonStr = content.substring(jsonStartIndex, jsonEndIndex + 1);
    const parsedData = JSON.parse(jsonStr) as SearchResponse;
    
    if (parsedData.functions && Array.isArray(parsedData.functions)) {
      return parsedData;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const createApiHeaders = (apiKey: string): Record<string, string> => ({
  "Authorization": `Bearer ${apiKey}`,
  "HTTP-Referer": import.meta.env.VITE_SITE_URL || window.location.origin,
  "X-Title": import.meta.env.VITE_SITE_NAME || "CodeHound",
  "Content-Type": "application/json"
}); 