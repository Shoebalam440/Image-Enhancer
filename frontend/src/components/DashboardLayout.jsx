import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    History,
    Settings,
    LogOut,
    Menu,
    X,
    Wand2,
    Sparkles,
    Scissors,
    User,
    ChevronLeft,
    ChevronRight,
    Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [imgError, setImgError] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Enhance', icon: <Wand2 size={20} />, path: '/dashboard/enhance' },
        { name: 'Upscale', icon: <ImageIcon size={20} />, path: '/dashboard/upscale' },
        { name: 'Remove BG', icon: <Scissors size={20} />, path: '/dashboard/remove-bg' },
        { name: 'Restoration', icon: <Sparkles size={20} />, path: '/dashboard/restore' },
    ];

    const bottomItems = [
        { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-[#050505] text-slate-200 overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-[20%] h-[20%] bg-purple-600/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <aside
                className={`relative z-20 glass-dark border-r border-white/5 transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'w-72' : 'w-24'
                } hidden md:flex flex-col shadow-2xl`}
            >
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                            <span className="text-white font-bold text-xl uppercase">A</span>
                        </div>
                        {isSidebarOpen && (
                            <span className="font-black text-2xl tracking-tighter text-gradient-primary">
                                AlamEnhancer
                            </span>
                        )}
                    </Link>
                </div>

                {/* Sidebar Body */}
                <div className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
                    <div className="space-y-1">
                        {isSidebarOpen && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-4">Main Navigation</p>}
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                                    location.pathname === item.path
                                        ? 'bg-indigo-500/10 text-white border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <span className={`flex-shrink-0 transition-transform duration-300 ${location.pathname === item.path ? 'scale-110 text-indigo-400' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && <span className="font-semibold text-sm tracking-wide">{item.name}</span>}
                                {location.pathname === item.path && isSidebarOpen && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 space-y-1">
                        {isSidebarOpen && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-4">System</p>}
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                                    location.pathname === item.path
                                        ? 'bg-indigo-500/10 text-white border border-indigo-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <span className="flex-shrink-0 group-hover:rotate-45 transition-transform">{item.icon}</span>
                                {isSidebarOpen && <span className="font-semibold text-sm tracking-wide">{item.name}</span>}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full px-4 py-4 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        {isSidebarOpen && <span className="font-semibold text-sm uppercase tracking-widest">Sign Out</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-4 top-24 w-8 h-8 rounded-full glass-dark border border-white/10 flex items-center justify-center text-slate-400 hover:text-white shadow-xl transition-all z-30"
                >
                    {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Header */}
                <header className="h-20 glass-dark border-b border-white/5 flex items-center justify-between px-6 md:px-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-slate-400 hover:text-white">
                            <Menu size={24} />
                        </button>
                        <div className="hidden md:block">
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                {menuItems.find(i => i.path === location.pathname)?.name || 'Editor'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 border-2 border-[#050505]"></span>
                        </button>

                        <div className="h-8 w-px bg-white/5 mx-2"></div>

                        <div className="flex items-center gap-4 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-white leading-none mb-1 group-hover:text-gradient-primary transition-all">{user?.name || 'User'}</p>
                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Pro Member</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-[1px] shadow-lg">
                                <div className="w-full h-full rounded-xl bg-[#0a0a0a] flex items-center justify-center text-indigo-400 font-bold overflow-hidden border border-white/5">
                                    {user?.avatar && !imgError ? (
                                        <img src={user.avatar} className="w-full h-full object-cover" onError={() => setImgError(true)} alt="" />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Viewport */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
