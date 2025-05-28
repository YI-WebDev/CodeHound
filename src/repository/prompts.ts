export const FUNCTION_SEARCH_PROMPT = (query: string, language: string) => `I want to ${query} in ${language}. Provide ONLY raw JSON in your response with no explanations, additional text, or code block formatting (no \`\`\`). The JSON should include an array of "function or method or property or class or module or library or operator or event or decorator" with the following structure:
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
Return at least 5 different functions that best match what I want to do, ordered by relevance.`; 