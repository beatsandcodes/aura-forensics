import React, { useState, useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div 
        className={`relative w-full p-12 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-6 cursor-pointer
          ${isDragging ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'}
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden" 
          accept="image/*,video/*"
        />
        
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner">
          <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Upload Analysis Target</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Drag and drop images or videos here to run a deep forensic scan.
          </p>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-indigo-400 font-medium animate-pulse">Running Neural Diagnostics...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <span className="px-3 py-1 bg-slate-900 text-slate-400 text-[10px] mono uppercase border border-slate-700 rounded">JPG/PNG</span>
        <span className="px-3 py-1 bg-slate-900 text-slate-400 text-[10px] mono uppercase border border-slate-700 rounded">MP4/MOV</span>
        <span className="px-3 py-1 bg-slate-900 text-slate-400 text-[10px] mono uppercase border border-slate-700 rounded">Synthetic Media</span>
      </div>
    </div>
  );
};

export default FileUploader;
