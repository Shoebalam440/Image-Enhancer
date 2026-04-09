import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Alam Image Enhancer. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
