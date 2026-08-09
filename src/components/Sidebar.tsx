import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { CATEGORIES, BRANDS, POWER_SOURCES, VOLTAGE_OPTIONS, CAPACITY_OPTIONS, type CategoryId } from '@/data/catalog';

export interface FilterState {
  category: CategoryId | 'all';
  subcategory: string | null;
  brands: string[];
  powerSources: string[];
  voltages: string[];
  capacities: string[];
  minPrice: number;
  maxPrice: number;
}

interface SidebarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  priceBounds: [number, number];
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-steel-500/50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-right"
      >
        <span className="text-sm font-bold text-ink-main">{title}</span>
        <ChevronDown size={16} className={`text-ink-faint transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 space-y-2 animate-fade-up">{children}</div>}
    </div>
  );
}

function Checkbox({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
          checked ? 'bg-accent border-accent' : 'border-steel-400 group-hover:border-accent'
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 bg-bg-primary rounded-sm" />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`text-sm flex-1 ${checked ? 'text-ink-main font-medium' : 'text-ink-muted'} group-hover:text-ink-main transition-colors`}>
        {label}
      </span>
      {count != null && <span className="text-xs text-ink-faint">{count}</span>}
    </label>
  );
}

export function Sidebar({ filters, onChange, priceBounds }: SidebarProps) {
  const [min, max] = priceBounds;

  const toggleArray = (key: 'brands' | 'powerSources' | 'voltages' | 'capacities', value: string) => {
    const arr = filters[key];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  const setPrice = (kind: 'minPrice' | 'maxPrice', value: number) => {
    const clamped = Math.max(min, Math.min(max, value));
    if (kind === 'minPrice' && clamped > filters.maxPrice) return;
    if (kind === 'maxPrice' && clamped < filters.minPrice) return;
    onChange({ ...filters, [kind]: clamped });
  };

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <aside className="w-full">
      <div className="bg-bg-surface rounded-industrial-lg border border-steel-500/60 overflow-hidden">
        <div className="px-4 py-3 bg-bg-elevated border-b border-steel-500/60 flex items-center justify-between">
          <span className="text-sm font-bold text-ink-main">تصفية متقدمة</span>
          <button
            onClick={() => onChange({
              category: 'all', subcategory: null, brands: [], powerSources: [], voltages: [], capacities: [],
              minPrice: min, maxPrice: max,
            })}
            className="text-xs text-accent hover:text-accent-yellow font-medium"
          >
            مسح الكل
          </button>
        </div>

        <div className="px-4">
          {/* Category tree */}
          <FilterSection title="الفئات الرئيسية">
            <button
              onClick={() => onChange({ ...filters, category: 'all', subcategory: null })}
              className={`flex w-full items-center justify-between py-1.5 text-sm transition-colors ${
                filters.category === 'all' ? 'text-accent font-bold' : 'text-ink-muted hover:text-ink-main'
              }`}
            >
              <span>كل الفئات</span>
            </button>
            {CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <button
                  onClick={() =>
                    onChange({
                      ...filters,
                      category: cat.id,
                      subcategory: filters.category === cat.id ? filters.subcategory : null,
                    })
                  }
                  className={`flex w-full items-center justify-between py-1.5 text-sm transition-colors ${
                    filters.category === cat.id ? 'text-accent font-bold' : 'text-ink-muted hover:text-ink-main'
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${filters.category === cat.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {filters.category === cat.id && (
                  <div className="pr-4 space-y-1 animate-fade-up">
                    {cat.subcategories.map((s) => (
                      <button
                        key={s}
                        onClick={() => onChange({ ...filters, subcategory: filters.subcategory === s ? null : s })}
                        className={`flex w-full items-center gap-2 py-1 text-xs transition-colors ${
                          filters.subcategory === s ? 'text-accent' : 'text-ink-faint hover:text-ink-muted'
                        }`}
                      >
                        <span className="h-px w-3 bg-steel-400" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </FilterSection>

          {/* Price */}
          <FilterSection title="نطاق السعر (دج)">
            <div className="pt-6 pb-2">
              <div className="range-track">
                <div
                  className="range-fill"
                  style={{ right: `${pct(filters.minPrice)}%`, left: `${100 - pct(filters.maxPrice)}%` }}
                />
                <input
                  type="range" min={min} max={max} step={100}
                  value={filters.minPrice}
                  onChange={(e) => setPrice('minPrice', Number(e.target.value))}
                  className="range-input"
                  aria-label="الحد الأدنى للسعر"
                />
                <input
                  type="range" min={min} max={max} step={100}
                  value={filters.maxPrice}
                  onChange={(e) => setPrice('maxPrice', Number(e.target.value))}
                  className="range-input"
                  aria-label="الحد الأقصى للسعر"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="flex-1 rounded-industrial bg-bg-elevated border border-steel-500 px-2 py-1.5">
                <div className="text-[10px] text-ink-faint">من</div>
                <div className="text-sm font-bold text-ink-main">{filters.minPrice.toLocaleString()}</div>
              </div>
              <div className="flex-1 rounded-industrial bg-bg-elevated border border-steel-500 px-2 py-1.5">
                <div className="text-[10px] text-ink-faint">إلى</div>
                <div className="text-sm font-bold text-ink-main">{filters.maxPrice.toLocaleString()}</div>
              </div>
            </div>
          </FilterSection>

          {/* Brand */}
          <FilterSection title="الماركة">
            {BRANDS.map((b) => (
              <Checkbox
                key={b}
                label={b}
                checked={filters.brands.includes(b)}
                onChange={() => toggleArray('brands', b)}
              />
            ))}
          </FilterSection>

          {/* Power source */}
          <FilterSection title="مصدر الطاقة">
            {POWER_SOURCES.map((p) => (
              <Checkbox
                key={p}
                label={p}
                checked={filters.powerSources.includes(p)}
                onChange={() => toggleArray('powerSources', p)}
              />
            ))}
          </FilterSection>

          {/* Voltage */}
          <FilterSection title="الجهد الكهربائي" defaultOpen={false}>
            {VOLTAGE_OPTIONS.map((v) => (
              <Checkbox
                key={v}
                label={v}
                checked={filters.voltages.includes(v)}
                onChange={() => toggleArray('voltages', v)}
              />
            ))}
          </FilterSection>

          {/* Capacity */}
          <FilterSection title="السعة / الحجم" defaultOpen={false}>
            {CAPACITY_OPTIONS.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={filters.capacities.includes(c)}
                onChange={() => toggleArray('capacities', c)}
              />
            ))}
          </FilterSection>
        </div>
      </div>

      {/* Support card */}
      <div className="mt-4 bg-gradient-to-br from-bg-elevated to-bg-surface rounded-industrial-lg border border-accent/30 p-4">
        <div className="text-sm font-bold text-ink-main mb-1">تحتاج مساعدة في الاختيار؟</div>
        <div className="text-xs text-ink-muted mb-3">فريقنا التقني جاهز لمساعدتك في اختيار المعدات المناسبة.</div>
        <a
          href="https://wa.me/213555000000"
          className="flex items-center justify-center gap-2 h-9 rounded-industrial bg-success/15 text-success text-sm font-bold hover:bg-success/25 transition-colors"
        >
          تواصل عبر واتساب
        </a>
      </div>
    </aside>
  );
}

export function QtyStepper({ qty, onDec, onInc }: { qty: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="flex items-center gap-1 rounded-industrial border border-steel-400 bg-bg-elevated">
      <button onClick={onDec} className="h-7 w-7 flex items-center justify-center text-ink-muted hover:text-accent transition-colors" aria-label="إنقاص">
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-bold text-ink-main">{qty}</span>
      <button onClick={onInc} className="h-7 w-7 flex items-center justify-center text-ink-muted hover:text-accent transition-colors" aria-label="زيادة">
        <Plus size={14} />
      </button>
    </div>
  );
}
