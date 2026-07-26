import { useMemo, useState } from 'react';
import { SlidersHorizontal, X, ChevronLeft, PackageSearch } from 'lucide-react';
import { CATEGORIES, PRODUCTS, type CategoryId, type Product } from '@/data/catalog';
import { Sidebar, type FilterState } from '@/components/Sidebar';
import { ProductCard } from '@/components/ProductCard';
import { PromoBanner } from '@/components/PromoBanner';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'bestselling';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'default', label: 'الترتيب الافتراضي' },
  { key: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { key: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { key: 'rating', label: 'الأعلى تقييماً' },
  { key: 'bestselling', label: 'الأكثر مبيعاً' },
];

interface CollectionPageProps {
  activeCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  onOpenProduct: (p: Product) => void;
}

export function CollectionPage({ activeCategory, onSelectCategory, onOpenProduct }: CollectionPageProps) {
  const allPrices = PRODUCTS.map((p) => p.price);
  const priceBounds: [number, number] = [Math.min(...allPrices), Math.max(...allPrices)];

  const [filters, setFilters] = useState<FilterState>({
    category: activeCategory,
    subcategory: null,
    brands: [],
    powerSources: [],
    voltages: [],
    capacities: [],
    minPrice: priceBounds[0],
    maxPrice: priceBounds[1],
  });
  const [sort, setSort] = useState<SortKey>('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync external category selection
  useMemo(() => {
    setFilters((f) => ({ ...f, category: activeCategory, subcategory: null }));
  }, [activeCategory]);

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (filters.category !== 'all' && p.categoryId !== filters.category) return false;
      if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.powerSources.length && !filters.powerSources.includes(p.powerSource)) return false;
      if (filters.voltages.length && (!p.voltage || !filters.voltages.includes(p.voltage))) return false;
      if (filters.capacities.length && (!p.capacity || !filters.capacities.includes(p.capacity))) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'bestselling': list = [...list].sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [filters, sort]);

  const activeFilterCount =
    filters.brands.length + filters.powerSources.length + filters.voltages.length + filters.capacities.length +
    (filters.subcategory ? 1 : 0) +
    (filters.minPrice !== priceBounds[0] || filters.maxPrice !== priceBounds[1] ? 1 : 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-ink-faint mb-4">
        <button onClick={() => onSelectCategory('all')} className="hover:text-accent transition-colors">الرئيسية</button>
        <ChevronLeft size={12} />
        <span className="text-ink-muted">الكتالوج</span>
        {activeCat && (
          <>
            <ChevronLeft size={12} />
            <span className="text-accent">{activeCat.name}</span>
          </>
        )}
      </nav>

      {/* Title */}
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-black text-ink-main">
          {activeCat ? activeCat.name : 'كل المعدات الصناعية'}
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          {activeCat ? activeCat.tagline : 'أكثر من 1200 منتج صناعي أصلي بضمان رسمي وتوصيل سريع'}
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-32">
            <Sidebar filters={filters} onChange={setFilters} priceBounds={priceBounds} />
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <PromoBanner onCta={() => onSelectCategory('all')} />

          {/* Toolbar */}
          <div className="mt-5 flex items-center justify-between gap-3 bg-bg-surface border border-steel-500/60 rounded-industrial-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 h-9 px-3 rounded-industrial bg-bg-elevated text-sm font-bold text-ink-main"
              >
                <SlidersHorizontal size={16} /> تصفية
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-bg-primary text-[10px] font-bold px-1">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <span className="text-sm text-ink-muted">
                <span className="font-bold text-ink-main">{filtered.length}</span> منتج
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-ink-faint hidden sm:block">ترتيب حسب</label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 pl-8 pr-3 rounded-industrial bg-bg-elevated border border-steel-500 text-sm text-ink-main focus-industrial appearance-none cursor-pointer"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key} className="bg-bg-elevated text-ink-main">
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronLeft size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={() => onOpenProduct(p)} />
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center py-20 bg-bg-surface rounded-industrial-lg border border-steel-500/60">
              <PackageSearch size={48} className="text-ink-faint mb-3" />
              <div className="text-lg font-bold text-ink-main">لا توجد منتجات مطابقة</div>
              <div className="text-sm text-ink-muted mt-1">جرّب تعديل عوامل التصفية أو مسحها بالكامل.</div>
              <button
                onClick={() => setFilters({
                  category: 'all', subcategory: null, brands: [], powerSources: [], voltages: [], capacities: [],
                  minPrice: priceBounds[0], maxPrice: priceBounds[1],
                })}
                className="mt-4 h-9 px-4 rounded-industrial bg-accent text-bg-primary text-sm font-bold hover:bg-accent-yellow transition-colors"
              >
                مسح التصفية
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto w-[85%] max-w-sm h-full bg-bg-primary overflow-y-auto animate-slide-in-left">
            <div className="sticky top-0 flex items-center justify-between p-4 bg-bg-elevated border-b border-steel-500">
              <span className="font-bold text-ink-main">تصفية المنتجات</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-ink-muted hover:text-accent">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <Sidebar filters={filters} onChange={setFilters} priceBounds={priceBounds} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
