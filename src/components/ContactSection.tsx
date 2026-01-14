"use client";

import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <span className="text-green-600 font-semibold tracking-wider text-sm uppercase">Contactez-nous</span>
                        <h2 className="text-3xl lg:text-5xl font-bold mt-2 text-slate-900 leading-tight">
                            Prêt à rejoindre le mouvement ?
                        </h2>
                        <p className="mt-4 text-slate-600 text-lg leading-relaxed mb-10">
                            Que ce soit pour un partenariat, un don ou simplement pour en savoir plus, notre équipe est à votre écoute.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Notre Adresse</h4>
                                    <p className="text-slate-600">Quartier Ridina, N'Djamena, Tchad</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Email</h4>
                                    <a href="mailto:greenchad2010@gmail.com" className="text-slate-600 hover:text-green-600 transition-colors">
                                        greenchad2010@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">Téléphone</h4>
                                    <div className="flex flex-col text-slate-600">
                                        <a href="tel:+23566286731" className="hover:text-green-600 transition-colors">+235 66 28 67 31</a>
                                        <a href="tel:+23592320039" className="hover:text-green-600 transition-colors">+235 92 32 00 39</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Nom complet</label>
                                    <input type="text" id="name" className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Votre nom" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" id="email" className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="votre@email.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-700">Sujet</label>
                                <input type="text" id="subject" className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Comment pouvons-nous aider ?" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                <textarea id="message" rows={4} className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none" placeholder="Votre message..." />
                            </div>
                            <button type="submit" className="w-full btn-primary flex justify-center gap-2">
                                <Send className="h-4 w-4" />
                                Envoyer le Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
