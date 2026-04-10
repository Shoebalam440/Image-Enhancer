import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ImageUploader from '../components/ImageUploader';
import { motion } from 'framer-motion';
import { 
    Wand2, 
    ImageIcon, 
    Scissors, 
    Sparkles, 
    ArrowRight, 
    Zap, 
    Clock, 
    TrendingUp, 
    Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (file) => {
        setSelectedImage(file);
    };

    const handleQuickEnhance = () => {
        if (selectedImage) {
            navigate('/dashboard/enhance', { state: { file: selectedImage } });
        }
    };

    const tools = [
        { 
            name: 'AI Image Enhancer', 
            icon: <Wand2 size={24} />, 
            path: '/dashboard/enhance', 
            gradient: 'from-indigo-500 to-purple-600', 
            desc: 'Improve clarity, resolution & color balance instantly.' 
        },
        { 
            name: 'Background Remover', 
            icon: <Scissors size={24} />, 
            path: '/dashboard/remove-bg', 
            gradient: 'from-pink-500 to-rose-500', 
            desc: 'Get transparent backgrounds with pixel-perfect AI.' 
        },
        { 
            name: 'Image Upscaler', 
            icon: <ImageIcon size={24} />, 
            path: '/dashboard/upscale', 
            gradient: 'from-emerald-400 to-teal-500', 
            desc: 'Upscale to 4k and 8k without losing a single pixel.' 
        },
        { 
            name: 'Photo Restoration', 
            icon: <Sparkles size={24} />, 
            path: '/dashboard/restore', 
            gradient: 'from-amber-400 to-orange-500', 
            desc: 'Fix scratched, faded and blurry historic photographs.' 
        },
    ];

    const stats = [
        { label: 'Credits Remaining', value: 'Unlimited', icon: <Zap size={16} className="text-amber-500" /> },
        { label: 'Images Enhanced', value: '124', icon: <TrendingUp size={16} className="text-emerald-500" /> },
        { label: 'Average Time', value: '1.2s', icon: <Clock size={16} className="text-indigo-600" /> },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-black text-slate-900 tracking-tight mb-2"
                        >
                            Welcome back, <span className="text-gradient-primary">{user?.name?.split(' ')[0] || 'Creator'}</span>!
                        </motion.h1>
                        <p className="text-slate-500 font-medium tracking-wide">
                            Your creative suite is ready. What's the plan for today?
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm">
                                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-sm font-bold text-slate-900 leading-none">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Upload Box */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 relative"
                    >
                        <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-sm pointer-events-none"></div>
                        <div className="relative bg-white rounded-[2.5rem] border border-slate-200 p-8 h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                        <Plus size={20} />
                                    </div>
                                    New Project
                                </h2>
                                {selectedImage && (
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                                    >
                                        Clear Selection
                                    </button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <ImageUploader onImageSelect={handleImageSelect} />
                                
                                {selectedImage && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex justify-end pt-4"
                                    >
                                        <button
                                            onClick={handleQuickEnhance}
                                            className="btn-premium flex items-center gap-3 px-8 py-4 text-lg font-bold group"
                                        >
                                            <Zap size={22} className="group-hover:fill-current transition-all" />
                                            Boost Selected Image
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Tools Side Panel */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] px-2">Magic Tools</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {tools.map((tool, idx) => (
                                <motion.div
                                    key={tool.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.05) }}
                                >
                                    <Link
                                        to={tool.path}
                                        className="group block relative"
                                    >
                                        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 transition-all group-hover:bg-slate-50 group-hover:border-slate-300 group-hover:translate-x-2 group-hover:shadow-md">
                                            <div className="flex gap-5">
                                                <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                                    {tool.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                                        {tool.name}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                                        {tool.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
