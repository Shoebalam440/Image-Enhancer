import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Wand2 } from 'lucide-react';
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
        <div className="bg-[#050505] min-h-screen selection:bg-indigo-500/30 overflow-hidden">
            {/* Background Decorations */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div 
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-8 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            New: Real-time Upscaling 4.0
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8"
                            variants={itemVariants}
                        >
                            Transform Pixels into <br />
                            <span className="text-gradient-primary">
                                Digital Masterpieces
                            </span>
                        </motion.h1>
                        
                        <motion.p
                            className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium"
                            variants={itemVariants}
                        >
                            The most advanced AI image enhancement orchestrator. 
                            Restore legacy media, upscale to 8K, and perfect details with cinematic precision.
                        </motion.p>
                        
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            variants={itemVariants}
                        >
                            <Link
                                to="/signup"
                                className="btn-premium flex items-center justify-center gap-2 text-lg"
                            >
                                Start Enhancing <ArrowRight size={20} />
                            </Link>
                            <a
                                href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn-glass flex items-center justify-center"
                            >
                                Explorer Features
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image / Demo Showcase */}
                    <motion.div
                        className="mt-24 relative mx-auto w-full max-w-5xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    >
                        <div className="relative p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-3xl">
                            <div className="rounded-[1.75rem] overflow-hidden bg-slate-900 aspect-video flex items-center justify-center relative shadow-2xl">
                                <ImageComparison
                                    beforeImage="/images/demo-after.jpg"
                                    afterImage="/images/demo-after.jpg"
                                />
                                {/* Overlay UI elements to make it feel techy */}
                                <div className="absolute top-4 left-4 glass p-3 rounded-xl hidden md:block">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Processing...</span>
                                    </div>
                                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-indigo-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Preview Section */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4">Core Technology</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Unrivaled Processing Power</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap size={28} />, title: "Hyper-Speed", desc: "Proprietary neural engines process images in milliseconds, not minutes.", gradient: "from-amber-400 to-orange-500" },
                            { icon: <Wand2 size={28} />, title: "Neural Restore", desc: "Advanced artifact removal that understands context and lighting.", gradient: "from-indigo-400 to-purple-600" },
                            { icon: <Shield size={28} />, title: "Secure Vault", desc: "Military-grade encryption for your creative intellectual property.", gradient: "from-emerald-400 to-teal-600" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="card-premium group"
                            >
                                <div className="glow-indigo"></div>
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-500/20`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
