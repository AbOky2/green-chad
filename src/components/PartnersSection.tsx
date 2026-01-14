"use client";

import Image from "next/image";

export default function Partners() {
    return (
        <section id="partners" className="py-20 border-t border-slate-100">
            <div className="container-custom text-center">
                <h3 className="text-lg font-medium text-slate-500 mb-8">Ils nous font confiance</h3>
                <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {/* Using text placeholders mostly as we don't have logo assets for partners yet, except naming IUSAH */}
                    <div className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                        <span className="p-2 border-2 border-slate-800 rounded">IUSAH</span>
                        Institut Universitaire
                    </div>
                    <div className="text-2xl font-bold text-slate-400">PARTNER 2</div>
                    <div className="text-2xl font-bold text-slate-400">PARTNER 3</div>
                    <div className="text-2xl font-bold text-slate-400">PARTNER 4</div>
                </div>
            </div>
        </section>
    );
}
