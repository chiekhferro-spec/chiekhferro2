import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Phone, MessageCircle, Clock, Search, User, Heart, ShoppingCart, Menu, X,
  ChevronLeft, HardHat, PaintRoller, Wheat, TreePine, Sparkles, Wrench, Zap, Factory,
  type LucideIcon,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, formatPrice, type CategoryId } from '@/data/catalog';
import { useCart } from '@/context/CartContext';

const ICONS: Record<string, LucideIcon> = {
  HardHat, PaintRoller, Wheat, TreePine, Sparkles, Wrench, Zap, Factory,
};

interface HeaderProps {
  activeCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
}

export function Header({ activeCategory, onSelectCategory }: HeaderProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { count, open } = useCart();

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-steel-800 text-ink-muted text-xs">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="flex h-9 items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <a href="tel:+213555000000" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone size={13} /> <span>+213 555 000 000</span>
              </a>
              <a
                href="https://wa.me/213555000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-success transition-colors"
              >
                <MessageCircle size={13} /> <span>واتساب مباشر</span>
              </a>
              <span className="hidden md:flex items-center gap-1.5">
                <Clock size={13} /> <span>07:30 - 19:00</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-ink-faint">شحن مجاني للطلبات فوق 50,000 دج</span>
              <span className="h-3 w-px bg-steel-400" />
              <a href="#" className="hover:text-accent transition-colors">تتبع طلبك</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-bg-primary border-b border-steel-500/60">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="flex h-16 items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-ink-main hover:text-accent transition-colors"
              aria-label="القائمة"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-industrial bg-accent text-bg-primary font-black text-xl shadow-glow">
                CF
              </div>
              <div className="leading-none">
                <div className="font-display font-black text-lg tracking-tight text-ink-main">
                  CHIEKH FERRO
                </div>
                <div className="text-[10px] text-accent font-bold tracking-widest">
                  شيخ فرو · صناعة ثقيلة
                </div>
              </div>
            </a>

            {/* Search */}
            <div ref={searchRef} className="relative flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="ابحث عن أداة، ماركة، أو رقم SKU..."
                  className="w-full h-11 rounded-industrial bg-bg-surface border border-steel-500 pr-11 pl-4 text-sm text-ink-main placeholder:text-ink-faint focus-industrial transition-shadow"
                />
              </div>
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 inset-x-0 bg-bg-elevated border border-steel-500 rounded-industrial-lg shadow-industrial-lg overflow-hidden animate-scale-in origin-top">
                  {searchResults.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectCategory(p.categoryId);
                        setSearchQuery('');
                        setSearchFocused(false);
                      }}
                      className="flex w-full items-center gap-3 p-3 hover:bg-bg-hover transition-colors text-right border-b border-steel-500/40 last:border-0"
                    >
                      <img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover bg-steel-700" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-ink-main truncate">{p.name}</div>
                        <div className="text-xs text-ink-faint">{p.brand} · {p.sku}</div>
                      </div>
                      <div className="text-sm font-bold text-accent">{formatPrice(p.price)}</div>
                    </button>
                  ))}
                </div>
              )}
              {searchFocused && searchQuery.trim() && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 inset-x-0 bg-bg-elevated border border-steel-500 rounded-industrial-lg p-4 text-sm text-ink-muted text-center animate-scale-in origin-top">
                  لا توجد نتائج لـ &laquo;{searchQuery}&raquo;
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <a href="#" className="hidden sm:flex flex-col items-center gap-0.5 px-3 py-2 rounded-industrial hover:bg-bg-surface transition-colors text-ink-muted hover:text-ink-main">
                <User size={20} />
                <span className="text-[10px]">حسابي</span>
              </a>
              <a href="#" className="hidden sm:flex flex-col items-center gap-0.5 px-3 py-2 rounded-industrial hover:bg-bg-surface transition-colors text-ink-muted hover:text-ink-main">
                <Heart size={20} />
                <span className="text-[10px]">المفضلة</span>
              </a>
              <button
                onClick={open}
                className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-industrial hover:bg-bg-surface transition-colors text-ink-muted hover:text-ink-main"
              >
                <ShoppingCart size={20} />
                <span className="text-[10px]">السلة</span>
                {count > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-bg-primary text-[10px] font-bold px-1 animate-scale-in">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Nav row */}
          <nav className="hidden lg:flex items-center h-12 gap-1">
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className="flex items-center gap-2 h-9 px-4 rounded-industrial bg-accent text-bg-primary font-bold text-sm hover:bg-accent-yellow transition-colors"
            >
              <Menu size={16} />
              كل الفئات
              <ChevronLeft size={14} className={`transition-transform ${megaOpen ? '-rotate-90' : ''}`} />
            </button>
            <button
              onClick={() => onSelectCategory('all')}
              className={`h-9 px-4 rounded-industrial text-sm font-medium transition-colors ${
                activeCategory === 'all' ? 'text-accent' : 'text-ink-muted hover:text-ink-main'
              }`}
            >
              العروض
            </button>
            <button
              onClick={() => onSelectCategory('all')}
              className="h-9 px-4 rounded-industrial text-sm font-medium text-ink-muted hover:text-ink-main transition-colors"
            >
              وصل حديثاً
            </button>
            <button
              onClick={() => onSelectCategory('all')}
              className="h-9 px-4 rounded-industrial text-sm font-medium text-ink-muted hover:text-ink-main transition-colors"
            >
              الأكثر مبيعاً
            </button>
            <span className="mr-auto flex items-center gap-2 text-xs text-ink-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              توصيل خلال 48 ساعة لكل ولايات الوطن
            </span>
          </nav>
        </div>

        {/* Mega menu */}
        {megaOpen && (
          <div className="absolute inset-x-0 top-full hidden lg:block">
            <div className="mx-auto max-w-[1400px] px-4">
              <div className="mt-2 bg-bg-elevated border border-steel-500 rounded-industrial-lg shadow-industrial-lg overflow-hidden mega-enter">
                <div className="grid grid-cols-4 gap-0">
                  {CATEGORIES.map((cat) => {
                    const Icon = ICONS[cat.icon] ?? Wrench;
                    const productCount = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setMegaOpen(false);
                        }}
                        className="group flex items-start gap-3 p-4 border-b border-l border-steel-500/40 hover:bg-bg-hover transition-colors text-right"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-industrial bg-bg-surface text-accent group-hover:bg-accent group-hover:text-bg-primary transition-colors">
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-ink-main group-hover:text-accent transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-xs text-ink-faint mt-0.5 line-clamp-1">{cat.tagline}</div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {cat.subcategories.slice(0, 3).map((s) => (
                              <span key={s} className="text-[10px] text-ink-muted bg-steel-700/60 px-1.5 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-[10px] text-accent font-bold">{productCount} منتج</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between p-4 bg-bg-surface border-t border-steel-500/40">
                  <div className="flex items-center gap-2 text-sm text-ink-muted">
                    <Zap size={16} className="text-accent" />
                    <span>أكثر من <span className="font-bold text-ink-main">1200 منتج صناعي</span> أصلي بضمان رسمي</span>
                  </div>
                  <button
                    onClick={() => { onSelectCategory('all'); setMegaOpen(false); }}
                    className="text-sm font-bold text-accent hover:text-accent-yellow transition-colors flex items-center gap-1"
                  >
                    تصفح كل الكتالوج <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-primary border-b border-steel-500 animate-slide-in-right">
          <div className="px-4 py-3 space-y-1">
            {CATEGORIES.map((cat) => {
              const Icon = ICONS[cat.icon] ?? Wrench;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileOpen(false);
                  }}
                  className="flex w-full items-center gap-3 p-3 rounded-industrial hover:bg-bg-surface transition-colors text-right"
                >
                  <Icon size={20} className="text-accent" />
                  <span className="text-sm font-medium text-ink-main">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
