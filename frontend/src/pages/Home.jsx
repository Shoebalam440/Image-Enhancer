import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Image, Zap, Shield, Wand2 } from 'lucide-react';
import ImageComparison from '../components/ImageComparison';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
                            variants={itemVariants}
                        >
                            Enhance Your Images with{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                AI Precision
                            </span>
                        </motion.h1>
                        <motion.p
                            className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10"
                            variants={itemVariants}
                        >
                            Restore details, fix colors, and upscale resolutions instantly. The all-in-one AI photo editor for professionals and creators.
                        </motion.p>
                        <motion.div
                            className="flex justify-center gap-4"
                            variants={itemVariants}
                        >
                            <Link
                                to="/signup"
                                className="btn-primary flex items-center gap-2 text-lg px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-all"
                            >
                                Get Started Free <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/features"
                                className="px-8 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                            >
                                View Features
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image / Demo Placeholder */}
                    <motion.div
                        className="mt-20 relative mx-auto w-full max-w-5xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-800/50 aspect-video flex items-center justify-center relative group">
                            {/* Decorative Gradient Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                            <div className="relative z-10 w-full h-full">
                                <ImageComparison
                                    beforeImage="/images/demo-after.jpg"
                                    afterImage="/images/demo-after.jpg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Powerful Features</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to perfect your photos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap size={32} />, title: "Instant Enhancement", desc: "One-click fix for brightness, contrast, and color balance." },
                            { icon: <Wand2 size={32} />, title: "Magic Restoration", desc: "Bring old, damaged, or blurry photos back to life." },
                            { icon: <Shield size={32} />, title: "Privacy First", desc: "Your images are processed securely and never shared." }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
