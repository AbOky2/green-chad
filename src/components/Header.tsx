"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "#about" },
  { name: "Nos Activités", href: "#activities" },
  { name: "Partenaires", href: "#partners" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-green-600 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.jpg"
              alt="ONG Green Tchad Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-slate-900" : "text-slate-900 lg:text-white"}`}>
            Green-Chad
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-green-500 ${scrolled ? "text-slate-600" : "text-white/90 hover:text-white"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#donate"
            className={`btn-primary !px-5 !py-2 !text-sm flex items-center gap-2 ${!scrolled && "bg-white text-green-700 hover:bg-green-50"
              }`}
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            Nous Soutenir
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-slate-900 bg-white/50 backdrop-blur-sm rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b"
          >
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-800 hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#donate"
                className="btn-primary w-full flex justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-4 w-4" fill="currentColor" />
                Nous Soutenir
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
