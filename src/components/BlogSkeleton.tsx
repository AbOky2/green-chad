
interface BlogSkeletonProps {
    count?: number;
}

export default function BlogSkeleton({ count = 6 }: BlogSkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse"
                >
                    {/* Image placeholder */}
                    <div className="h-48 bg-slate-200 w-full" />

                    <div className="p-6">
                        {/* Title placeholder */}
                        <div className="h-7 bg-slate-200 rounded w-3/4 mb-4" />

                        {/* Excerpt placeholder */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-slate-200 rounded w-full" />
                            <div className="h-4 bg-slate-200 rounded w-5/6" />
                            <div className="h-4 bg-slate-200 rounded w-4/6" />
                        </div>

                        {/* Meta placeholder */}
                        <div className="flex items-center gap-4">
                            <div className="h-4 bg-slate-200 rounded w-24" />
                            <div className="h-4 bg-slate-200 rounded w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
