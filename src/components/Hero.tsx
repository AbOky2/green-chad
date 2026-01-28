"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-green-900/80 z-10" />
                {/* Placeholder for Hero Image - ideally a real photo from the NGO */}
                <div className="relative w-full h-full">
                    <Image
                        src="/logo.jpg"
                        alt="Green Tchad Background"
                        fill
                        sizes="100vw"
                        priority
                        quality={70}
                        className="object-cover opacity-20 blur-sm scale-110"
                    />
                    {/* abstract shapes */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-500/20 to-transparent blur-3xl rounded-full translate-x-1/4 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-green-500/10 to-transparent blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />
                </div>
            </div>

            <div className="container-custom relative z-20 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 font-medium text-sm mb-6"
                    >
                        <Leaf className="h-4 w-4" />
                        <span>ONG Nationale Officiellement Reconnue (N°0036/2025)</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8">
                        Ensemble pour un <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">Tchad Vert</span> et Prospère
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Notre mission : Outiller les citoyens pour leur permettre de relever efficacement les défis du développement durable et protéger notre préciux environnement.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#about"
                            className="btn-primary w-full sm:w-auto hover:scale-105 transition-transform"
                        >
                            Découvrir Notre Mission
                        </Link>
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-white/20 hover:scale-105 w-full sm:w-auto"
                        >
                            Nous Contacter <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1 h-12 rounded-full bg-gradient-to-b from-green-500 to-transparent"
                />
            </motion.div>
        </section>
    );
}
