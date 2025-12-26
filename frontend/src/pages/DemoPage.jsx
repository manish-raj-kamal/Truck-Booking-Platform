
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const DemoPage = () => {
    const [activeTab, setActiveTab] = useState('customer');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const CustomerDemo = () => (
        <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: 20 }}
            variants={containerVariants}
            className="space-y-8"
        >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 bg-blue-500 rounded-xl bg-opacity-20 text-blue-300">🏢</span>
                    For Customers: Shipper Journey
                </h3>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Post a Load */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-blue-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">1️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Post a Load</h4>
                        <p className="text-slate-300">Enter pickup/drop locations, cargo type, and weight. Get instant quotes from verified drivers.</p>
                    </motion.div>

                    {/* Select a Truck */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-blue-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">2️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Select a Truck</h4>
                        <p className="text-slate-300">Browse available trucks, check driver ratings, and select the best match for your shipment.</p>
                    </motion.div>

                    {/* Track Shipment */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-blue-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">3️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Track Shipment</h4>
                        <p className="text-slate-300">Real-time GPS tracking of your goods. Get live updates on delivery progress.</p>
                    </motion.div>

                    {/* Confirm & Pay */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-blue-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">4️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Confirm & Pay</h4>
                        <p className="text-slate-300">Verify delivery completion and make secure payment via Razorpay.</p>
                    </motion.div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-2xl border border-blue-500/30">
                    <h4 className="text-lg font-semibold text-blue-200 mb-2">💡 Pro Tip</h4>
                    <p className="text-slate-300">Customers can save up to 20% on shipping costs by comparing multiple bids on our platform.</p>
                </div>
            </div>

            <div className="flex justify-center">
                <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transform hover:scale-105 transition duration-300 flex items-center gap-2">
                    Start Shipping Now <span className="text-xl">→</span>
                </Link>
            </div>
        </motion.div>
    );

    const DriverDemo = () => (
        <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: 20 }}
            variants={containerVariants}
            className="space-y-8"
        >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 bg-green-500 rounded-xl bg-opacity-20 text-green-300">🚚</span>
                    For Drivers: Carrier Journey
                </h3>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Find Loads */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-green-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">1️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Find Loads</h4>
                        <p className="text-slate-300">Browse thousands of available loads based on your route, truck type, and capacity.</p>
                    </motion.div>

                    {/* Accept Load */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-green-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">2️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Accept Load</h4>
                        <p className="text-slate-300">Review load details, confirm acceptance, and start your journey with the shipper.</p>
                    </motion.div>

                    {/* Deliver Load */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-green-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">3️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Deliver Load</h4>
                        <p className="text-slate-300">Transport the cargo safely to the destination and update delivery status.</p>
                    </motion.div>

                    {/* Get Paid Fast */}
                    <motion.div variants={itemVariants} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 hover:border-green-400/50 transition duration-300 group">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">4️⃣</div>
                        <h4 className="text-xl font-semibold text-white mb-2">Get Paid Fast</h4>
                        <p className="text-slate-300">Upload proof of delivery and receive payments quickly and securely to your account.</p>
                    </motion.div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-2xl border border-green-500/30">
                    <h4 className="text-lg font-semibold text-green-200 mb-2">💡 Pro Tip</h4>
                    <p className="text-slate-300">Top-rated drivers get priority access to premium high-paying loads on TruckSuvidha.</p>
                </div>
            </div>

            <div className="flex justify-center">
                <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/30 transform hover:scale-105 transition duration-300 flex items-center gap-2">
                    Join as Driver <span className="text-xl">→</span>
                </Link>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen pt-20 pb-16 bg-slate-900 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 blur-sm fixed"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-blue-200 mb-6 drop-shadow-lg">
                            Experience TruckSuvidha
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Discover how our platform connects shippers and drivers seamlessly. Choose your path below to see how it works.
                        </p>
                    </motion.div>

                    {/* Tab Selection */}
                    <motion.div variants={itemVariants} className="flex justify-center mb-12">
                        <div className="glass-panel p-2 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 inline-flex">
                            <button
                                onClick={() => setActiveTab('customer')}
                                className={`px-8 py-3 rounded-xl text-lg font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'customer'
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span>📦</span> Customer Demo
                            </button>
                            <button
                                onClick={() => setActiveTab('driver')}
                                className={`px-8 py-3 rounded-xl text-lg font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'driver'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span>🚚</span> Driver Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'customer' ? <CustomerDemo key="customer" /> : <DriverDemo key="driver" />}
                    </AnimatePresence>

                    {/* Additional Features Section */}
                    <motion.div variants={itemVariants} className="mt-24 grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-800/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-4">🚀 Why TruckSuvidha?</h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>Verified Drivers & Shippers Only</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>Transparent Pricing, No Hidden Fees</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>24/7 Customer Support</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-4">📱 Mobile First Experience</h3>
                            <p className="text-slate-300 mb-4">
                                Our platform is optimized for all devices. Manage your logistics on the go from your smartphone or tablet.
                            </p>
                            <div className="flex gap-4">
                                <span className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white border border-white/10">📱 Android Ready</span>
                                <span className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white border border-white/10">🍎 iOS Ready</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default DemoPage;
