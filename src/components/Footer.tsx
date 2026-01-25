import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";

function TiktokIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 lg:py-16">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">ONG Green-Chad</h3>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Mission : Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable et protéger notre environnement.
                    </p>
                    <div className="flex gap-4">
                        <Link href="https://www.facebook.com/ONGGreenchad/" className="hover:text-green-500 transition-colors"><Facebook className="h-5 w-5" /></Link>
                        <Link href="https://www.tiktok.com/@green_chad?_r=1&_t=ZS-93MfEw2RJyh" className="hover:text-green-500 transition-colors" aria-label="TikTok"><TiktokIcon className="h-5 w-5" /></Link>
                        <Link href="https://www.linkedin.com/in/ong-green-chad-a0952431/" className="hover:text-green-500 transition-colors"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Liens Rapides</h4>
                    <ul className="space-y-3">
                        <li><Link href="/" className="hover:text-green-500 transition-colors">Accueil</Link></li>
                        <li><Link href="#about" className="hover:text-green-500 transition-colors">À propos</Link></li>
                        <li><Link href="#activities" className="hover:text-green-500 transition-colors">Nos Activités</Link></li>
                        <li><Link href="#contact" className="hover:text-green-500 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Contactez-nous</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                            <span>N'Djamena, Tchad</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-green-500 shrink-0" />
                            <a href="mailto:greenchad2010@gmail.com" className="hover:text-white">greenchad2010@gmail.com</a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                            <div className="flex flex-col">
                                <a href="tel:+23566286731" className="hover:text-white">+235 66 28 67 31</a>
                                <a href="tel:+23592320039" className="hover:text-white">+235 92 32 00 39</a>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Newsletter (Optional) */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
                    <p className="text-sm mb-4">Restez informé de nos activités.</p>
                    <form className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="bg-slate-800 border-none rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <button className="bg-green-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-green-700 transition-colors">
                            S'abonner
                        </button>
                    </form>
                </div>
            </div>
            <div className="container-custom mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                <p>© {new Date().getFullYear()} ONG Green-Chad. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
