import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { googleLogin } = useAuth();

    const handleGoogleSignup = async () => {
        setIsLoading(true);
        setError('');
        const result = await googleLogin();
        if (!result.success) {
            setError(result.message);
            setIsLoading(false);
        }
        // Supabase handles the redirect automatically on success
    };

    const perks = [
        "Enhance & restore photos with AI",
        "Upscale images up to 4x resolution",
        "Remove backgrounds instantly",
        "Secure, private, no storage of your images",
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAFAFC] relative overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden">
                    <div className="p-10">
                        {/* Logo & Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-xl shadow-indigo-500/20"
                            >
                                <span className="text-white font-black text-3xl">A</span>
                            </motion.div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                                <Sparkles size={12} />
                                Free to Start
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
                                Create Account
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Join the next generation of creators
                            </p>
                        </div>

                        {/* Perks list */}
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 space-y-2"
                        >
                            {perks.map((perk, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>{perk}</span>
                                </li>
                            ))}
                        </motion.ul>

                        {/* Error state */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm flex items-center gap-3 font-medium"
                            >
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Google Sign Up Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            onClick={handleGoogleSignup}
                            disabled={isLoading}
                            className="group w-full flex items-center justify-center gap-4 bg-white text-slate-800 py-4 px-6 rounded-2xl font-bold text-base border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            )}
                            <span>{isLoading ? 'Redirecting...' : 'Continue with Google'}</span>
                            {!isLoading && (
                                <ArrowRight size={18} className="ml-auto opacity-50 text-slate-400 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                            )}
                        </motion.button>

                        {/* Footnote */}
                        <p className="mt-6 text-center text-xs text-slate-500 leading-relaxed font-medium">
                            By signing up, you agree to our{' '}
                            <span className="text-slate-600 hover:text-indigo-600 font-bold cursor-pointer transition-colors">Terms of Service</span>
                            {' '}and{' '}
                            <span className="text-slate-600 hover:text-indigo-600 font-bold cursor-pointer transition-colors">Privacy Policy</span>.
                        </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                    <div className="py-5 text-center bg-slate-50/50">
                        <p className="text-sm font-medium text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
