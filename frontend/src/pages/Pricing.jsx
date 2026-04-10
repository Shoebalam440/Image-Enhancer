import React from 'react';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <div className="bg-[#050505] min-h-screen relative overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4"
                    >
                        Simple Pricing
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4"
                    >
                        Everything is Free
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg font-medium"
                    >
                        No hidden fees. No credit card. No catch.
                    </motion.p>
                </div>

                {/* Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="relative"
                >
                    {/* Glowing border */}
                    <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-transparent blur-sm"></div>

                    <div className="relative glass-dark rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                        {/* Badge */}
                        <div className="flex justify-center pt-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
                                <Sparkles size={14} />
                                Free Forever
                            </div>
                        </div>

                        <div className="p-10">
                            {/* Price */}
                            <div className="text-center mb-10">
                                <div className="flex items-end justify-center gap-2">
                                    <span className="text-7xl font-black text-white">$0</span>
                                    <span className="text-slate-500 text-lg mb-3 font-medium">/month</span>
                                </div>
                                <p className="text-slate-500 mt-2 font-medium">No credit card required</p>
                            </div>

                            {/* Features grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                                            <Check className="text-indigo-400" size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-300 text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Link
                                to="/signup"
                                className="btn-premium w-full py-4 flex items-center justify-center gap-3 text-lg font-bold"
                            >
                                <Zap size={20} />
                                Get Started Free
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Pricing;
