import React from 'react';
import { Users, MessageCircle, Github, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Join the Community
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Connect with other developers, designers, and image enthusiasts. Share your work, get help, and contribute.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:border-indigo-500 transition-colors cursor-pointer group">
                        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Discord Server</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Chat live with the team and community. Ask questions, share feedback, and hang out.
                        </p>
                        <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Join Discord &rarr;</button>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:border-indigo-500 transition-colors cursor-pointer group">
                        <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Github size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">GitHub</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Explore the source code, request features, report bugs, and contribute to the project.
                        </p>
                        <button className="text-slate-900 dark:text-white font-bold hover:underline">Star on GitHub &rarr;</button>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:border-indigo-500 transition-colors cursor-pointer group">
                        <div className="mx-auto w-16 h-16 bg-sky-100 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Twitter size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Twitter / X</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Follow us for the latest news, updates, and featured community creations.
                        </p>
                        <button className="text-sky-500 dark:text-sky-400 font-bold hover:underline">Follow Us &rarr;</button>
                    </div>
                </div>

                <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <Heart size={48} className="mx-auto mb-6 text-pink-300 animate-pulse" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Empowering Creators Everywhere</h2>
                        <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
                            We are building an open ecosystem for AI image enhancement. Join us on this journey to make visual perfection accessible to everyone.
                        </p>
                        <Link to="/signup" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors">
                            Become a Member
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
