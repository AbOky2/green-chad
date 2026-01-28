"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    isCoordinator?: boolean;
}

const coordinator: TeamMember = {
    name: "Abdallah Soumaine",
    role: "Coordinateur National",
    image: "/coordo.jpg",
    isCoordinator: true,
};

const teamMembers: TeamMember[] = [
    {
        name: "Payang Kana",
        role: "Secrétaire Général",
        image: "/membre2.jpg",
    },
    {
        name: "Safia Mahamat Souleymane",
        role: "Responsable Administratif et financière",
        image: "/membre4.jpg",
    },
    {
        name: "Fahad Azarak",
        role: "Chargé de Programme",
        image: "/membre1.jpg",
    },
    {
        name: "Amandine Memndigngar",
        role: "Chargée de Programme Adjointe",
        image: "/membre7.jpg",
    },
    {
        name: "Mahamat Adoum Abdoulaye",
        role: "Chargé de Communication",
        image: "/membre3.jpg",
    },
    {
        name: "Zakaria Youssouf",
        role: "Responsable de Mobilisation",
        image: "/membre5.jpg",
    },
    {
        name: "Karim Moussa",
        role: "Chargé des Agents de Terrain",
        image: "/membre6.jpg",
    },
];

const viewport = { once: true, amount: 0.15 } as const;

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
    return (
        <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            viewport={viewport}
            className={`group relative flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 ${member.isCoordinator ? "md:scale-110 z-10 border-green-500/30 bg-green-50/50" : ""
                }`}
        >
            <div className="relative mb-4">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-all duration-300 hidden sm:block" aria-hidden />
                <div className={`relative overflow-hidden rounded-full border-4 ${member.isCoordinator ? 'border-green-500 w-40 h-40' : 'border-white w-32 h-32'} shadow-md`}>
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes={member.isCoordinator ? "(max-width: 640px) 90vw, 160px" : "(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 128px"}
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </div>

            <div className="text-center">
                <h3 className={`font-bold text-gray-900 ${member.isCoordinator ? 'text-xl mb-1' : 'text-lg'}`}>
                    {member.name}
                </h3>
                <p className={`font-medium ${member.isCoordinator ? 'text-green-600' : 'text-gray-500 text-sm'}`}>
                    {member.role}
                </p>
            </div>
        </motion.div>
    );
};

export default function TeamSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-green-50/30 overflow-hidden">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={viewport}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Organisation</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
                        Notre Équipe Dynamique
                    </h2>
                    <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mb-6" />
                    <p className="text-gray-600 text-lg">
                        Des passionnés engagés pour la préservation de l'environnement et le développement durable au Tchad.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Connecting Lines for Desktop */}
                    <div className="hidden md:block absolute top-[160px] left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-green-500/50 to-transparent z-0" />
                    <div className="hidden md:block absolute top-[240px] left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent z-0" />

                    {/* Coordinator - Top Level */}
                    <div className="flex justify-center mb-16 relative z-10">
                        <MemberCard member={coordinator} index={0} />
                    </div>

                    {/* Core Members - Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {teamMembers.map((member, index) => (
                            <MemberCard key={index} member={member} index={index + 1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
