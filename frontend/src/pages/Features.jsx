import React from 'react';
import { Zap, Wand2, Shield, Image, Sliders, Monitor } from 'lucide-react';

const Features = () => {
    const features = [
        { icon: <Zap size={32} />, title: "Instant Enhancement", desc: "One-click fix for brightness, contrast, and color balance." },
        { icon: <Wand2 size={32} />, title: "Magic Restoration", desc: "Bring old, damaged, or blurry photos back to life." },
        { icon: <Shield size={32} />, title: "Privacy First", desc: "Your images are processed securely and never shared." },
        { icon: <Image size={32} />, title: "High Resolution", desc: "Upscale your images up to 4x without losing quality." },
        { icon: <Sliders size={32} />, title: "Precise Control", desc: "Fine-tune the results with advanced settings." },
        { icon: <Monitor size={32} />, title: "Cross Platform", desc: "Access your dashboard from any device, anywhere." }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Powerful Features
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Discover what AlamEnhancer can do for your photos. From simple fixes to complex restorations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
                            <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
