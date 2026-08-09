import { ShoppingCart, Check, Eye } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, type Product } from '@/data/catalog';
import { useCart } from '@/context/CartContext';
import { Rating } from './Rating';
import { StockIndicator } from './StockIndicator';

const BADGE_TEXT: Record<string, { label: string; cls: string }> = {
  bestseller: { label: 'الأكثر مبيعاً', cls: 'bg-accent text-bg-primary' },
  new: { label: 'جديد', cls: 'bg-success/90 text-bg-primary' },
  exclusive: { label: 'حصري', cls: 'bg-warning/90 text-bg-primary' },
};

export function ProductCard({ product, onOpen }: { product: Product; onOpen?: () => void }) {
  const { add, lastAddedId } = useCart();
  const [added, setAdded] = useState(false);
  const justAdded = lastAddedId === product.id || added;

  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  const handleAdd = () => {
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const badge = product.badge ? BADGE_TEXT[product.badge] : null;

  return (
    <article className="group relative flex flex-col bg-bg-surface rounded-industrial-lg border border-steel-500/60 overflow-hidden hover:border-accent/50 hover:shadow-industrial-lg transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-steel-700 grid-texture">
        <button onClick={onOpen} className="block h-full w-full" aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-start">
          {discount > 0 && (
            <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-sm shadow-industrial">
              -{discount}%
            </span>
          )}
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${badge.cls}`}>
              {badge.label}
            </span>
          )}
        </div>
        {/* Quick view */}
        <button
          className="absolute top-2 left-2 h-8 w-8 rounded-full bg-bg-primary/80 backdrop-blur flex items-center justify-center text-ink-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="معاينة سريعة"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-accent tracking-wider">{product.brand}</span>
          <span className="text-[10px] text-ink-faint font-mono">{product.sku}</span>
        </div>

        <h3 className="text-sm font-bold text-ink-main leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-accent transition-colors">
          <button onClick={onOpen} className="text-right w-full">{product.name}</button>
        </h3>

        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-2">
          <StockIndicator stock={product.stock} />
        </div>

        {/* Specs */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          <span className="text-[10px] text-ink-muted bg-steel-700/60 px-1.5 py-0.5 rounded">
            {product.powerSource}
          </span>
          {product.voltage && (
            <span className="text-[10px] text-ink-muted bg-steel-700/60 px-1.5 py-0.5 rounded">
              {product.voltage}
            </span>
          )}
          {product.capacity && (
            <span className="text-[10px] text-ink-muted bg-steel-700/60 px-1.5 py-0.5 rounded">
              {product.capacity}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3.5">
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col">
              {product.compareAt && (
                <span className="text-xs text-ink-faint line-through">{formatPrice(product.compareAt)}</span>
              )}
              <span className="text-lg font-black text-ink-main">{formatPrice(product.price)}</span>
            </div>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`flex items-center gap-1.5 h-9 px-3 rounded-industrial text-sm font-bold transition-all ${
                justAdded
                  ? 'bg-success text-bg-primary'
                  : 'bg-accent text-bg-primary hover:bg-accent-yellow active:scale-95'
              } disabled:bg-steel-500 disabled:text-ink-faint disabled:cursor-not-allowed`}
            >
              {justAdded ? (
                <><Check size={16} /> تم</>
              ) : (
                <><ShoppingCart size={16} /> أضف</>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
