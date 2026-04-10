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
        <div className="flex h-full min-h-[calc(100vh-6rem)] bg-[#FAFAFC] text-slate-900 overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <aside
                className={`relative z-20 glass-light border-r border-slate-200/60 transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'w-72' : 'w-24'
                } hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}
            >
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-6 border-b border-slate-200/60">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_4px_12px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform">
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
                        {isSidebarOpen && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-4">Main Navigation</p>}
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group font-bold ${
                                    location.pathname === item.path
                                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                                        : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50 border border-transparent'
                                }`}
                            >
                                <span className={`flex-shrink-0 transition-transform duration-300 ${location.pathname === item.path ? 'scale-110 text-indigo-600' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && <span className="text-sm tracking-wide">{item.name}</span>}
                                {location.pathname === item.path && isSidebarOpen && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.4)]"></div>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 space-y-1">
                        {isSidebarOpen && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-4">System</p>}
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group font-bold ${
                                    location.pathname === item.path
                                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                        : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50 border border-transparent'
                                }`}
                            >
                                <span className="flex-shrink-0 group-hover:rotate-45 transition-transform">{item.icon}</span>
                                {isSidebarOpen && <span className="text-sm tracking-wide">{item.name}</span>}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-200/60 bg-slate-50/50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full px-4 py-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all group font-bold"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        {isSidebarOpen && <span className="text-sm uppercase tracking-widest">Sign Out</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-4 top-24 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 shadow-md transition-all z-30"
                >
                    {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Main Viewport */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
