import React from 'react';
import { Check, Sparkles, Zap, Image, Scissors, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const features = [
        "Unlimited Image Enhancements",
        "AI Image Upscaling (2x)",
        "Background Removal",
        "Old Photo Restoration",
        "High Quality Downloads",
        "Google Sign-In",
        "Cloud Storage via Cloudinary",
        "No Watermarks",
        "No Daily Limits",
        "No Hidden Fees — Ever"
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <Sparkles size={16} />
                        100% Free Forever
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Everything is Free
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        No subscriptions. No credit cards. No limits. Just powerful AI image tools, completely free.
                    </p>
                </div>

                {/* Single Free Plan Card */}
                <div className="relative p-10 rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 max-w-2xl mx-auto">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                        ✨ Free Forever
                    </div>

                    <div className="text-center mb-8">
                        <span className="text-6xl font-extrabold text-slate-900 dark:text-white">$0</span>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">No credit card required</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                    <Check className="text-emerald-500" size={14} />
                                </div>
                                <span className="text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/signup"
                        className="w-full py-4 rounded-xl font-bold text-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                    >
                        Get Started Free <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Tools Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                    {[
                        { icon: <Zap size={24} />, name: 'AI Enhance', color: 'from-indigo-500 to-purple-500' },
                        { icon: <Image size={24} />, name: 'Upscale 2x', color: 'from-emerald-500 to-teal-500' },
                        { icon: <Scissors size={24} />, name: 'Remove BG', color: 'from-purple-500 to-pink-500' },
                        { icon: <Sparkles size={24} />, name: 'Restore', color: 'from-orange-500 to-red-500' },
                    ].map((tool, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-sm">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} text-white flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                {tool.icon}
                            </div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{tool.name}</p>
                            <p className="text-xs text-emerald-500 font-medium mt-1">FREE</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
