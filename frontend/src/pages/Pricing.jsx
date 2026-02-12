import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            desc: "For hobbyists and testing.",
            features: [
                "5 Enhancements / day",
                "Standard Resolution",
                "Basic Support",
                "Public Uploads"
            ],
            notIncluded: [
                "Batch Processing",
                "API Access",
                "High Speed Processing"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: "$9.99",
            period: "/mo",
            desc: "For creators and professionals.",
            features: [
                "Unlimited Enhancements",
                "Up to 4K Upscaling",
                "Priority Support",
                "Private Storage",
                "Batch Processing (Coming Soon)",
                "No Watermarks"
            ],
            notIncluded: [
                "API Access"
            ],
            cta: "Go Pro",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "For large teams and platforms.",
            features: [
                "Everything in Pro",
                "Dedicated API Access",
                "Custom Models",
                "SSO Integration",
                "24/7 Priority Support"
            ],
            notIncluded: [],
            cta: "Contact Us",
            popular: false
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative p-8 rounded-2xl bg-white dark:bg-slate-800 border ${plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-700 shadow-sm'} flex flex-col`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{plan.desc}</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                                {plan.period && <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                        <Check className="text-emerald-500 flex-shrink-0" size={20} />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-slate-400 dark:text-slate-500">
                                        <X className="text-slate-300 dark:text-slate-600 flex-shrink-0" size={20} />
                                        <span className="text-sm line-through">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/signup"
                                className={`w-full py-3 rounded-lg font-bold text-center transition-all ${plan.popular
                                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
