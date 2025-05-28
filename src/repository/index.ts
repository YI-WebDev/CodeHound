import { API_CONFIG, HTTP_STATUS } from './constants';
import { delay, exponentialBackoff, parseApiResponse } from './utils';
import { callOpenRouterApi, getErrorMessage, ApiResponse } from './api';
import { 
  handleApiKeyError, 
  handleUnauthorizedError, 
  handleParseError, 
  handleInvalidResponseError,
  handleGeneralError,
  createErrorResult 
} from './errors';
import { SearchOptions, FunctionSearchResult } from './types';

async function handleApiResponse(response: Response): Promise<FunctionSearchResult> {
  if (!response.ok) {
    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      return handleUnauthorizedError();
    }
    
    const errorMessage = await getErrorMessage(response);
    return createErrorResult(errorMessage, response.status);
  }

  const data = await response.json() as ApiResponse;
  
  if (!data.choices?.[0]?.message?.content) {
    return handleInvalidResponseError();
  }

  const parsedData = parseApiResponse(data.choices[0].message.content);
  
  if (!parsedData) {
    return handleParseError();
  }

  return {
    success: true,
    data: parsedData.functions
  };
}

export async function searchFunctions({ query, language, apiKey }: SearchOptions): Promise<FunctionSearchResult> {
  if (!apiKey) {
    return handleApiKeyError();
  }

  let retryCount = 0;

  while (true) {
    try {
      const response = await callOpenRouterApi({ query, language, apiKey });
      
      if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS && retryCount < API_CONFIG.MAX_RETRIES) {
        retryCount++;
        const backoffTime = exponentialBackoff(retryCount);
        await delay(backoffTime);
        continue;
      }

      return await handleApiResponse(response);
      
    } catch (err: any) {
      if (retryCount < API_CONFIG.MAX_RETRIES) {
        retryCount++;
        const backoffTime = exponentialBackoff(retryCount);
        await delay(backoffTime);
        continue;
      }
      
      return handleGeneralError(err);
    }
  }
}
