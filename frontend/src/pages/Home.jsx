import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Wand2, Shield, Check, Sparkles, Mail, MapPin, Phone } from 'lucide-react';
import ImageComparison from '../components/ImageComparison';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

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

    const pricingFeatures = [
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

    const contactInfo = [
        { icon: <Mail size={24} />, title: "Email Us", value: "shoebalam440@gmail.com", link: "mailto:shoebalam440@gmail.com", gradient: "from-indigo-500 to-purple-500" },
        { icon: <Phone size={24} />, title: "Call Us", value: "+91 8857091578", link: "tel:+918857091578", gradient: "from-emerald-500 to-teal-500" },
        { icon: <MapPin size={24} />, title: "Office", value: "Alam Villa, Mominpura, Nagpur, Maharashtra, India", link: null, gradient: "from-orange-500 to-red-500" }
    ];

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
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        className="mt-20 relative mx-auto w-full max-w-5xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-800/50 aspect-video flex items-center justify-center relative group">
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
            <section id="features" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Powerful Features</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.5 }}
                                className="group relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden"
                            >
                                <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Everything is Free</h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-10 rounded-3xl bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 max-w-2xl mx-auto"
                    >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                            <span className="flex items-center gap-1"><Sparkles size={14} /> Free Forever</span>
                        </div>

                        <div className="text-center mb-8">
                            <span className="text-6xl font-extrabold text-slate-900 dark:text-white">$0</span>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">No credit card required</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {pricingFeatures.map((feature, idx) => (
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
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                {info.link ? (
                                    <a href={info.link} className="block group">
                                        <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 text-center h-full">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                                {info.icon}
                                            </div>
                                            <p className="font-bold text-slate-900 dark:text-white mb-2">{info.title}</p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">{info.value}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center h-full">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mx-auto mb-5 shadow-lg`}>
                                            {info.icon}
                                        </div>
                                        <p className="font-bold text-slate-900 dark:text-white mb-2">{info.title}</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{info.value}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
