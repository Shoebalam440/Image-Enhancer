import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-white/5 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-6 flex justify-center items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">A</span>
                    </div>
                    <span className="text-lg font-bold text-gradient-primary">AlamEnhancer</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Alam Image Enhancer. Crafted with precision for the digital age.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
