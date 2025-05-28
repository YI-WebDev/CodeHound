import { HTTP_STATUS } from './constants';
import { FunctionSearchResult } from './types';

export const createErrorResult = (message: string, status?: number): FunctionSearchResult => ({
  success: false,
  error: {
    message,
    status
  }
});

export const handleApiKeyError = (): FunctionSearchResult => 
  createErrorResult('Please enter an OpenRouter API key in the settings', HTTP_STATUS.BAD_REQUEST);

export const handleUnauthorizedError = (): FunctionSearchResult => 
  createErrorResult('Invalid API key. Please check your OpenRouter API key.', HTTP_STATUS.UNAUTHORIZED);

export const handleParseError = (): FunctionSearchResult => 
  createErrorResult('Could not parse the response. Please try a different query.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

export const handleInvalidResponseError = (): FunctionSearchResult => 
  createErrorResult('Invalid response format. Please try again.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

export const handleGeneralError = (error: any): FunctionSearchResult => 
  createErrorResult(error.message || 'An error occurred. Please try again.', HTTP_STATUS.INTERNAL_SERVER_ERROR); 