"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Réinitialiser le statut quand l'utilisateur modifie le formulaire
        if (submitStatus) {
            setSubmitStatus(null);
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            let data: { error?: string } = {};
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                try {
                    data = (await response.json()) as { error?: string };
                } catch {
                    data = { error: "Réponse invalide" };
                }
            }

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Une erreur est survenue");
            }
        } catch (err) {
            setSubmitStatus("error");
            setErrorMessage("Erreur de connexion. Veuillez réessayer plus tard.");
            if (typeof console !== "undefined") console.error("[Contact] Erreur fetch:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                    <p className="text-slate-600">Quartier Repos 2, N'Djamena, Tchad</p>
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
                        
                        {/* Message de succès */}
                        {submitStatus === "success" && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                                <p className="text-green-800 text-sm">
                                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                                </p>
                            </div>
                        )}

                        {/* Message d'erreur */}
                        {submitStatus === "error" && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                                <p className="text-red-800 text-sm">
                                    {errorMessage || "Erreur lors de l'envoi. Veuillez réessayer."}
                                </p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Nom complet</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        placeholder="Votre nom"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        placeholder="votre@email.com"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-700">Sujet</label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    placeholder="Comment pouvons-nous aider ?"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                                    placeholder="Votre message..."
                                    disabled={isSubmitting}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary flex justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Envoyer le Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
