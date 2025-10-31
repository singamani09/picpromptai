
import React, { useState } from 'react';
import { CopyIcon, ShareIcon, RegenerateIcon, CheckIcon, LoadingSpinner } from './icons';

interface PromptOutputProps {
  prompt: string;
  isLoading: boolean;
  onRegenerate: () => void;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ prompt, isLoading, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Generated Prompt',
        text: prompt,
      }).catch(console.error);
    } else {
      alert('Share functionality is not supported in your browser.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto mt-6">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="bg-gray-700 h-32 rounded-md"></div>
          <div className="flex justify-end space-x-2">
            <div className="bg-gray-700 h-10 w-24 rounded-md"></div>
            <div className="bg-gray-700 h-10 w-24 rounded-md"></div>
            <div className="bg-gray-700 h-10 w-24 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!prompt) {
    return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <div className="relative">
        <textarea
          readOnly
          value={prompt}
          className="w-full h-40 p-4 bg-gray-800 border border-gray-600 rounded-md resize-none text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Your generated prompt will appear here..."
        />
      </div>
      <div className="flex justify-end items-center mt-2 space-x-2">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        {navigator.share && (
            <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
            </button>
        )}
        <button
          onClick={onRegenerate}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          <RegenerateIcon className="w-5 h-5" />
          <span>Re-generate</span>
        </button>
      </div>
    </div>
  );
};

export default PromptOutput;
