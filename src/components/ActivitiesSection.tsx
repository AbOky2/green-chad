"use client";

import { motion } from "framer-motion";
import { Sprout, GraduationCap, Handshake, Briefcase, ShieldAlert, HeartPulse, Droplets, Wheat } from "lucide-react";

const activities = [
    {
        icon: Sprout,
        title: "L'environnement",
        description: "Protection de la biodiversité, reboisement et lutte contre le changement climatique.",
    },
    {
        icon: GraduationCap,
        title: "L'éducation",
        description: "Promotion de l'éducation pour tous, alphabétisation et sensibilisation scolaire.",
    },
    {
        icon: Handshake,
        title: "La paix",
        description: "Renforcement de la cohésion sociale et prévention des conflits communautaires.",
    },
    {
        icon: Briefcase,
        title: "Formation Technique",
        description: "Apprentissage de métiers et renforcement des capacités pour l'insertion socio-professionnelle.",
    },
    {
        icon: ShieldAlert,
        title: "VBG",
        description: "Lutte contre les Violences Basées sur le Genre et protection des personnes vulnérables.",
    },
    {
        icon: HeartPulse,
        title: "La Santé",
        description: "Amélioration de l'accès aux soins de base et campagnes de prévention sanitaire.",
    },
    {
        icon: Droplets,
        title: "WASH",
        description: "Accès à l'eau potable, infrastructures d'assainissement et promotion de l'hygiène.",
    },
    {
        icon: Wheat,
        title: "La Sécurité Alimentaire",
        description: "Soutien à l'agriculture durable et lutte contre la malnutrition.",
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
                            initial={{ y: 24 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ delay: idx * 0.06, duration: 0.4 }}
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
