
import React, { useState, useCallback } from 'react';
import { ArtStyle, Language } from './types';
import { generatePrompt } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Controls from './components/Controls';
import PromptOutput from './components/PromptOutput';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [artStyle, setArtStyle] = useState<ArtStyle>(ArtStyle.REALISTIC);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File, dataUrl: string) => {
    setImageFile(file);
    setImageUrl(dataUrl);
    setGeneratedPrompt(''); // Clear previous prompt on new image
    setError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!imageFile || !imageUrl) return;

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      // Data URL format: data:image/png;base64,iVBORw0KGgo...
      const base64Data = imageUrl.split(',')[1];
      const mimeType = imageFile.type;

      const prompt = await generatePrompt(base64Data, mimeType, artStyle, language);
      setGeneratedPrompt(prompt);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate prompt: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, imageUrl, artStyle, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8">
          <ImageUploader onImageSelect={handleImageSelect} imageUrl={imageUrl} />
          
          <Controls 
            artStyle={artStyle}
            setArtStyle={setArtStyle}
            language={language}
            setLanguage={setLanguage}
            isImageUploaded={!!imageFile}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md max-w-lg mx-auto">
              {error}
            </div>
          )}

          <PromptOutput 
            prompt={generatedPrompt} 
            isLoading={isLoading}
            onRegenerate={handleGenerate}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
