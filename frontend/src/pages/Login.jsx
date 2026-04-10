import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { googleLogin } = useAuth();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        const result = await googleLogin();
        if (!result.success) {
            setError(result.message);
            setIsLoading(false);
        }
        // Supabase handles the redirect automatically on success
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] relative overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Card */}
                <div className="glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                    <div className="p-10">
                        {/* Logo & Header */}
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-2xl shadow-indigo-500/30"
                            >
                                <span className="text-white font-black text-3xl">A</span>
                            </motion.div>
                            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-slate-400 font-medium">
                                Sign in to access your workspace
                            </p>
                        </div>

                        {/* Error state */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm flex items-center gap-3"
                            >
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Google Sign In Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="group w-full flex items-center justify-center gap-4 bg-white text-slate-800 py-4 px-6 rounded-2xl font-bold text-base hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-600 rounded-full animate-spin"></div>
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
                                <ArrowRight size={18} className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            )}
                        </motion.button>

                        {/* Footnote */}
                        <p className="mt-8 text-center text-xs text-slate-600 leading-relaxed">
                            By continuing, you agree to our{' '}
                            <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                            {' '}and{' '}
                            <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>.
                        </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="py-5 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                                Get started for free
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
