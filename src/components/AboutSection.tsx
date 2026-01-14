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
                                L'ONG Green Tchad est née de la volonté de préserver notre patrimoine naturel tout en favorisant le développement socio-économique.
                                Nous croyons que la protection de l'environnement est indissociable du bien-être des populations.
                            </p>
                            <div className="mt-8 space-y-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group rounded-xl p-4 transition-colors hover:bg-slate-50">
                                        <div className={`shrink-0 p-3 rounded-xl ${feature.color}`}>
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">{feature.title}</h3>
                                            <p className="text-slate-600 mt-1">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Grid */}
                    <div className="flex-1 w-full relative">
                        <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
                            <div className="absolute inset-0 bg-green-200 rounded-2xl rotate-6 scale-95 opacity-50 blur-xl" />
                            <div className="absolute inset-0 bg-slate-200 rounded-2xl -rotate-6 scale-95 opacity-50 blur-xl" />
                            <div className="relative h-full w-full rounded-2xl overflow-hidden bg-slate-100 shadow-2xl border-4 border-white">
                                {/* Placeholder image representation */}
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                                    <Image
                                        src="/logo.jpg"
                                        alt="Green Tchad Team"
                                        width={400}
                                        height={400}
                                        className="object-contain p-8"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent flex items-end p-8">
                                        <div className="text-white">
                                            <p className="font-bold text-xl">Abdallah Soumaine</p>
                                            <p className="text-green-200">Président, Green Tchad</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decoration */}
                            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-xl shadow-xl animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-green-500" />
                                    <span className="font-bold text-slate-800">Partenaire Durable</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
