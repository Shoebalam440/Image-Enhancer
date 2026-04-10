import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 glass-light rounded-2xl">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_4px_10px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-xl font-black text-gradient-primary tracking-tight">
                                AlamEnhancer
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {user && (
                                <Link
                                    to="/dashboard"
                                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Side Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-[1px] shadow-sm">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-indigo-500 font-bold overflow-hidden border border-white">
                                            {user.avatar && !imgError ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                    onError={() => setImgError(true)}
                                                />
                                            ) : (
                                                <User size={18} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800 leading-none">{user.name}</span>
                                        <span className="text-[10px] text-indigo-500 uppercase tracking-wider font-extrabold mt-0.5">Pro Account</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-bold transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn-premium py-2"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-3xl rounded-b-2xl overflow-hidden shadow-2xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-slate-600 hover:text-slate-900 block px-4 py-3 rounded-xl text-base font-bold hover:bg-slate-50 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                to="/dashboard"
                                className="text-slate-600 hover:text-slate-900 block px-4 py-3 rounded-xl text-base font-bold hover:bg-slate-50 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        <div className="pt-4 border-t border-slate-100">
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 px-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-500 border border-slate-200">
                                            {user.avatar && !imgError ? (
                                                <img src={user.avatar} className="w-full h-full object-cover rounded-full" />
                                            ) : <User />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{user.name}</p>
                                            <p className="text-xs font-semibold text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 px-2">
                                    <Link
                                        to="/login"
                                        className="flex items-center justify-center px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="btn-premium text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
