import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    Scissors
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Enhance', icon: <Wand2 size={20} />, path: '/dashboard/enhance' },
        { name: 'Upscale', icon: <ImageIcon size={20} />, path: '/dashboard/upscale' },
        { name: 'Remove BG', icon: <Scissors size={20} />, path: '/dashboard/remove-bg' },
        { name: 'Restoration', icon: <Sparkles size={20} />, path: '/dashboard/restore' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
                    } hidden md:flex flex-col`}
            >
                <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-700">
                    <Link to="/" className="flex items-center gap-2">
                        <span className={`font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 ${!isSidebarOpen && 'hidden'}`}>
                            AlamEnhancer
                        </span>
                        {!isSidebarOpen && <span className="text-2xl font-bold text-indigo-500">AE</span>}
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-2 px-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    {isSidebarOpen && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 md:block hidden"
                    >
                        {isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
                    </button>
                    {/* Mobile Sidebar Toggle */}
                    <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            U
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
