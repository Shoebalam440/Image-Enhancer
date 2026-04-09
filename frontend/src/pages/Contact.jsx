import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const contactInfo = [
        {
            icon: <Mail size={24} />,
            title: "Email Us",
            value: "shoebalam440@gmail.com",
            link: "mailto:shoebalam440@gmail.com",
            gradient: "from-indigo-500 to-purple-500"
        },
        {
            icon: <Phone size={24} />,
            title: "Call Us",
            value: "+91 8857091578",
            link: "tel:+918857091578",
            gradient: "from-emerald-500 to-teal-500"
        },
        {
            icon: <MapPin size={24} />,
            title: "Office",
            value: "Alam Villa, Mominpura, Nagpur, Maharashtra, India",
            link: null,
            gradient: "from-orange-500 to-red-500"
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Get in Touch
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactInfo.map((info, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                        >
                            {info.link ? (
                                <a href={info.link} className="block group">
                                    <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 text-center h-full">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                            {info.icon}
                                        </div>
                                        <p className="font-bold text-slate-900 dark:text-white mb-2">{info.title}</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{info.value}</p>
                                    </div>
                                </a>
                            ) : (
                                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center h-full">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white mx-auto mb-5 shadow-lg`}>
                                        {info.icon}
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white mb-2">{info.title}</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{info.value}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
