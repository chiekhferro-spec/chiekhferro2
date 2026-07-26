import { useState, type FormEvent } from 'react';
import {
  X, User, Phone, MapPin, Building2, Loader2, CheckCircle2, AlertCircle,
  ShoppingBag, ArrowLeft, ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/catalog';

interface CheckoutPayload {
  customer: { full_name: string; phone: string; address: string; city: string };
  items: { title: string; quantity: number; price: string; sku?: string; variant_id?: string }[];
  note?: string;
}

interface OrderResult {
  success: boolean;
  order_id?: string;
  order_number?: string;
  invoice_url?: string;
  total_price?: string;
  currency?: string;
  status?: string;
  error?: string;
}

type Stage = 'form' | 'submitting' | 'success' | 'error';

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { items, total, count, clear } = useCart();
  const [stage, setStage] = useState<Stage>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [order, setOrder] = useState<OrderResult | null>(null);

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStage('submitting');
    setErrorMsg('');

    const payload: CheckoutPayload = {
      customer: form,
      items: items.map((i) => ({
        title: i.product.name,
        quantity: i.qty,
        price: String(i.product.price),
        sku: i.product.sku,
      })),
      note: 'طلب من متجر CHIEKH FERRO — الدفع عند الاستلام',
    };

    try {
      const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-create-order`;
      const res = await fetch(fnUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const data: OrderResult = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || `فشل إنشاء الطلب (${res.status})`);
      }

      setOrder(data);
      setStage('success');
      clear();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setStage('error');
    }
  };

  const field = (
    name: keyof typeof form,
    label: string,
    icon: typeof User,
    type = 'text',
    placeholder: string,
  ) => (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink-main">
        <icon size={15} className="text-accent" />
        {label}
      </span>
      <input
        type={type}
        required
        value={form[name]}
        onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
        placeholder={placeholder}
        className="w-full h-11 rounded-industrial bg-bg-surface border border-steel-500 px-3.5 text-sm text-ink-main placeholder:text-ink-faint focus-industrial transition-shadow"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-up" onClick={stage === 'submitting' ? undefined : onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-bg-primary border border-steel-500 rounded-industrial-lg shadow-industrial-lg animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-steel-500/60 bg-bg-elevated">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-accent" />
            <span className="font-bold text-ink-main">إتمام الطلب</span>
          </div>
          {stage !== 'submitting' && (
            <button onClick={onClose} className="text-ink-muted hover:text-accent transition-colors" aria-label="إغلاق">
              <X size={22} />
            </button>
          )}
        </div>

        <div className="p-5">
          {/* FORM STAGE */}
          {(stage === 'form' || stage === 'submitting') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-industrial bg-bg-surface border border-steel-500/50 p-3 mb-2">
                <div className="text-xs text-ink-faint mb-2">ملخص الطلب</div>
                <div className="space-y-1.5">
                  {items.map((i) => (
                    <div key={i.product.id} className="flex items-center justify-between text-sm">
                      <span className="text-ink-muted truncate max-w-[70%]">
                        {i.product.name} <span className="text-ink-faint">×{i.qty}</span>
                      </span>
                      <span className="text-ink-main font-bold">{formatPrice(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-steel-500/40 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink-main">الإجمالي ({count} قطعة)</span>
                  <span className="text-lg font-black text-accent">{formatPrice(total)}</span>
                </div>
                <div className="mt-2 text-xs text-success font-medium flex items-center gap-1">
                  <ShieldCheck size={13} /> الدفع عند الاستلام · توصيل خلال 48 ساعة
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {field('full_name', 'الاسم الكامل', User, 'text', 'مثال: محمد أمين')}
                {field('phone', 'رقم الهاتف', Phone, 'tel', '06 00 00 00 00')}
                <div className="sm:col-span-2">
                  {field('address', 'العنوان الكامل', MapPin, 'text', 'الحي، الشارع، رقم المنزل')}
                </div>
                {field('city', 'المدينة / المنطقة', Building2, 'text', 'مثال: وهران')}
              </div>

              <button
                type="submit"
                disabled={stage === 'submitting'}
                className="w-full h-12 rounded-industrial bg-accent text-bg-primary font-bold hover:bg-accent-yellow transition-colors active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
              >
                {stage === 'submitting' ? (
                  <><Loader2 size={20} className="animate-spin" /> جاري إنشاء الطلب...</>
                ) : (
                  <>تأكيد الطلب</>
                )}
              </button>
              <p className="text-center text-xs text-ink-faint">
                بالضغط على "تأكيد الطلب" يتم إنشاء طلبك في نظام CHIEKH FERRO وسيتواصل معك فريقنا للتأكيد.
              </p>
            </form>
          )}

          {/* SUCCESS STAGE */}
          {stage === 'success' && order && (
            <div className="text-center py-6 animate-fade-up">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 mb-4">
                <CheckCircle2 size={40} className="text-success" />
              </div>
              <h3 className="text-xl font-black text-ink-main">تم استلام طلبك بنجاح!</h3>
              <p className="mt-2 text-sm text-ink-muted max-w-sm mx-auto">
                شكراً لثقتك في CHIEKH FERRO. تم إنشاء طلبك في نظامنا وسيتواصل معك فريقنا قريباً لتأكيد التفاصيل والتوصيل.
              </p>

              {/* Order summary */}
              <div className="mt-5 mx-auto max-w-sm rounded-industrial-lg bg-bg-surface border border-steel-500/60 p-4 text-right">
                <div className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-ink-faint">رقم الطلب</span>
                  <span className="font-bold text-ink-main font-mono">
                    {order.order_number ? `#${order.order_number}` : order.order_id}
                  </span>
                </div>
                {order.total_price && (
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-ink-faint">الإجمالي</span>
                    <span className="font-bold text-accent">
                      {order.total_price} {order.currency ?? ''}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-ink-faint">الحالة</span>
                  <span className="font-bold text-success">قيد المعالجة</span>
                </div>
                <div className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-ink-faint">طريقة الدفع</span>
                  <span className="font-bold text-ink-main">الدفع عند الاستلام</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="h-11 px-6 rounded-industrial bg-accent text-bg-primary font-bold hover:bg-accent-yellow transition-colors inline-flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} /> متابعة التسوق
                </button>
                {order.invoice_url && (
                  <a
                    href={order.invoice_url}
                    target="_blank"
                    rel="noreferrer"
                    className="h-11 px-6 rounded-industrial bg-bg-surface border border-steel-500 text-ink-main font-bold hover:border-accent/50 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    عرض الفاتورة
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ERROR STAGE */}
          {stage === 'error' && (
            <div className="text-center py-8 animate-fade-up">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/15 mb-4">
                <AlertCircle size={40} className="text-danger" />
              </div>
              <h3 className="text-xl font-black text-ink-main">تعذر إتمام الطلب</h3>
              <p className="mt-2 text-sm text-ink-muted max-w-sm mx-auto">
                {errorMsg || 'حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.'}
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={() => setStage('form')}
                  className="h-11 px-6 rounded-industrial bg-accent text-bg-primary font-bold hover:bg-accent-yellow transition-colors"
                >
                  المحاولة مرة أخرى
                </button>
                <button
                  onClick={onClose}
                  className="h-11 px-6 rounded-industrial bg-bg-surface border border-steel-500 text-ink-main font-bold hover:border-accent/50 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
