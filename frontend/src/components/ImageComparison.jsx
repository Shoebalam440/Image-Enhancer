import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageComparison = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleStart = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleEnd = () => setIsDragging(false);

    const handleMove = (clientX) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    useEffect(() => {
        const onMouseUp = () => setIsDragging(false);
        const onMouseMove = (e) => handleMove(e.clientX);
        const onTouchMove = (e) => handleMove(e.touches[0].clientX);

        if (isDragging) {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('touchmove', onTouchMove);
        }
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video overflow-hidden rounded-[2rem] cursor-ew-resize select-none bg-slate-50 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            {/* After Image (Full Background) */}
            <img 
                src={afterImage} 
                alt="After" 
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none" 
                draggable="false" 
            />
            
            {/* After Badge */}
            <div className="absolute bottom-6 right-6 z-10">
                <div className="glass-light px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-slate-200">
                    <Sparkles size={14} className="text-indigo-600" />
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Enhanced Result</span>
                </div>
            </div>

            {/* Before Image (Clipped / Top) */}
            <div 
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none brightness-95 saturate-[0.9]"
                    draggable="false"
                />
                
                {/* Before Badge */}
                <div className="absolute bottom-6 left-6 z-10">
                    <div className="bg-white/90 border border-slate-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm backdrop-blur-md">
                        <ImageIcon size={14} className="text-slate-500" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Original Image</span>
                    </div>
                </div>
            </div>

            {/* Slider Line & Handle */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/0 via-indigo-500 to-indigo-500/0 z-20 pointer-events-none shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                    {/* Glowing handle */}
                    <div className="relative group-active:scale-90 transition-transform duration-300">
                        <div className="absolute inset-0 bg-indigo-500 blur-md opacity-30 animate-pulse"></div>
                        <div className="relative w-12 h-12 bg-white border border-slate-200 rounded-2xl shadow-lg flex items-center justify-center text-indigo-600">
                            <ChevronsLeftRight size={20} className="animate-bounce-x" />
                        </div>
                    </div>
                    
                    {/* Helper text overlaying the Handle */}
                    <AnimatePresence>
                        {isDragging && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[10px] font-black text-indigo-600 uppercase tracking-widest whitespace-nowrap shadow-md"
                            >
                                Compare Strength
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Hint Overlay (visible initially) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500"
            >
                <div className="px-6 py-3 rounded-full bg-white/90 shadow-lg backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    </div>
                    Slide to compare
                </div>
            </motion.div>
        </div>
    );
};

export default ImageComparison;
