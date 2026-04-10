import React from 'react';
import { Zap, Wand2, Shield, Image, Scissors, Sparkles, SlidersHorizontal, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
    const features = [
        {
            icon: <Wand2 size={28} />,
            title: "AI Enhancement",
            desc: "One-click fix for brightness, contrast, sharpness, and color balance. Powered by deep learning.",
            gradient: "from-indigo-400 to-purple-600",
        },
        {
            icon: <Image size={28} />,
            title: "4x Upscaling",
            desc: "Increase image resolution up to 4x without losing quality using our super-resolution model.",
            gradient: "from-amber-400 to-orange-500",
        },
        {
            icon: <Scissors size={28} />,
            title: "Background Removal",
            desc: "Remove any background from your image in one click with pixel-perfect accuracy.",
            gradient: "from-pink-500 to-rose-500",
        },
        {
            icon: <Sparkles size={28} />,
            title: "Photo Restoration",
            desc: "Bring old, faded, and damaged photos back to their original glory using AI.",
            gradient: "from-violet-500 to-purple-500",
        },
        {
            icon: <SlidersHorizontal size={28} />,
            title: "Real-time Preview",
            desc: "See every change as it happens with our instant before/after comparison slider.",
            gradient: "from-emerald-400 to-teal-600",
        },
        {
            icon: <Lock size={28} />,
            title: "Privacy First",
            desc: "Your images are processed securely. We never store or share your photos.",
            gradient: "from-cyan-400 to-blue-500",
        },
    ];

    return (
        <div className="bg-[#050505] min-h-screen relative overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/15 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4"
                    >
                        What We Offer
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6"
                    >
                        Powerful Features
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-xl mx-auto font-medium"
                    >
                        Everything you need to transform your images with professional-grade AI tools.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="card-premium group"
                        >
                            <div className="glow-indigo"></div>
                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-xl`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium text-sm">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
