import React, { useCallback, useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

const ImageUploader = ({ onImageSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        if (onImageSelect) onImageSelect(file, objectUrl);
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreview(null);
        if (onImageSelect) onImageSelect(null, null);
    }

    return (
        <div className="w-full">
            {!preview ? (
                <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    <div className="flex flex-col items-center pointer-events-none">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                            <Upload size={32} />
                        </div>
                        <p className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">
                            Click or drag image here to upload
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            JPG, PNG, WEBP up to 10MB
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-slate-800">
                    <img src={preview} alt="Preview" className="w-full h-64 object-contain bg-slate-900" />
                    <button
                        onClick={clearSelection}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-white text-sm flex items-center gap-2">
                        <FileImage size={16} />
                        <span className="truncate">{selectedFile.name}</span>
                        <span className="opacity-70">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
