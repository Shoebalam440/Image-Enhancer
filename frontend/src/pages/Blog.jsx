import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Introducing AI-Powered Image Upscaling",
            excerpt: "Learn how our new generative AI technology can upscale images up to 4x without losing quality.",
            author: "Sarah Johnson",
            date: "October 15, 2023",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Top 5 Tips for Restoring Old Photographs",
            excerpt: "Discover the best practices for scanning and restoring your cherished family memories using digital tools.",
            author: "Michael Chen",
            date: "September 28, 2023",
            category: "Tutorials",
            image: "https://images.unsplash.com/photo-1531346878377-a513bc95f30f?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Understanding Color Correction in Photography",
            excerpt: "A deep dive into color theory and how automated color correction can save you hours of editing time.",
            author: "Emily Davis",
            date: "September 10, 2023",
            category: "Photography",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Our Blog
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Latest news, tutorials, and updates from the AlamEnhancer team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700 flex flex-col">
                            <div className="h-48 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                        <User size={14} />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
