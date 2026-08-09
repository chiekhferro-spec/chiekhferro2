import {
  Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, CreditCard,
  Truck, BadgeCheck, ChevronLeft, Facebook, Instagram, Send,
} from 'lucide-react';
import { CATEGORIES, type CategoryId } from '@/data/catalog';

interface FooterProps {
  onSelectCategory: (id: CategoryId | 'all') => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  return (
    <footer className="mt-12 bg-bg-surface border-t border-steel-500/60">
      {/* Trust strip */}
      <div className="border-b border-steel-500/40 bg-bg-elevated">
        <div className="mx-auto max-w-[1400px] px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: 'توصيل سريع', sub: '48 ساعة لكل الولايات' },
            { icon: BadgeCheck, title: 'ضمان رسمي', sub: 'منتجات أصلية 100%' },
            { icon: ShieldCheck, title: 'دفع آمن', sub: 'حماية كاملة للمعاملات' },
            { icon: MessageCircle, title: 'دعم فني', sub: 'فريق متخصص 7/7' },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-industrial bg-bg-surface text-accent shrink-0">
                <t.icon size={22} />
              </div>
              <div>
                <div className="text-sm font-bold text-ink-main">{t.title}</div>
                <div className="text-xs text-ink-faint">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-industrial bg-accent text-bg-primary font-black text-xl shadow-glow">
                CF
              </div>
              <div className="leading-none">
                <div className="font-display font-black text-lg text-ink-main">CHIEKH FERRO</div>
                <div className="text-[10px] text-accent font-bold tracking-widest">شيخ فرو</div>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              CHIEKH FERRO علامة جزائرية متخصصة في تزويد المحترفين والورشات والمقاولات بالمعدات الثقيلة
              والأدوات الصناعية الأصلية. نجمع بين الجودة العالمية، الأسعار التنافسية، والخدمة التقنية
              المتكاملة — شريكك الموثوق في كل مشاريع البناء والصناعة.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Facebook, label: 'فيسبوك' },
                { icon: Instagram, label: 'انستغرام' },
                { icon: Send, label: 'تيليغرام' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-industrial bg-bg-elevated border border-steel-500 text-ink-muted hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-bold text-ink-main mb-4">معلومات عنا</h3>
            <ul className="space-y-2.5">
              {[
                'كل مايتعلق بنا',
                'معرفة كل شيء عنا',
                'سياسة الخصوصية والأمان',
                'الشروط والأحكام العامة (CGV)',
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="group flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors">
                    <ChevronLeft size={14} className="text-ink-faint group-hover:text-accent transition-colors" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-sm font-bold text-ink-main mb-4">خدمة الزبناء</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="group flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors">
                  <ChevronLeft size={14} className="text-ink-faint group-hover:text-accent transition-colors" />
                  تحتاج إلى المساعدة؟ (FAQ)
                </a>
              </li>
              <li>
                <a href="https://wa.me/213555000000" className="group flex items-center gap-1.5 text-sm text-ink-muted hover:text-success transition-colors">
                  <ChevronLeft size={14} className="text-ink-faint group-hover:text-success transition-colors" />
                  اتصل بنا (واتساب مباشر)
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors">
                  <ChevronLeft size={14} className="text-ink-faint group-hover:text-accent transition-colors" />
                  شروط الاسترجاع والاستبدال
                </a>
              </li>
            </ul>

            {/* Contact lines */}
            <div className="mt-5 space-y-2 text-xs text-ink-faint">
              <div className="flex items-center gap-2"><Phone size={13} className="text-accent" /> +213 555 000 000</div>
              <div className="flex items-center gap-2"><Mail size={13} className="text-accent" /> contact@chiekhferro.dz</div>
              <div className="flex items-center gap-2"><MapPin size={13} className="text-accent" /> المنطقة الصناعية، الجزائر</div>
              <div className="flex items-center gap-2"><Clock size={13} className="text-accent" /> السبت - الخميس: 07:30 - 19:00</div>
            </div>
          </div>

          {/* Categories + payments */}
          <div>
            <h3 className="text-sm font-bold text-ink-main mb-4">الفئات الرئيسية</h3>
            <ul className="space-y-2.5 mb-6">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCategory(c.id)}
                    className="group flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors text-right"
                  >
                    <ChevronLeft size={14} className="text-ink-faint group-hover:text-accent transition-colors" />
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-ink-main mb-3">طرق الدفع</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'بطاقة بنكية', icon: CreditCard },
                { label: 'الدفع عند الاستلام', icon: Truck },
                { label: 'تحويل بنكي', icon: ShieldCheck },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-1.5 rounded-industrial bg-bg-elevated border border-steel-500 px-2.5 py-1.5"
                >
                  <m.icon size={14} className="text-accent" />
                  <span className="text-[11px] text-ink-muted font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-steel-500/40 bg-steel-800">
        <div className="mx-auto max-w-[1400px] px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-ink-faint">
            © {new Date().getFullYear()} <span className="text-ink-muted font-bold">CHIEKH FERRO</span> — شيخ فرو. جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-4 text-xs text-ink-faint">
            <span>صُمم للمحترفين · صناعة ثقيلة</span>
            <span className="h-3 w-px bg-steel-400" />
            <span>متجر معتمد · ضمان أصلي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
