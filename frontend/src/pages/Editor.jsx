import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ImageUploader from '../components/ImageUploader';
import ImageComparison from '../components/ImageComparison';
import { Download, Wand2, RefreshCw, AlertCircle, ArrowLeft, Scissors, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../contexts/AuthContext';

const Editor = ({ mode = 'enhance' }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if not logged in
    useEffect(() => {
        if (!user && !localStorage.getItem('user')) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Handle file passed from navigation (e.g. Quick Enhancer)
    useEffect(() => {
        if (location.state?.file) {
            const selectedFile = location.state.file;
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            // Clear state so it doesn't persist on refresh if not desired, 
            // but for now keeping it simple.
        }
    }, [location.state]);

    // Determine title/description based on mode
    const modeConfig = {
        enhance: { title: 'AI Image Enhancer', desc: 'Improve clarity and resolution automatically.', icon: <Wand2 />, loadingText: 'Enhancing your image...', buttonText: 'Start Enhancing' },
        upscale: { title: 'Image Upscaler', desc: 'Increase resolution up to 4x without losing quality.', icon: <RefreshCw />, loadingText: 'Upscaling your image...', buttonText: 'Start Upscaling' },
        'remove-bg': { title: 'Background Remover', desc: 'Instantly remove image backgrounds.', icon: <Scissors />, loadingText: 'Removing background...', buttonText: 'Remove Background' },
        restore: { title: 'Old Photo Restoration', desc: 'Restore damaged and faded photos.', icon: <Sparkles />, loadingText: 'Restoring your photo...', buttonText: 'Start Restoration' },
    };

    const config = modeConfig[mode] || modeConfig.enhance;

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null); // URL from backend after upload
    const [processedUrl, setProcessedUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleImageSelect = (selectedFile, url) => {
        setFile(selectedFile);
        setPreviewUrl(url);
        setUploadedUrl(null);
        setProcessedUrl(null);
        setError(null);
    };

    const uploadImage = async () => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await client.post('/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data.url;
        } catch (err) {
            console.error(err);
            throw new Error('Image upload failed');
        }
    };

    const handleProcess = async () => {
        if (!file) return;

        setIsProcessing(true);
        setProgress(10);
        setError(null);

        try {
            // 1. Upload Image logic (if not already uploaded)
            let currentUploadedUrl = uploadedUrl;
            if (!currentUploadedUrl) {
                currentUploadedUrl = await uploadImage();
                setUploadedUrl(currentUploadedUrl);
                setProgress(30);
            }

            // 2. Process Image
            // Artificial progress for better UX since we don't have real-time socket progress
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return 90;
                    return prev + 5;
                });
            }, 500);

            const { data } = await client.post('/images/process', {
                imageUrl: currentUploadedUrl,
                type: mode,
            });

            clearInterval(progressInterval);
            setProgress(100);

            setProcessedUrl(data.enhancedUrl);
        } catch (err) {
            setError(err.message || 'Processing failed. Please try again.');
            setProgress(0);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = async () => {
        if (!processedUrl) return;

        try {
            const response = await fetch(processedUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `enhanced-${mode}-${Date.now()}.jpg`; // standardized extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            // Fallback to opening in new tab if blob fetch fails
            window.open(processedUrl, '_blank');
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            {config.icon} {config.title}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">{config.desc}</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {!previewUrl ? (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 min-h-[400px] flex flex-col justify-center">
                                <ImageUploader onImageSelect={handleImageSelect} />
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                                {processedUrl ? (
                                    <ImageComparison beforeImage={previewUrl} afterImage={processedUrl} />
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
                                        <img src={previewUrl} alt="Original" className="w-full h-full object-contain" />
                                        {isProcessing && (
                                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                                <p className="font-medium text-lg">{config.loadingText}</p>
                                                <p className="text-sm opacity-80">{progress}% complete</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Controls */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Settings</h3>

                            {/* Generic controls based on mode */}
                            <div className="space-y-4 mb-8">
                                {mode === 'upscale' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Scale Factor</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['2x', '4x', '8x'].map((scale) => (
                                                <button key={scale} className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm hover:border-indigo-500 hover:text-indigo-500 transition-colors">
                                                    {scale}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                    <p className="text-sm text-indigo-800 dark:text-indigo-300">
                                        <strong>Pro Tip:</strong> For best results, use images with good lighting.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mt-auto">
                                {!processedUrl ? (
                                    <button
                                        onClick={handleProcess}
                                        disabled={!file || isProcessing}
                                        className="w-full btn-primary py-3 rounded-lg font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? 'Processing...' : config.buttonText}
                                        {!isProcessing && <Wand2 size={18} />}
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleDownload}
                                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Download size={18} /> Download HD
                                        </button>
                                        <button
                                            onClick={() => { setProcessedUrl(null); setFile(null); setPreviewUrl(null); setUploadedUrl(null); }}
                                            className="w-full border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-3 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            Upload New Image
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Editor;
