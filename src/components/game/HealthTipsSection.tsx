import type { HealthTip } from "@/lib/game-data";
import { cn } from "@/lib/utils";

const urgencyStyles = {
    info: "border-blue-400/40 bg-blue-500/10 text-blue-200",
    important: "border-amber-400/40 bg-amber-500/10 text-amber-200",
    critical: "border-red-400/40 bg-red-500/10 text-red-200",
};

const urgencyBadge = {
    info: "bg-blue-500/20 text-blue-300",
    important: "bg-amber-500/20 text-amber-300",
    critical: "bg-red-500/20 text-red-300",
};

const urgencyLabel = {
    info: "Info",
    important: "Important",
    critical: "⚠️ Critical",
};

interface HealthTipsCardProps {
    tip: HealthTip;
}

export function HealthTipCard({ tip }: HealthTipsCardProps) {
    return (
        <div
            className={cn(
                "flex items-start gap-3 rounded-xl border p-4 backdrop-blur-sm transition-all hover:scale-[1.02]",
                urgencyStyles[tip.urgency]
            )}
        >
            <span className="text-2xl flex-shrink-0 mt-0.5">{tip.icon}</span>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-sm">{tip.title}</p>
                    <span
                        className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-medium",
                            urgencyBadge[tip.urgency]
                        )}
                    >
                        {urgencyLabel[tip.urgency]}
                    </span>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">{tip.tip}</p>
            </div>
        </div>
    );
}

interface HealthTipsSectionProps {
    tips: HealthTip[];
}

export function HealthTipsSection({ tips }: HealthTipsSectionProps) {
    if (!tips || tips.length === 0) return null;
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
                <span>💡</span> Health Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tips.map((tip, i) => (
                    <HealthTipCard key={i} tip={tip} />
                ))}
            </div>
        </div>
    );
}
