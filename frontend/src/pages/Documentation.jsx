import React from 'react';
import { Book, Code, Terminal, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
    const sections = [
        {
            title: "Getting Started",
            icon: <Book size={24} />,
            links: ["Introduction", "Quick Start Guide", "Installation", "Authentication"]
        },
        {
            title: "Core Concepts",
            icon: <FileText size={24} />,
            links: ["Image Uploading", "Enhancement Modes", "Processing Pipeline", "Download & Formats"]
        },
        {
            title: "API Reference",
            icon: <Code size={24} />,
            links: ["REST API Overview", "Authentication endpoints", "Image processing endpoints", "Error Handling"]
        },
        {
            title: "CLI Tools",
            icon: <Terminal size={24} />,
            links: ["CLI Installation", "Basic Commands", "Batch Processing", "Configuration"]
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Documentation
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                        Everything you need to integrate and build with AlamEnhancer.
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                            placeholder="Search documentation..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-400">
                                {section.icon}
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline text-sm transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Documentation;
