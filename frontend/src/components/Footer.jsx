import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                            AlamEnhancer
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Alam Image Enhancer. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
