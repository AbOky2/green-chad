"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// Fallback for cn if not available, but usually it is in shadcn/tailwind setups. 
// If this fails, I'll fix it. I'll check for lib/utils existence in previous steps? 
// I haven't seen lib/utils but standard nextjs setups often have it. 
// I'll assume it might not exist and use template literals or check first.
// Actually, to be safe, I'll avoid `cn` import and use template literals for now if I am unsure.
// But wait, the user mentioned shadcn/ui earlier in conversation history, so `lib/utils` likely exists.
// Let's check `lib` dir first to be safe? No, let's just write valid code without external deps if possible or use standard ones.
// I'll stick to standard template literals to be safe.

const categories = [
    { label: 'Tous', value: 'all' },
    { label: 'Environnement', value: 'environnement' },
    { label: 'Éducation', value: 'education' },
    { label: 'Santé', value: 'sante' },
    { label: "L'eau, l’hygiène et l'assainissement", value: 'eauHygieneAssainissement' },
    { label: 'Actualités', value: 'actualites' },
    { label: 'Événements', value: 'evenements' },
    { label: 'Sécurité alimentaire', value: 'securiteAlimentaire' },
    { label: 'Formation', value: 'formation' },
    { label: 'Violence (VBG)', value: 'violence' },
    { label: 'Paix', value: 'paix' },
];

export default function BlogFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "all";

    const handleCategoryChange = useCallback((category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "all") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        params.set("page", "1"); // Reset to page 1 on filter change
        router.push(`/blog?${params.toString()}`);
    }, [searchParams, router]);

    return (
        <div className="mb-12 overflow-x-auto pb-4">
            <div className="flex flex-wrap gap-2 justify-center min-w-max px-4">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => handleCategoryChange(cat.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${(currentCategory === cat.value || (currentCategory === '' && cat.value === 'all'))
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
