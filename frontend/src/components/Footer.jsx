import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                                AlamEnhancer
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Enhance your images with the power of AI. Clearer, sharper, and better in seconds.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/features" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>



                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Alam Image Enhancer. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
