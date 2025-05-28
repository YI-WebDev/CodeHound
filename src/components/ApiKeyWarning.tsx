import React from "react";

interface ApiKeyWarningProps {
  apiKey: string;
}

const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ apiKey }) => {
  if (apiKey) return null;

  return (
    <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300">
      <h3 className="font-bold mb-2">API Key Required</h3>
      <p className="mb-2">Please set the API key in the .env file.</p>
      <p className="mt-2 text-sm">
        For example, you can get the API key from{" "}
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          OpenRouter
        </a>
      </p>
    </div>
  );
};

export default ApiKeyWarning;
