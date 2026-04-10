import React from 'react';
import { Users, MessageCircle, Github, Twitter, Heart, Sparkles, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Community = () => {
    return (
        <div className="bg-[#050505] min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-600/5 rounded-full blur-[140px]"></div>
                <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4"
                    >
                        Join the Movement
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
                    >
                        Our <span className="text-gradient-primary">Community</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        Connect with 50,000+ creators, developers, and AI enthusiasts. 
                        Share your results, get priority support, and help shape the future of imaging.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            icon: <MessageCircle size={28} />,
                            title: "Discord HQ",
                            desc: "Real-time chat with the dev team. Join voice channels for live community editing sessions.",
                            link: "Join Discord",
                            color: "from-blue-500 to-indigo-600",
                            glow: "indigo"
                        },
                        {
                            icon: <Github size={28} />,
                            title: "Open Source",
                            desc: "Explore our models, contribute to the SDK, or report issues directly to our engineering core.",
                            link: "Star on GitHub",
                            color: "from-slate-600 to-slate-800",
                            glow: "slate"
                        },
                        {
                            icon: <Twitter size={28} />,
                            title: "Latest Drops",
                            desc: "The fastest way to hear about new model releases, beta features, and community showcases.",
                            link: "Follow @AlamEnhancer",
                            color: "from-sky-400 to-blue-500",
                            glow: "sky"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-premium group"
                        >
                            <div className="glow-indigo"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-slate-400 font-medium text-sm mb-8 leading-relaxed">
                                    {item.desc}
                                </p>
                                <button className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                                    {item.link} <Sparkles size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Big Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative glass-dark rounded-[3rem] border border-white/5 p-12 md:p-24 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 text-center md:text-left">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
                                <Heart size={14} fill="currentColor" /> Community Driven
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                                Empowering Creative <span className="text-gradient-primary">Freedom</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                                We are building an open ecosystem for AI image perfection. 
                                Our mission is to make visual excellence accessible to every 
                                creator on the planet, regardless of their hardware.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <Link to="/signup" className="btn-premium px-10 py-5 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                    Join the Beta <Zap size={16} fill="currentColor" />
                                </Link>
                                <button className="px-10 py-5 rounded-2xl glass-dark border border-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-white/5 flex items-center gap-2">
                                    View Roadmap <Globe size={16} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
                                <div className="relative w-48 h-48 rounded-full border-2 border-white/10 flex items-center justify-center p-4 backdrop-blur-3xl shadow-2xl">
                                    <Heart size={80} className="text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Community;
