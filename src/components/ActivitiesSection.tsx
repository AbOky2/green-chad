"use client";

import { motion } from "framer-motion";
import { CloudRain, HeartPulse, GraduationCap, Sun, Users, Sprout } from "lucide-react";

const activities = [
    {
        icon: CloudRain,
        title: "Changement Climatique",
        description: "Sensibilisation, recherche et projets d'adaptation face aux défis climatiques.",
    },
    {
        icon: Sprout,
        title: "Environnement",
        description: "Protection de la biodiversité et actions de reboisement.",
    },
    {
        icon: HeartPulse,
        title: "Santé Communautaire",
        description: "Prévention et amélioration de l'accès aux soins pour les populations vulnérables.",
    },
    {
        icon: Users,
        title: "Autonomisation des Femmes",
        description: "Formation et soutien aux initiatives économiques des femmes.",
    },
    {
        icon: GraduationCap,
        title: "Éducation & Jeunesse",
        description: "Renforcement des capacités des jeunes leaders écologiques.",
    },
    {
        icon: Sun,
        title: "Énergies Renouvelables",
        description: "Promotion et installations de solutions énergétiques durables (solaire, etc.).",
    },
];

export default function Activities() {
    return (
        <section id="activities" className="section-padding bg-slate-50 relative">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-green-600 font-semibold tracking-wider text-sm uppercase">Nos Domaines d'Intervention</span>
                    <h2 className="text-3xl lg:text-5xl font-bold mt-2 text-slate-900">Des actions concrètes pour un impact réel</h2>
                    <p className="mt-4 text-slate-600">Nous intervenons sur plusieurs fronts pour assurer un développement holistique et durable.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:translate-y-[-5px] border border-slate-100 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <activity.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{activity.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{activity.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
