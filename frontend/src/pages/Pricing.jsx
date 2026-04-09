import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
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
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                        Everything is Free
                    </h1>
                </div>

                {/* Single Free Plan Card */}
                <div className="relative p-10 rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 max-w-2xl mx-auto">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                        <span className="flex items-center gap-1"><Sparkles size={14} /> Free Forever</span>
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
            </div>
        </div>
    );
};

export default Pricing;
