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
                                ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_40px_rgba(79,70,229,0.1)]'
                                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
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
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                    dragActive ? 'bg-indigo-500 text-white scale-110 rotate-12' : 'bg-white/5 text-indigo-400 group-hover:scale-110 group-hover:rotate-6'
                                }`}>
                                    <Upload size={32} />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 animate-pulse">
                                    <Sparkles size={14} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                                {dragActive ? 'Drop your image here' : 'Select an image'}
                            </h3>
                            <p className="text-slate-400 font-medium max-w-[240px] leading-relaxed">
                                Drag & drop or click to browse files from your computer
                            </p>

                            <div className="mt-8 flex items-center gap-6 px-6 py-2 rounded-full glass-dark border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <span>JPG / PNG / WEBP</span>
                                <div className="w-1 h-1 rounded-full bg-white/20"></div>
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
                        className="relative rounded-[2rem] overflow-hidden group shadow-2xl border border-white/5 bg-[#0a0a0a]"
                    >
                        {/* Ambient glow behind image */}
                        <div className="absolute inset-0 bg-indigo-500/5 blur-[40px] pointer-events-none"></div>
                        
                        <div className="relative aspect-video flex items-center justify-center p-4">
                            <img src={preview} alt="Preview" className="max-w-full max-h-full rounded-xl object-contain shadow-2xl z-10" />
                        </div>

                        {/* Top controls */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                            <button
                                onClick={clearSelection}
                                className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 backdrop-blur-md transition-all flex items-center justify-center"
                                title="Remove Image"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Bottom Info Bar */}
                        <div className="absolute bottom-0 left-0 right-0 glass-dark border-t border-white/5 p-4 flex items-center justify-between z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400">
                                    <FileImage size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-white truncate max-w-[180px]">{selectedFile.name}</p>
                                    <p className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-widest">Ready to Enhance</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Size</p>
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
