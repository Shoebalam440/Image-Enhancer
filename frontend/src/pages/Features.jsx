import React from 'react';
import { Zap, Wand2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
    const features = [
        {
            icon: <Zap size={32} />,
            title: "Instant Enhancement",
            desc: "One-click fix for brightness, contrast, and color balance.",
            gradient: "from-amber-500 to-orange-500",
            bgGlow: "bg-amber-500/10"
        },
        {
            icon: <Wand2 size={32} />,
            title: "Magic Restoration",
            desc: "Bring old, damaged, or blurry photos back to life.",
            gradient: "from-violet-500 to-purple-500",
            bgGlow: "bg-violet-500/10"
        },
        {
            icon: <Shield size={32} />,
            title: "Privacy First",
            desc: "Your images are processed securely and never shared.",
            gradient: "from-emerald-500 to-teal-500",
            bgGlow: "bg-emerald-500/10"
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Powerful Features
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className="group relative p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden"
                        >
                            {/* Hover glow effect */}
                            <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
