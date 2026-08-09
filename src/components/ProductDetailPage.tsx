import { useMemo, useState } from 'react';
import {
  ChevronLeft, ShoppingCart, Check, Minus, Plus, MessageCircle, ShieldCheck,
  Truck, BadgeCheck, Wrench, Heart, Share2, Package, RotateCcw, ThumbsUp,
} from 'lucide-react';
import {
  CATEGORIES, formatPrice, getSpecs, getDescription, getRelated,
  buildWhatsAppLink, type Product, type CategoryId,
} from '@/data/catalog';
import { useCart } from '@/context/CartContext';
import { Rating } from './Rating';
import { StockIndicator } from './StockIndicator';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectCategory: (id: CategoryId | 'all') => void;
  onOpenProduct: (p: Product) => void;
}

const TABS = [
  { id: 'specs', label: 'المواصفات التقنية' },
  { id: 'description', label: 'الوصف' },
  { id: 'shipping', label: 'التوصيل والضمان' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export function ProductDetailPage({ product, onBack, onSelectCategory, onOpenProduct }: ProductDetailPageProps) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<TabId>('specs');
  const [activeImg, setActiveImg] = useState(0);

  const specs = useMemo(() => getSpecs(product), [product]);
  const related = useMemo(() => getRelated(product), [product]);
  const cat = CATEGORIES.find((c) => c.id === product.categoryId);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  // gallery: main + 3 crops as faux thumbnails (demo data has one image)
  const gallery = [product.image, product.image, product.image];

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-ink-faint mb-5 flex-wrap">
        <button onClick={onBack} className="hover:text-accent transition-colors">الرئيسية</button>
        <ChevronLeft size={12} />
        <button onClick={() => onSelectCategory(product.categoryId)} className="hover:text-accent transition-colors">
          {cat?.name}
        </button>
        <ChevronLeft size={12} />
        <span className="text-ink-muted line-clamp-1">{product.name}</span>
      </nav>

      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
      >
        <ChevronLeft size={16} className="rotate-180" /> العودة للكتالوج
      </button>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-industrial-lg border border-steel-500/60 bg-steel-700 grid-texture">
            <img
              src={gallery[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500"
            />
            {discount > 0 && (
              <span className="absolute top-3 right-3 bg-danger text-white text-sm font-bold px-2.5 py-1 rounded-sm shadow-industrial">
                -{discount}%
              </span>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 bg-accent text-bg-primary text-xs font-bold px-2.5 py-1 rounded-sm">
                {product.badge === 'bestseller' ? 'الأكثر مبيعاً' : product.badge === 'new' ? 'جديد' : 'حصري'}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-20 w-20 overflow-hidden rounded-industrial border-2 transition-colors ${
                  activeImg === i ? 'border-accent' : 'border-steel-500/60 hover:border-steel-300'
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-accent tracking-wider">{product.brand}</span>
            <span className="text-xs text-ink-faint font-mono">{product.sku}</span>
          </div>

          <h1 className="mt-2 text-2xl md:text-3xl font-black text-ink-main leading-tight">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
            <a href="#reviews" className="text-xs text-accent hover:underline">عرض التقييمات</a>
          </div>

          {/* Price block */}
          <div className="mt-5 flex items-end gap-3 flex-wrap">
            <span className="text-3xl font-black text-accent">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-ink-faint line-through">{formatPrice(product.compareAt)}</span>
            )}
            {discount > 0 && (
              <span className="text-sm font-bold text-success">وفّر {formatPrice((product.compareAt ?? 0) - product.price)}</span>
            )}
          </div>
          <div className="mt-1 text-xs text-ink-faint">السعر يشمل الضريبة · الدفع عند الاستلام متاح</div>

          {/* Stock */}
          <div className="mt-4">
            <StockIndicator stock={product.stock} />
          </div>

          {/* Spec chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-ink-muted bg-bg-surface border border-steel-500/60 px-2.5 py-1 rounded">
              {product.powerSource}
            </span>
            {product.voltage && (
              <span className="text-xs text-ink-muted bg-bg-surface border border-steel-500/60 px-2.5 py-1 rounded">
                {product.voltage}
              </span>
            )}
            {product.capacity && (
              <span className="text-xs text-ink-muted bg-bg-surface border border-steel-500/60 px-2.5 py-1 rounded">
                {product.capacity}
              </span>
            )}
          </div>

          {/* Quantity + CTAs */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center gap-1 rounded-industrial border border-steel-400 bg-bg-surface px-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 flex items-center justify-center text-ink-muted hover:text-accent transition-colors"
                aria-label="إنقاص"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-lg font-bold text-ink-main">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-10 w-10 flex items-center justify-center text-ink-muted hover:text-accent transition-colors"
                aria-label="زيادة"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`flex flex-1 items-center justify-center gap-2 h-12 px-6 rounded-industrial font-bold transition-all active:scale-[0.99] ${
                added
                  ? 'bg-success text-bg-primary'
                  : 'bg-accent text-bg-primary hover:bg-accent-yellow'
              } disabled:bg-steel-500 disabled:text-ink-faint disabled:cursor-not-allowed`}
            >
              {added ? <><Check size={20} /> تمت الإضافة للسلة</> : <><ShoppingCart size={20} /> أضف إلى السلة</>}
            </button>
          </div>

          {/* B2B WhatsApp quote */}
          <a
            href={buildWhatsAppLink(product, qty)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 h-12 px-6 rounded-industrial bg-success/15 text-success font-bold hover:bg-success/25 transition-colors border border-success/30"
          >
            <MessageCircle size={20} />
            اطلب عرض سعر B2B عبر واتساب
          </a>
          <div className="mt-1.5 text-center text-xs text-ink-faint">
            للطلبات بالجملة والمقاولات — رد فوري خلال ساعات العمل
          </div>

          {/* Secondary actions */}
          <div className="mt-4 flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors">
              <Heart size={16} /> أضف للمفضلة
            </button>
            <span className="h-4 w-px bg-steel-500" />
            <button className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors">
              <Share2 size={16} /> مشاركة
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: BadgeCheck, label: 'منتج أصلي', sub: 'ضمان رسمي' },
              { icon: Truck, label: 'توصيل سريع', sub: '48 ساعة' },
              { icon: RotateCcw, label: 'استبدال سهل', sub: 'خلال 7 أيام' },
              { icon: ShieldCheck, label: 'دفع آمن', sub: 'حماية كاملة' },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center text-center gap-1 p-3 rounded-industrial bg-bg-surface border border-steel-500/50">
                <t.icon size={22} className="text-accent" />
                <div className="text-xs font-bold text-ink-main">{t.label}</div>
                <div className="text-[10px] text-ink-faint">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex items-center gap-1 border-b border-steel-500/60 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                tab === t.id ? 'text-accent border-accent' : 'text-ink-muted border-transparent hover:text-ink-main'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === 'specs' && (
            <div className="bg-bg-surface rounded-industrial-lg border border-steel-500/60 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-bg-elevated/50' : ''}>
                      <th className="text-right font-medium text-ink-muted px-4 py-3 w-1/3 align-top">
                        {row.label}
                      </th>
                      <td className="text-ink-main font-bold px-4 py-3">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'description' && (
            <div className="prose-invert max-w-none bg-bg-surface rounded-industrial-lg border border-steel-500/60 p-6">
              <p className="text-sm text-ink-muted leading-relaxed">{getDescription(product)}</p>
              <ul className="mt-4 space-y-2">
                {[
                  'بنية متينة مصممة للاستخدام المكثف في ظروف العمل القاسية',
                  'أداء ثابت وموثوقية عالية مع حماية ضد الحمل الزائد',
                  'قطع غيار وخدمة ما بعد البيع متوفرة عبر شبكة CHIEKH FERRO',
                  'مناسب للمحترفين، الورشات، والمقاولات الصناعية',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                    <ThumbsUp size={15} className="text-accent mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'shipping' && (
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Truck, title: 'التوصيل', body: 'توصيل لكل ولايات الوطن خلال 24 إلى 48 ساعة. شحن مجاني للطلبات فوق 50,000 دج. تتبع الشحنة عبر رقم الطلب.' },
                { icon: Wrench, title: 'الضمان والصيانة', body: 'ضمان رسمي 24 شهر ضد عيوب التصنيع. صيانة وقطع غيار أصلية متوفرة عبر مراكز CHIEKH FERRO المعتمدة.' },
                { icon: Package, title: 'الاستبدال والاسترجاع', body: 'إمكانية استبدال أو استرجاع المنتج خلال 7 أيام من الاستلام، بشرط إبقائه في حالته الأصلية مع التغليف.' },
              ].map((c) => (
                <div key={c.title} className="bg-bg-surface rounded-industrial-lg border border-steel-500/60 p-5">
                  <c.icon size={24} className="text-accent mb-3" />
                  <h3 className="text-sm font-bold text-ink-main mb-2">{c.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-ink-main">منتجات ذات صلة</h2>
            <button
              onClick={() => onSelectCategory(product.categoryId)}
              className="text-sm text-accent hover:text-accent-yellow font-bold flex items-center gap-1"
            >
              عرض الكل <ChevronLeft size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={() => onOpenProduct(p)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
