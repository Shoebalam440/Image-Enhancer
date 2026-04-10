import React from 'react';
import { Book, Code, Terminal, FileText, Search, Zap, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Documentation = () => {
    const sections = [
        {
            title: "Getting Started",
            icon: <Book size={20} />,
            gradient: "from-indigo-500 to-purple-600",
            links: ["Introduction", "Quick Start Guide", "Installation", "Authentication"]
        },
        {
            title: "Core Concepts",
            icon: <FileText size={20} />,
            gradient: "from-emerald-400 to-teal-500",
            links: ["Image Uploading", "Enhancement Modes", "Processing Pipeline", "Download & Formats"]
        },
        {
            title: "API Reference",
            icon: <Code size={20} />,
            gradient: "from-pink-400 to-rose-500",
            links: ["REST API Overview", "Authentication endpoints", "Image processing endpoints", "Error Handling"]
        },
        {
            title: "CLI Tools",
            icon: <Terminal size={20} />,
            gradient: "from-amber-400 to-orange-500",
            links: ["CLI Installation", "Basic Commands", "Batch Processing", "Configuration"]
        }
    ];

    return (
        <div className="bg-[#FAFAFC] min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-40">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4"
                    >
                        Developer Portal
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8"
                    >
                        Learn & <span className="text-gradient-primary">Build</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-xl mx-auto font-medium mb-12"
                    >
                        Everything you need to integrate professional-grade AI image 
                        enhancement into your own workflow or application.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto relative group"
                    >
                        <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-hover:text-indigo-600 transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 transition-all font-medium shadow-sm"
                                placeholder="Search documentation, API endpoints, or CLI commands..."
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Grid Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {sections.map((section, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-premium group h-full flex flex-col"
                        >
                            <div className="glow-indigo"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white mb-6 shadow-xl shadow-${section.gradient.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                    {section.icon}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">{section.title}</h3>
                                <ul className="space-y-4 flex-1">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group/link font-bold">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/link:bg-indigo-500 group-hover/link:scale-150 transition-all"></div>
                                                <span className="text-sm tracking-wide">{link}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-600 transition-all group-hover:text-indigo-600">
                                        Explores Section <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pro Integration Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] border border-slate-200 shadow-[0_20px_60px_rgb(0,0,0,0.05)] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12"
                >
                    <div className="lg:w-1/2 space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap size={20} className="text-indigo-600" />
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Integrations</h2>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Need custom models or massive batch processing? Our enterprise tier 
                            offers dedicated GPU instances and custom SDKs tailored for your high-load infrastructure.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pb-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <ShieldCheck size={16} className="text-emerald-500" /> SLA Guaranteed
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <Cpu size={16} className="text-indigo-600" /> GPU Acceleration
                            </div>
                        </div>
                        <button className="btn-premium px-10 py-5 font-black uppercase tracking-widest text-xs">
                            Request SDK Access
                        </button>
                    </div>
                    
                    <div className="lg:w-1/2 w-full">
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 font-mono text-sm group overflow-hidden shadow-2xl relative">
                            {/* Decorative terminal header */}
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-indigo-400">curl <span className="text-slate-400">-X POST</span> https://api.alam.ai/v1/enhance</p>
                                <p className="text-slate-300">   -H <span className="text-emerald-300">"Authorization: Bearer YOUR_API_KEY"</span></p>
                                <p className="text-slate-300">   -F <span className="text-emerald-300">"image=@my-photo.jpg"</span></p>
                                <p className="text-slate-300">   -F <span className="text-emerald-300">"mode=ultra-hd"</span></p>
                                <p className="text-slate-500 mt-4">// Response</p>
                                <p className="text-slate-300">{"{"}</p>
                                <p className="text-slate-300">   <span className="text-indigo-300">"status"</span>: <span className="text-white">"processing"</span>,</p>
                                <p className="text-slate-300">   <span className="text-indigo-300">"process_id"</span>: <span className="text-white">"tx_8857091578"</span></p>
                                <p className="text-slate-300">{"}"}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Documentation;
