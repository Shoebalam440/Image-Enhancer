import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const contactInfo = [
        {
            icon: <Mail size={24} />,
            title: "Email Us",
            value: "shoebalam440@gmail.com",
            link: "mailto:shoebalam440@gmail.com",
            gradient: "from-indigo-400 to-purple-600",
            desc: "Response within 24 hours"
        },
        {
            icon: <Phone size={24} />,
            title: "Call Us",
            value: "+91 8857091578",
            link: "tel:+918857091578",
            gradient: "from-emerald-400 to-teal-600",
            desc: "Mon-Fri, 9am - 6pm"
        },
        {
            icon: <MapPin size={24} />,
            title: "Office",
            value: "Nagpur, Maharashtra, India",
            link: null,
            gradient: "from-amber-400 to-orange-500",
            desc: "Global Digital HQ"
        }
    ];

    return (
        <div className="bg-[#050505] min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4"
                    >
                        Contact Us
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
                    >
                        Get in <span className="text-gradient-primary">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
                    >
                        Have questions about our AI models? Or just want to say hi? 
                        We're always looking for new creative collaborations.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {contactInfo.map((info, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-premium group"
                        >
                            <div className="glow-indigo"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mb-6 shadow-2xl`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{info.title}</h3>
                                {info.link ? (
                                    <a href={info.link} className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors mb-2">
                                        {info.value}
                                    </a>
                                ) : (
                                    <p className="text-slate-200 font-bold mb-2">{info.value}</p>
                                )}
                                <p className="text-slate-500 text-sm font-medium">{info.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Optional Message Form Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden"
                >
                    <div className="p-10 md:p-14">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <MessageSquare size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Send a Message</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Name</label>
                                <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Email</label>
                                <input className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" placeholder="your@email.com" />
                            </div>
                        </div>
                        
                        <div className="space-y-2 mb-8">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Message</label>
                            <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                        </div>
                        
                        <button className="btn-premium w-full py-4 text-lg font-bold flex items-center justify-center gap-2">
                            Send Message <Send size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
