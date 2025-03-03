import { FunctionResult } from "../types/functions";

interface SearchResponse {
  functions: FunctionResult[];
}

interface SearchOptions {
  query: string;
  language: string;
  apiKey: string;
  page?: number;
}

interface FunctionSearchResult {
  success: boolean;
  data?: FunctionResult[];
  error?: {
    message: string;
    status?: number;
  };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exponentialBackoff = (retryCount: number, baseDelay = 1000) => {
  return Math.min(baseDelay * Math.pow(2, retryCount), 10000);
};

export async function searchFunctions({ query, language, apiKey }: SearchOptions): Promise<FunctionSearchResult> {
  if (!apiKey) {
    return {
      success: false,
      error: {
        message: 'Please enter an OpenRouter API key in the settings',
        status: 400
      }
    };
  }

  let retryCount = 0;
  const maxRetries = 3;

  while (true) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": import.meta.env.VITE_SITE_URL || window.location.origin,
          "X-Title": import.meta.env.VITE_SITE_NAME || "CodeHound",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-pro-exp-02-05:free",
          "messages": [
            {
              "role": "user",
              "content": `I want to ${query} in ${language}. Provide ONLY raw JSON in your response with no explanations, additional text, or code block formatting (no \`\`\`). The JSON should include an array of "function or method or property or class or module or library or operator or event or decorator" with the following structure:
              {
                "functions": [
                  {
                    "category": "function or method or property or class or module or library or operator or event or decorator",
                    "name": "function_name",
                    "description": "Brief explanation of what the function does",
                    "syntax": "How to use the function/method",
                    "parameters": [
                      {"name": "param1", "description": "What this parameter does", "required": true/false}
                    ],
                    "returnValue": "What the function returns",
                    "example": "Code example showing how to use it",
                    "alternatives": ["other_function1", "other_function2"]
                  }
                ]
              }
              Return at least 5 different functions that best match what I want to do, ordered by relevance.`
            }
          ]
        })
      });

      if (!response.ok) {
        if (response.status === 429 && retryCount < maxRetries) {
          retryCount++;
          const backoffTime = exponentialBackoff(retryCount);
          await delay(backoffTime);
          continue;
        }

        if (response.status === 401) {
          return {
            success: false,
            error: {
              message: 'Invalid API key. Please check your OpenRouter API key.',
              status: 401
            }
          };
        } else {
          let errorDetail = '';
          try {
            const errorData = await response.json();
            errorDetail = errorData?.error?.message || '';
          } catch (e) {
          }

          const errorMessage = `API request failed with status ${response.status}${errorDetail ? `: ${errorDetail}` : ''}`;
          return {
            success: false,
            error: {
              message: errorMessage,
              status: response.status
            }
          };
        }
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const content = data.choices[0].message.content;
        const jsonStartIndex = content.indexOf('{');
        const jsonEndIndex = content.lastIndexOf('}');

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
          const jsonStr = content.substring(jsonStartIndex, jsonEndIndex + 1);
          const parsedData = JSON.parse(jsonStr) as SearchResponse;

          if (parsedData.functions && Array.isArray(parsedData.functions)) {
            return {
              success: true,
              data: parsedData.functions
            };
          } else {
            return {
              success: false,
              error: {
                message: 'Invalid response format. Please try again.',
                status: 500
              }
            };
          }
        } else {
          return {
            success: false,
            error: {
              message: 'Could not parse the response. Please try a different query.',
              status: 500
            }
          };
        }
      } else {
        return {
          success: false,
          error: {
            message: 'Invalid response from API. Please try again.',
            status: 500
          }
        };
      }
    } catch (err: any) {
      if (retryCount < maxRetries) {
        retryCount++;
        const backoffTime = exponentialBackoff(retryCount);
        await delay(backoffTime);
        continue;
      }
      return {
        success: false,
        error: {
          message: err.message || 'An error occurred. Please try again.',
          status: 500
        }
      };
    }
  }
}
