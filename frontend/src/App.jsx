import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Documentation from './pages/Documentation';
import Community from './pages/Community';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-200">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/docs" element={<Documentation />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />

                            <Route element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/dashboard/enhance" element={<Editor mode="enhance" />} />
                                <Route path="/dashboard/upscale" element={<Editor mode="upscale" />} />
                                <Route path="/dashboard/remove-bg" element={<Editor mode="remove-bg" />} />
                                <Route path="/dashboard/restore" element={<Editor mode="restore" />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
