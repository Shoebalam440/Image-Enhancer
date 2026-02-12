import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ImageUploader from '../components/ImageUploader';
import { Wand2, ImageIcon, Scissors, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (file) => {
        setSelectedImage(file);
    };

    const handleQuickEnhance = () => {
        if (selectedImage) {
            // Navigate to enhance editor with state
            navigate('/dashboard/enhance', { state: { file: selectedImage } });
        }
    };
    const tools = [
        { name: 'AI Image Enhancer', icon: <Wand2 size={24} />, path: '/dashboard/enhance', color: 'bg-indigo-500', desc: 'Improve clarity and resolution' },
        { name: 'Background Remover', icon: <Scissors size={24} />, path: '/dashboard/remove-bg', color: 'bg-purple-500', desc: 'Transparent background in 1 click' },
        { name: 'Image Upscaler', icon: <ImageIcon size={24} />, path: '/dashboard/upscale', color: 'bg-emerald-500', desc: 'Upscale to 2x, 4x, 8x' },
        { name: 'Old Photo Restoration', icon: <Sparkles size={24} />, path: '/dashboard/restore', color: 'bg-orange-500', desc: 'Restore faded & damaged photos' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Welcome back! What would you like to create today?</p>

                {/* Quick Upload Area */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-10">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quick Enhancer</h2>
                    <ImageUploader onImageSelect={handleImageSelect} />

                    {selectedImage && (
                        <div className="mt-4 flex justify-end animate-fade-in">
                            <button
                                onClick={handleQuickEnhance}
                                className="btn-primary py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-500/30"
                            >
                                <Zap size={20} />
                                Start Enhancing
                            </button>
                        </div>
                    )}
                </div>

                {/* Tools Grid */}
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">All Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.name}
                            to={tool.path}
                            className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-lg ${tool.color} text-white flex items-center justify-center mb-4 shadow-lg shadow-${tool.color.replace('bg-', '')}/30`}>
                                {tool.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {tool.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10">
                                {tool.desc}
                            </p>
                            <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                                Try now <ArrowRight size={16} className="ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
