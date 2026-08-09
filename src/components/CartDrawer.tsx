import { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/catalog';
import { QtyStepper } from './Sidebar';
import { CheckoutModal } from './CheckoutModal';

export function CartDrawer() {
  const { items, isOpen, close, remove, setQty, total, count } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-up" onClick={close} />
      <div className="relative mr-auto w-full max-w-md h-full bg-bg-primary border-l border-steel-500 flex flex-col animate-slide-in-left shadow-industrial-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-steel-500/60 bg-bg-elevated">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-accent" />
            <span className="font-bold text-ink-main">سلة التسوق</span>
            <span className="text-xs text-ink-faint">({count} قطعة)</span>
          </div>
          <button onClick={close} className="text-ink-muted hover:text-accent transition-colors" aria-label="إغلاق">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={48} className="text-ink-faint mb-3" />
            <div className="text-lg font-bold text-ink-main">سلتك فارغة</div>
            <div className="text-sm text-ink-muted mt-1">ابدأ بإضافة المعدات والأدوات الصناعية.</div>
            <button
              onClick={close}
              className="mt-5 h-10 px-5 rounded-industrial bg-accent text-bg-primary text-sm font-bold hover:bg-accent-yellow transition-colors"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-bg-surface rounded-industrial p-3 border border-steel-500/50">
                <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-industrial object-cover bg-steel-700 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] text-accent font-bold">{item.product.brand}</div>
                      <h4 className="text-sm font-bold text-ink-main line-clamp-2">{item.product.name}</h4>
                      <div className="text-[10px] text-ink-faint font-mono mt-0.5">{item.product.sku}</div>
                    </div>
                    <button
                      onClick={() => remove(item.product.id)}
                      className="text-ink-faint hover:text-danger transition-colors shrink-0"
                      aria-label="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <QtyStepper
                      qty={item.qty}
                      onDec={() => setQty(item.product.id, item.qty - 1)}
                      onInc={() => setQty(item.product.id, item.qty + 1)}
                    />
                    <div className="text-sm font-black text-accent">
                      {formatPrice(item.product.price * item.qty)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-steel-500/60 bg-bg-elevated p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">المجموع الفرعي</span>
              <span className="font-bold text-ink-main">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">الشحن</span>
              <span className="text-success font-bold">
                {total >= 50000 ? 'مجاني' : 'يُحسب عند الدفع'}
              </span>
            </div>
            <div className="h-px bg-steel-500/60" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink-main">الإجمالي</span>
              <span className="text-xl font-black text-accent">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => setCheckoutOpen(true)}
              className="w-full h-11 rounded-industrial bg-accent text-bg-primary font-bold hover:bg-accent-yellow transition-colors active:scale-[0.99]"
            >
              إتمام الطلب
            </button>
            <div className="flex items-center justify-center gap-4 text-[11px] text-ink-faint">
              <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-success" /> دفع آمن</span>
              <span className="flex items-center gap-1"><Truck size={13} className="text-accent" /> توصيل 48 ساعة</span>
            </div>
          </div>
        )}
      </div>

      {checkoutOpen && (
        <CheckoutModal
          onClose={() => {
            setCheckoutOpen(false);
            close();
          }}
        />
      )}
    </div>
  );
}
