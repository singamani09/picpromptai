
import React from 'react';
import { ArtStyle, Language } from '../types';
import { ART_STYLES, LANGUAGES } from '../constants';

interface ControlsProps {
  artStyle: ArtStyle;
  setArtStyle: (style: ArtStyle) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isImageUploaded: boolean;
  onGenerate: () => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  artStyle,
  setArtStyle,
  language,
  setLanguage,
  isImageUploaded,
  onGenerate,
  isLoading,
}) => {
  const commonSelectClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

  return (
    <div className="w-full max-w-lg mx-auto mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="artStyle" className="block text-sm font-medium text-gray-300 mb-1">Art Style</label>
          <select
            id="artStyle"
            value={artStyle}
            onChange={(e) => setArtStyle(e.target.value as ArtStyle)}
            className={commonSelectClasses}
          >
            {ART_STYLES.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className={commonSelectClasses}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={onGenerate}
        disabled={!isImageUploaded || isLoading}
        className="w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center
                   bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700"
      >
        {isLoading ? 'Generating...' : 'Generate Prompt'}
      </button>
    </div>
  );
};

export default Controls;
