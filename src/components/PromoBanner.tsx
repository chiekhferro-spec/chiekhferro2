import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { PROMO_SLIDES } from '@/data/catalog';

export function PromoBanner({ onCta }: { onCta: () => void }) {
  const [i, setI] = useState(0);
  const n = PROMO_SLIDES.length;

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => window.clearInterval(t);
  }, [n]);

  const slide = PROMO_SLIDES[i];

  return (
    <div className="relative overflow-hidden rounded-industrial-lg border border-steel-500/60 bg-bg-surface">
      <div className="grid-texture absolute inset-0 opacity-60" />
      <div
        className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-6 md:p-8 transition-colors duration-500"
        style={{ background: `linear-gradient(115deg, ${slide.accent}, transparent 70%)` }}
      >
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-accent bg-accent-soft px-2 py-1 rounded-sm mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            عرض محدود
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-ink-main leading-tight">{slide.title}</h2>
          <p className="mt-2 text-sm md:text-base text-ink-muted">{slide.subtitle}</p>
          <button
            onClick={onCta}
            className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-industrial bg-accent text-bg-primary text-sm font-bold hover:bg-accent-yellow transition-colors"
          >
            {slide.cta}
            <ArrowLeft size={16} />
          </button>
        </div>

        {/* Decorative hazard stripe */}
        <div className="hidden md:block w-2 h-24 hazard-stripe rounded-sm opacity-80" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2">
        {PROMO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-6 bg-accent' : 'w-1.5 bg-steel-400'}`}
            aria-label={`شريحة ${idx + 1}`}
          />
        ))}
      </div>
      <button
        onClick={() => setI((v) => (v - 1 + n) % n)}
        className="absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8 rounded-full bg-bg-primary/60 backdrop-blur flex items-center justify-center text-ink-muted hover:text-accent transition-colors"
        aria-label="السابق"
      >
        <ChevronRight size={18} />
      </button>
      <button
        onClick={() => setI((v) => (v + 1) % n)}
        className="absolute top-1/2 -translate-y-1/2 left-2 h-8 w-8 rounded-full bg-bg-primary/60 backdrop-blur flex items-center justify-center text-ink-muted hover:text-accent transition-colors"
        aria-label="التالي"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}
