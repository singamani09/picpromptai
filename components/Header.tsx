
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        PicPrompt AI
      </h1>
      <p className="mt-2 text-md md:text-lg text-gray-400 max-w-2xl mx-auto">
        Upload any image and our AI will craft a detailed, artistic prompt perfect for AI image generators.
      </p>
    </header>
  );
};

export default Header;
