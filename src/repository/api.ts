import { API_CONFIG } from './constants';
import { FUNCTION_SEARCH_PROMPT } from './prompts';
import { createApiHeaders } from './utils';

export interface ApiCallOptions {
  query: string;
  language: string;
  apiKey: string;
}

export interface ApiResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export async function callOpenRouterApi({ query, language, apiKey }: ApiCallOptions): Promise<Response> {
  const headers = createApiHeaders(apiKey);
  
  const body = JSON.stringify({
    model: API_CONFIG.MODEL,
    messages: [
      {
        role: "user",
        content: FUNCTION_SEARCH_PROMPT(query, language)
      }
    ]
  });

  return fetch(API_CONFIG.OPENROUTER_API_URL, {
    method: "POST",
    headers,
    body
  });
}

export async function getErrorMessage(response: Response): Promise<string> {
  let errorDetail = '';
  try {
    const errorData = await response.json();
    errorDetail = errorData?.error?.message || '';
  } catch (e) {
    // エラー詳細の取得に失敗した場合は無視
  }
  
  return `API request failed with status ${response.status}${errorDetail ? `: ${errorDetail}` : ''}`;
} 