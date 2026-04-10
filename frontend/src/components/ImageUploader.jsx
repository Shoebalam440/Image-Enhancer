import React, { useCallback, useState } from 'react';
import { Upload, X, FileImage, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        if (!file.type.startsWith('image/')) {
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
            <AnimatePresence mode="wait">
                {!preview ? (
                    <motion.div
                        key="uploader"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`relative group rounded-[2rem] border-2 border-dashed transition-all duration-500 overflow-hidden ${
                            dragActive
                                ? 'border-indigo-500 bg-indigo-50/80 shadow-[0_4px_30px_rgba(79,70,229,0.15)]'
                                : 'border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={handleChange}
                            accept="image/*"
                        />
                        
                        <div className="p-12 flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                                    dragActive ? 'bg-indigo-500 text-white scale-110 rotate-12' : 'bg-white border border-slate-100 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)]'
                                }`}>
                                    <Upload size={32} />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 animate-pulse">
                                    <Sparkles size={14} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                                {dragActive ? 'Drop your image here' : 'Select an image'}
                            </h3>
                            <p className="text-slate-500 font-medium max-w-[240px] leading-relaxed">
                                Drag & drop or click to browse files from your computer
                            </p>

                            <div className="mt-8 flex items-center gap-6 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <span>JPG / PNG / WEBP</span>
                                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                <span>MAX 10MB</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="relative rounded-[2rem] overflow-hidden group shadow-xl border border-slate-200 bg-white"
                    >
                        {/* Ambient glow behind image */}
                        <div className="absolute inset-0 bg-indigo-500/10 blur-[40px] pointer-events-none"></div>
                        
                        <div className="relative aspect-video flex items-center justify-center p-4">
                            <img src={preview} alt="Preview" className="max-w-full max-h-full rounded-xl object-contain shadow-md z-10" />
                        </div>

                        {/* Top controls */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                            <button
                                onClick={clearSelection}
                                className="w-10 h-10 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white border border-slate-200 shadow-md backdrop-blur-md transition-all flex items-center justify-center"
                                title="Remove Image"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Bottom Info Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-3xl border-t border-slate-800 p-4 flex items-center justify-between z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400">
                                    <FileImage size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-white truncate max-w-[180px]">{selectedFile.name}</p>
                                    <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-widest">Ready to Enhance</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Size</p>
                                <p className="text-sm font-bold text-white">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageUploader;
