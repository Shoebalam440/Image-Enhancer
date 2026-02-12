import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const ImageComparison = ({ beforeImage, afterImage, aspect = '16/9' }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        setSliderPosition(percentage);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        setSliderPosition(percentage);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div
            className="relative w-full rounded-xl overflow-hidden cursor-ew-resize select-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ aspectRatio: aspect }}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none z-10">After</div>

            {/* Before Image (Clipped on top) */}
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-contain custom-object-fit"
                    style={{ width: '100vw', maxWidth: 'unset' }} // Trick to keep image scaled to container width even when clipped
                />
                {/* We need a better way to handle the clipped image scaling. 
            Actually, commonly used technique is setting the image width to the container's full width 
            but it's inside a container with limited width. 
            Let's adjust.
        */}
            </div>
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none border-r-2 border-white/50"
                style={{ width: `${sliderPosition}%` }}
            >
                {/* Re-rendering image strictly for clipping purposes */}
                {/* The previous approach with object-contain is tricky for clipping. 
                 Standard approach: Use background images or strictly sized images. 
                 Let's assume images are same size/ratio.
             */}
                <div className="w-full h-full relative">
                    <img
                        src={beforeImage}
                        alt="Before"
                        className="absolute top-0 left-0 h-full object-contain pointer-events-none"
                        // The width needs to match the parent container width
                        style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
                    />
                </div>
                <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none z-10">Before</div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center -ml-0.5 shadow-lg"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-md">
                    <ChevronsLeftRight size={16} />
                </div>
            </div>
        </div>
    );
};
// Fixing the clipping issue: The "Before" image needs to be the full width of the container, 
// but visible only up to X%.
// The simplest CSS way is:
// Parent: relative
// After Img: absolute w-full h-full
// Before Container: absolute top-0 left-0 h-full overflow-hidden, width={pct}%
// Before Img: absolute top-0 left-0 w-[containerWidth] h-full max-w-none!
// We can use a resize observer or just width: 100% of parent? No, 100% of parent is 100% of clipped container.
// We need width to be inverse of clip? No.
// Let's rely on standard practice: set Before Image width to the full container Width via ref or just 100vw/calc?
// Better: Use `clip-path`? 
// Let's try `clip-path` version which is cleaner.

const ImageComparisonV2 = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleStart = () => setIsDragging(true);
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
            className="relative w-full h-[500px] overflow-hidden rounded-xl cursor-ew-resize select-none bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none" draggable="false" />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none z-10">After</div>

            <img
                src={beforeImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable="false"
                style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                    filter: 'blur(3px) grayscale(50%)' // Simulate low quality "Before" version
                }}
            />
            <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none z-10">Before</div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600">
                    <ChevronsLeftRight size={16} />
                </div>
            </div>
        </div>
    )
}

export default ImageComparisonV2;
