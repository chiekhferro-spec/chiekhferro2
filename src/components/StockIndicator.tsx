import { Check } from 'lucide-react';

export function StockIndicator({ stock }: { stock: number }) {
  const inStock = stock > 0;
  const low = inStock && stock <= 7;
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-flex h-2 w-2 rounded-full ${
          inStock ? (low ? 'bg-warning' : 'bg-success') : 'bg-danger'
        } ${inStock ? 'animate-pulse' : ''}`}
      />
      <span className={`text-xs font-medium ${low ? 'text-warning' : inStock ? 'text-success' : 'text-danger'}`}>
        {inStock ? (low ? `متبقي ${stock} قطع فقط` : 'متوفر في المخزون') : 'نفد المخزون'}
      </span>
      {inStock && !low && <Check size={12} className="text-success" />}
    </div>
  );
}
