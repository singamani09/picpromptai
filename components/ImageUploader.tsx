
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageSelect: (file: File, dataUrl: string) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (imageUrl) {
    return (
      <div className="relative w-full max-w-lg mx-auto group">
        <img src={imageUrl} alt="Uploaded preview" className="rounded-lg w-full h-auto object-contain" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onButtonClick}
            className="bg-white text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Change Image
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          accept="image/*"
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onButtonClick}
      className={`w-full max-w-lg mx-auto p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300
        ${isDragging ? 'border-purple-500 bg-gray-800' : 'border-gray-600 hover:border-purple-400'}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
        accept="image/*"
      />
      <div className="flex flex-col items-center justify-center text-center text-gray-400">
        <UploadIcon className="w-12 h-12 mb-4" />
        <p className="font-semibold text-lg">Click to upload or drag and drop</p>
        <p className="text-sm">PNG, JPG, WEBP, etc.</p>
      </div>
    </div>
  );
};

export default ImageUploader;
