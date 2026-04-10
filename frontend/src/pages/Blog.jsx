import React from 'react';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Introducing AI-Powered Image Upscaling",
            excerpt: "Learn how our new generative AI technology can upscale images up to 4x without losing quality.",
            author: "Sarah Johnson",
            date: "Oct 15, 2023",
            category: "Technology",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Top 5 Tips for Restoring Old Photographs",
            excerpt: "Discover the best practices for scanning and restoring your cherished family memories using digital tools.",
            author: "Michael Chen",
            date: "Sep 28, 2023",
            category: "Tutorials",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1531346878377-a513bc95f30f?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Understanding Color Correction in Photography",
            excerpt: "A deep dive into color theory and how automated color correction can save you hours of editing time.",
            author: "Emily Davis",
            date: "Sep 10, 2023",
            category: "Photography",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="bg-[#FAFAFC] min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-4"
                    >
                        Inside AlamEnhancer
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6"
                    >
                        Our <span className="text-gradient-primary">Insights</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Stay updated with the latest in AI photography, digital restoration, 
                        and product updates from our engineering team.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-premium group flex flex-col"
                        >
                            <div className="glow-indigo"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="h-56 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-[1.5rem] border-b border-slate-100">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[10px] font-black text-slate-800 uppercase tracking-widest shadow-sm">
                                        {post.category}
                                    </div>
                                </div>
                                
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-indigo-600" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-purple-600" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-sm mb-8 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                                                <User size={14} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-700">{post.author}</span>
                                        </div>
                                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Newsletter Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-slate-200 p-10 md:p-16 text-center relative overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.05)]"
                >
                    <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-[80px]"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-black text-indigo-600 uppercase tracking-widest mb-6 shadow-sm">
                            <BookOpen size={14} /> Subscribe to AlamNews
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Stay Ahead of the Curve</h2>
                        <p className="text-slate-500 font-medium max-w-xl mx-auto mb-10">
                            Join 50,000+ creators and engineers receiving our monthly breakdown of 
                            emerging AI photography trends.
                        </p>
                        
                        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                            <input 
                                className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 transition-all font-medium" 
                                placeholder="Enter your email" 
                            />
                            <button className="btn-premium px-8 py-4 font-black uppercase tracking-widest text-xs">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
