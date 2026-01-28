"use client";

import { motion } from "framer-motion";
import { Target, Eye, History, Award } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: Target,
        title: "Notre Mission",
        description: "Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.",
        color: "bg-green-100 text-green-700",
    },
    {
        icon: Eye,
        title: "Notre Vision",
        description: "Protéger l'environnement et promouvoir les initiatives de la population orientées vers le développement durable.",
        color: "bg-blue-100 text-blue-700",
    },
    {
        icon: Award,
        title: "Notre Statut",
        description: "ONG nationale reconnue (Arrêté N°136 du 17/07/2025), œuvrant pour l'intérêt général.",
        color: "bg-orange-100 text-orange-700",
    },
];

export default function About() {
    return (
        <section id="about" className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-green-600 font-semibold tracking-wider text-sm uppercase">À Propos de Nous</span>
                            <h2 className="text-3xl lg:text-5xl font-bold mt-2 text-slate-900">
                                Engagés pour le Tchad de demain
                            </h2>
                            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                                L'ONG Green-Chad est née de la volonté de préserver notre patrimoine naturel tout en favorisant le développement socio-économique.
                                Nous croyons que la protection de l'environnement est indissociable du bien-être des populations.
                            </p>
                            <div className="mt-8 space-y-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group rounded-xl p-4 transition-colors">
                                        <div className={`shrink-0 p-3 rounded-xl ${feature.color}`}>
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 transition-colors">{feature.title}</h3>
                                            <p className="text-slate-600 mt-1">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Premium 3D Bento Grid Visual */}
                    <div className="flex-1 w-full relative h-[500px] flex items-center justify-center perspective-1000">
                        {/* Ambient Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-100/30 via-transparent to-blue-100/30 rounded-full blur-3xl" />

                        <div className="relative w-full max-w-lg h-full grid grid-cols-2 grid-rows-6 gap-4 p-4">

                            {/* Card 1: Main Stats - Large Glass Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="col-span-2 row-span-3 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent z-0" />
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-green-500/10 rounded-2xl">
                                            <Image src="/logo.jpg" alt="Logo" width={40} height={40} sizes="40px" className="rounded-full" />
                                        </div>
                                        <span className="py-1 px-3 bg-green-100/50 border border-green-200/50 rounded-full text-xs font-semibold text-green-700">
                                            Depuis 2023
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">Impact Global</h3>
                                        <p className="text-slate-600 text-sm">Une approche holistique pour un Tchad vert.</p>
                                    </div>
                                    {/* Mini Chart Visualization */}
                                    <div className="flex items-end gap-2 h-16 mt-4">
                                        {[40, 65, 45, 80, 60, 90].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                transition={{ delay: i * 0.1, duration: 1 }}
                                                className="flex-1 bg-green-500/20 rounded-t-lg hover:bg-green-500/40 transition-colors"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: Environment - Expanded to full width */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="col-span-2 row-span-3 bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-md border border-white/50 rounded-3xl shadow-lg p-5 flex flex-col justify-between group hover:-translate-y-1 transition-transform"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <div className="h-10 w-10 bg-blue-100/50 rounded-full flex items-center justify-center text-blue-600">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-3xl font-bold text-slate-800">15+</div>
                                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Projets Actifs</div>
                                    </div>
                                    <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-600 w-3/4 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                        {/* Floating 3D Elements */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-8 top-1/4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 z-20"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-xs font-bold text-slate-700">100% Local</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
