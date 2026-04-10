import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ImageUploader from '../components/ImageUploader';
import ImageComparison from '../components/ImageComparison';
import { 
    Download, 
    Wand2, 
    RefreshCw, 
    AlertCircle, 
    ArrowLeft, 
    Scissors, 
    Sparkles, 
    History,
    Zap,
    Maximize,
    Save,
    Share2,
    Settings2,
    Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Handle file passed from navigation
    useEffect(() => {
        if (location.state?.file) {
            const selectedFile = location.state.file;
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    }, [location.state]);

    const modeConfig = {
        enhance: { 
            title: 'Neural Enhancer', 
            desc: 'Automated high-fidelity restoration and color balancing.', 
            icon: <Wand2 size={20} />, 
            loadingText: 'De-noise and detailing in progress...', 
            buttonText: 'Process Enhancement',
            gradient: 'from-indigo-500 to-purple-600'
        },
        upscale: { 
            title: '4K Upscaler', 
            desc: 'Super-resolution AI that scales up to 400% naturally.', 
            icon: <Maximize size={20} />, 
            loadingText: 'Recalculating pixel density...', 
            buttonText: 'Start Upscaling',
            gradient: 'from-emerald-500 to-teal-600'
        },
        'remove-bg': { 
            title: 'BG Remover', 
            desc: 'Instant foreground extraction with edge obsession.', 
            icon: <Scissors size={20} />, 
            loadingText: 'Detecting edge boundaries...', 
            buttonText: 'Isolate Subject',
            gradient: 'from-pink-500 to-rose-600'
        },
        restore: { 
            title: 'Magic Restoration', 
            desc: 'Time-travel for your photos. Fix grains, cracks, and fades.', 
            icon: <Sparkles size={20} />, 
            loadingText: 'Healing historical data...', 
            buttonText: 'Heal Image',
            gradient: 'from-amber-500 to-orange-600'
        },
    };

    const config = modeConfig[mode] || modeConfig.enhance;

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
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
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data.url;
        } catch (err) {
            throw new Error('Image upload failed');
        }
    };

    const handleProcess = async () => {
        if (!file) return;
        setIsProcessing(true);
        setProgress(10);
        setError(null);

        try {
            let currentUploadedUrl = uploadedUrl;
            if (!currentUploadedUrl) {
                currentUploadedUrl = await uploadImage();
                setUploadedUrl(currentUploadedUrl);
                setProgress(30);
            }

            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) return 95;
                    return prev + (Math.random() * 3);
                });
            }, 600);

            const { data } = await client.post('/images/process', {
                imageUrl: currentUploadedUrl,
                type: mode,
            });

            clearInterval(progressInterval);
            setProgress(100);
            setTimeout(() => setProcessedUrl(data.enhancedUrl), 300);
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
            link.download = `alam-enhanced-${mode}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            window.open(processedUrl, '_blank');
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Editor Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="p-3 rounded-2xl glass-dark border border-white/5 text-slate-400 hover:text-white transition-all shadow-xl">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className={`p-1.5 rounded-lg bg-gradient-to-br ${config.gradient} text-white shadow-lg`}>
                                    {config.icon}
                                </span>
                                <h1 className="text-2xl font-black text-white px-1 tracking-tight">{config.title}</h1>
                            </div>
                            <p className="text-sm font-medium text-slate-500 ml-1 tracking-wide">{config.desc}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-3 rounded-xl glass-dark border border-white/5 text-slate-400 hover:text-white transition-all" title="Help">
                            <Info size={18} />
                        </button>
                        <button className="p-3 rounded-xl glass-dark border border-white/5 text-slate-400 hover:text-white transition-all" title="History">
                            <History size={18} />
                        </button>
                    </div>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 font-bold"
                    >
                        <AlertCircle size={20} />
                        {error}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
                    {/* Main Workspace */}
                    <div className="lg:col-span-3 min-h-[500px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {!previewUrl ? (
                                <motion.div 
                                    key="upload"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="flex-1"
                                >
                                    <ImageUploader onImageSelect={handleImageSelect} />
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="preview"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 relative"
                                >
                                    {processedUrl ? (
                                        <ImageComparison beforeImage={previewUrl} afterImage={processedUrl} />
                                    ) : (
                                        <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden glass-dark border border-white/5 bg-[#0a0a0a] flex items-center justify-center p-4 shadow-2xl">
                                            <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain rounded-xl opacity-60 grayscale-[0.3]" />
                                            
                                            {isProcessing ? (
                                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl">
                                                    <div className="relative mb-8">
                                                        <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center">
                                                            <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                                                        </div>
                                                        <div className="absolute inset-0 blur-2xl bg-indigo-500/20 rounded-full animate-pulse"></div>
                                                    </div>
                                                    
                                                    <div className="text-center space-y-3">
                                                        <h3 className="text-2xl font-black text-white tracking-widest uppercase">{Math.round(progress)}%</h3>
                                                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">{config.loadingText}</p>
                                                    </div>

                                                    {/* Progress Bar Container */}
                                                    <div className="mt-10 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)]"
                                                            animate={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <div className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg text-white font-bold text-xs uppercase tracking-widest">
                                                        Preview Layer Active
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Tool Sidebar */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-dark border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-2xl sticky top-24"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Settings2 size={18} className="text-indigo-500" />
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Model Settings</h3>
                                </div>

                                {/* Mode Specific Settings Placeholder */}
                                <div className="space-y-6">
                                    {mode === 'upscale' && (
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Output Resolution</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['2x', '4x', 'Pro'].map((val) => (
                                                    <button key={val} className={`py-2.5 rounded-xl border text-[11px] font-black tracking-widest transition-all ${val === 'Pro' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'border-white/5 text-slate-500 hover:text-white hover:bg-white/5'}`}>
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
                                        <div className="flex items-center gap-2 text-indigo-400">
                                            <Zap size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">AI Profile</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                            Current model uses <strong>V5 Neural Engines</strong> for high-pass detailing and noise reduction at scale.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                {!processedUrl ? (
                                    <button
                                        onClick={handleProcess}
                                        disabled={!file || isProcessing}
                                        className="btn-premium w-full py-5 rounded-[1.25rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-30 group"
                                    >
                                        {isProcessing ? 'Processing...' : config.buttonText}
                                        {!isProcessing && <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />}
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleDownload}
                                            className="w-full bg-white text-black py-5 rounded-[1.25rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-200 transition-all shadow-xl"
                                        >
                                            <Download size={20} /> Export Final HD
                                        </button>
                                        <button
                                            onClick={() => { setProcessedUrl(null); setFile(null); setPreviewUrl(null); }}
                                            className="w-full py-4 rounded-[1.25rem] border border-white/10 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw size={14} /> New Project
                                        </button>
                                    </div>
                                )}
                                
                                <div className="flex items-center justify-center gap-4 pt-4">
                                    <button className="text-slate-500 hover:text-white transition-colors"><Share2 size={18} /></button>
                                    <button className="text-slate-500 hover:text-white transition-colors"><Save size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Editor;
