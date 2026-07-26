import { Star } from 'lucide-react';

export function Rating({ value, reviews, size = 14 }: { value: number; reviews?: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const isHalf = i === full && half;
          return (
            <Star
              key={i}
              size={size}
              className={
                filled || isHalf
                  ? 'text-accent-yellow fill-accent-yellow'
                  : 'text-steel-400'
              }
              strokeWidth={2}
            />
          );
        })}
      </div>
      <span className="text-xs text-ink-muted font-medium">{value.toFixed(1)}</span>
      {reviews != null && (
        <span className="text-xs text-ink-faint">({reviews})</span>
      )}
    </div>
  );
}
