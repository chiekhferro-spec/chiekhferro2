export type CategoryId =
  | 'construction'
  | 'painting'
  | 'agriculture'
  | 'woodworking'
  | 'cleaning'
  | 'workshop'
  | 'generators'
  | 'industrial';

export type PowerSource = 'كهربائي' | 'بنزين' | 'ديزل' | 'بطارية' | 'يدوي' | 'هوائي' | 'هيدروليكي';

export interface Category {
  id: CategoryId;
  name: string;
  nameEn: string;
  tagline: string;
  icon: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  categoryId: CategoryId;
  subcategory: string;
  price: number;
  compareAt?: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  powerSource: PowerSource;
  voltage?: string;
  capacity?: string;
  badge?: 'bestseller' | 'new' | 'exclusive';
}

export interface CartItem {
  product: Product;
  qty: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'construction',
    name: 'معدات البناء',
    nameEn: 'Construction Equipment',
    tagline: 'خلاطات، رافعات، معدات ساحبة للرمال',
    icon: 'HardHat',
    subcategories: ['خلاطات الإسمنت', 'رافعات', 'مضخات الخرسانة', 'معدات الطرق', 'سقالات'],
  },
  {
    id: 'painting',
    name: 'معدات الصباغة',
    nameEn: 'Painting Equipment',
    tagline: 'مسدسات رش، مكابس، فرش احترافية',
    icon: 'PaintRoller',
    subcategories: ['مسدسات الرش', 'مكابس الهواء', 'فرش ودرفيل', 'أدوات التجهيز', 'رشاشات بدون هواء'],
  },
  {
    id: 'agriculture',
    name: 'معدات الفلاحة',
    nameEn: 'Agricultural Equipment',
    tagline: 'محراث، مناشير، مضخات ري',
    icon: 'Wheat',
    subcategories: ['محراث آلي', 'مناشير الأعشاب', 'مضخات الري', 'معدات الحصاد', 'شاكوشات هوائية'],
  },
  {
    id: 'woodworking',
    name: 'معدات النجارة',
    nameEn: 'Woodworking Tools',
    tagline: 'مناشير، فرّامات، راوترات',
    icon: 'TreePine',
    subcategories: ['مناشير الدائرة', 'فرّامات الخشب', 'راوترات', 'مثقاب النجارة', 'معدات الحفر'],
  },
  {
    id: 'cleaning',
    name: 'معدات النظافة',
    nameEn: 'Professional Cleaning Equipment',
    tagline: 'غسالات ضغط، مكانس صناعية',
    icon: 'Sparkles',
    subcategories: ['غسالات الضغط', 'مكانس صناعية', 'بخارات التنظيف', 'مكانس يدوية', 'أدوات الصيانة'],
  },
  {
    id: 'workshop',
    name: 'معدات الورشة',
    nameEn: 'Workshop Equipment',
    tagline: 'مكابس، رافعات، طاولات عمل',
    icon: 'Wrench',
    subcategories: ['مكابس الورشة', 'رافعات السيارات', 'طاولات العمل', 'عربات الأدوات', 'أدوات يدوية'],
  },
  {
    id: 'generators',
    name: 'مولدات كهربائية',
    nameEn: 'Electric Generators',
    tagline: 'مولدات بنزين وديزل، إنفرتر',
    icon: 'Zap',
    subcategories: ['مولدات بنزين', 'مولدات ديزل', 'مولدات إنفرتر', 'مولدات محمولة', 'مولدات احتياطية'],
  },
  {
    id: 'industrial',
    name: 'معدات صناعية',
    nameEn: 'Industrial Machinery',
    tagline: 'كومبروسورات، آلات ثقيلة، خطوط إنتاج',
    icon: 'Factory',
    subcategories: ['كومبروسورات', 'آلات ثقيلة', 'خطوط إنتاج', 'معدات اللحام', 'معدات الرفع'],
  },
];

export const BRANDS = [
  'BOSCH',
  'Makita',
  'DeWalt',
  'Stanley',
  'Hilti',
  'Milwaukee',
  'Karcher',
  'Honda',
  'Yamaha',
  'CHIEKH FERRO PRO',
];

export const POWER_SOURCES: PowerSource[] = [
  'كهربائي',
  'بنزين',
  'ديزل',
  'بطارية',
  'يدوي',
  'هوائي',
  'هيدروليكي',
];

export const VOLTAGE_OPTIONS = ['12V', '24V', '110V', '220V', '380V', 'متعدد'];
export const CAPACITY_OPTIONS = ['صغير', 'متوسط', 'كبير', 'صناعي'];

// Pexels stock — industrial tools/machinery
const IMG = {
  mixer: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=900',
  drill: 'https://images.pexels.com/photos/8961341/pexels-photo-8961341.jpeg?auto=compress&cs=tinysrgb&w=900',
  saw: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=900',
  compressor: 'https://images.pexels.com/photos/8062063/pexels-photo-8062063.jpeg?auto=compress&cs=tinysrgb&w=900',
  generator: 'https://images.pexels.com/photos/9069824/pexels-photo-9069824.jpeg?auto=compress&cs=tinysrgb&w=900',
  welder: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=900',
  washer: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=900',
  mower: 'https://images.pexels.com/photos/5825036/pexels-photo-5825036.jpeg?auto=compress&cs=tinysrgb&w=900',
  paint: 'https://images.pexels.com/photos/5763196/pexels-photo-5763196.jpeg?auto=compress&cs=tinysrgb&w=900',
  lift: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=900',
  grinder: 'https://images.pexels.com/photos/8961342/pexels-photo-8961342.jpeg?auto=compress&cs=tinysrgb&w=900',
  hammer: 'https://images.pexels.com/photos/8961340/pexels-photo-8961340.jpeg?auto=compress&cs=tinysrgb&w=900',
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1', sku: 'CF-CON-001', name: 'خلاطة إسمنت كهربائية 350 لتر', brand: 'CHIEKH FERRO PRO',
    categoryId: 'construction', subcategory: 'خلاطات الإسمنت', price: 4200, compareAt: 5100,
    image: IMG.mixer, rating: 4.7, reviews: 128, stock: 14, powerSource: 'كهربائي', voltage: '220V',
    capacity: 'كبير', badge: 'bestseller',
  },
  {
    id: 'p2', sku: 'CF-CON-002', name: 'رافعة بناء هيدروليكية 2 طن', brand: 'Stanley',
    categoryId: 'construction', subcategory: 'رافعات', price: 8900, compareAt: 10500,
    image: IMG.lift, rating: 4.9, reviews: 64, stock: 6, powerSource: 'هيدروليكي', capacity: 'صناعي',
    badge: 'exclusive',
  },
  {
    id: 'p3', sku: 'CF-CON-003', name: 'مضخة خرسانة محمولة', brand: 'Hilti',
    categoryId: 'construction', subcategory: 'مضخات الخرسانة', price: 12500,
    image: IMG.mixer, rating: 4.5, reviews: 32, stock: 3, powerSource: 'كهربائي', voltage: '380V',
  },
  {
    id: 'p4', sku: 'CF-PNT-001', name: 'مسدس رش دهان بدون هواء 700W', brand: 'BOSCH',
    categoryId: 'painting', subcategory: 'رشاشات بدون هواء', price: 1850, compareAt: 2300,
    image: IMG.paint, rating: 4.6, reviews: 211, stock: 28, powerSource: 'كهربائي', voltage: '220V',
    badge: 'bestseller',
  },
  {
    id: 'p5', sku: 'CF-PNT-002', name: 'مكبس هواء 100 لتر للمقاص', brand: 'Makita',
    categoryId: 'painting', subcategory: 'مكابس الهواء', price: 3200,
    image: IMG.compressor, rating: 4.8, reviews: 95, stock: 11, powerSource: 'كهربائي', voltage: '220V',
    capacity: 'كبير',
  },
  {
    id: 'p6', sku: 'CF-PNT-003', name: 'رشاش هوائي احترافي 1.4mm', brand: 'CHIEKH FERRO PRO',
    categoryId: 'painting', subcategory: 'مسدسات الرش', price: 640, compareAt: 790,
    image: IMG.paint, rating: 4.4, reviews: 156, stock: 52, powerSource: 'هوائي',
    badge: 'new',
  },
  {
    id: 'p7', sku: 'CF-AGR-001', name: 'محراث آلي متعدد الوظائف', brand: 'Honda',
    categoryId: 'agriculture', subcategory: 'محراث آلي', price: 6700, compareAt: 7900,
    image: IMG.mower, rating: 4.6, reviews: 48, stock: 9, powerSource: 'بنزين',
    badge: 'bestseller',
  },
  {
    id: 'p8', sku: 'CF-AGR-002', name: 'منشار أعشاب بنزين 52cc', brand: 'Yamaha',
    categoryId: 'agriculture', subcategory: 'مناشير الأعشاب', price: 1450,
    image: IMG.mower, rating: 4.5, reviews: 187, stock: 24, powerSource: 'بنزين',
  },
  {
    id: 'p9', sku: 'CF-AGR-003', name: 'مضخة ري غاطسة 2HP', brand: 'CHIEKH FERRO PRO',
    categoryId: 'agriculture', subcategory: 'مضخات الري', price: 2100, compareAt: 2500,
    image: IMG.washer, rating: 4.7, reviews: 73, stock: 17, powerSource: 'كهربائي', voltage: '220V',
  },
  {
    id: 'p10', sku: 'CF-WD-001', name: 'منشار دائري نجارة 1800W', brand: 'Makita',
    categoryId: 'woodworking', subcategory: 'مناشير الدائرة', price: 1280, compareAt: 1550,
    image: IMG.saw, rating: 4.8, reviews: 302, stock: 19, powerSource: 'كهربائي', voltage: '220V',
    badge: 'bestseller',
  },
  {
    id: 'p11', sku: 'CF-WD-002', name: 'فرّامة خشب احترافية 2000W', brand: 'DeWalt',
    categoryId: 'woodworking', subcategory: 'فرّامات الخشب', price: 2950,
    image: IMG.saw, rating: 4.7, reviews: 118, stock: 8, powerSource: 'كهربائي', voltage: '220V',
  },
  {
    id: 'p12', sku: 'CF-WD-003', name: 'راوتر نجارة 1600W + طاولة', brand: 'BOSCH',
    categoryId: 'woodworking', subcategory: 'راوترات', price: 3400, compareAt: 3900,
    image: IMG.drill, rating: 4.6, reviews: 54, stock: 5, powerSource: 'كهربائي', voltage: '220V',
    badge: 'new',
  },
  {
    id: 'p13', sku: 'CF-CLN-001', name: 'غسالة ضغط 3500 PSI بنزين', brand: 'Karcher',
    categoryId: 'cleaning', subcategory: 'غسالات الضغط', price: 5400, compareAt: 6200,
    image: IMG.washer, rating: 4.9, reviews: 142, stock: 7, powerSource: 'بنزين',
    badge: 'exclusive',
  },
  {
    id: 'p14', sku: 'CF-CLN-002', name: 'مكنسة صناعية 80 لتر', brand: 'Karcher',
    categoryId: 'cleaning', subcategory: 'مكانس صناعية', price: 2750,
    image: IMG.washer, rating: 4.5, reviews: 67, stock: 13, powerSource: 'كهربائي', voltage: '220V',
    capacity: 'كبير',
  },
  {
    id: 'p15', sku: 'CF-CLN-003', name: 'بخار تنظيف صناعي 180°C', brand: 'CHIEKH FERRO PRO',
    categoryId: 'cleaning', subcategory: 'بخارات التنظيف', price: 3900, compareAt: 4400,
    image: IMG.washer, rating: 4.6, reviews: 41, stock: 10, powerSource: 'كهربائي', voltage: '220V',
    badge: 'new',
  },
  {
    id: 'p16', sku: 'CF-WSH-001', name: 'مكبس ورشة 200 لتر 3HP', brand: 'Makita',
    categoryId: 'workshop', subcategory: 'مكابس الورشة', price: 4600, compareAt: 5200,
    image: IMG.compressor, rating: 4.8, reviews: 89, stock: 6, powerSource: 'كهربائي', voltage: '380V',
    capacity: 'صناعي', badge: 'bestseller',
  },
  {
    id: 'p17', sku: 'CF-WSH-002', name: 'رافعة سيارات هيدروليكية 3 طن', brand: 'Stanley',
    categoryId: 'workshop', subcategory: 'رافعات السيارات', price: 1980,
    image: IMG.lift, rating: 4.7, reviews: 134, stock: 22, powerSource: 'هيدروليكي',
  },
  {
    id: 'p18', sku: 'CF-WSH-003', name: 'طاولة عمل ورشة فولاذية', brand: 'CHIEKH FERRO PRO',
    categoryId: 'workshop', subcategory: 'طاولات العمل', price: 1200, compareAt: 1450,
    image: IMG.lift, rating: 4.5, reviews: 76, stock: 31, powerSource: 'يدوي',
  },
  {
    id: 'p19', sku: 'CF-GEN-001', name: 'مولد كهربائي بنزين 5KVA', brand: 'Honda',
    categoryId: 'generators', subcategory: 'مولدات بنزين', price: 7800, compareAt: 8900,
    image: IMG.generator, rating: 4.9, reviews: 256, stock: 12, powerSource: 'بنزين',
    badge: 'bestseller',
  },
  {
    id: 'p20', sku: 'CF-GEN-002', name: 'مولد ديزل 10KVA ببدء تلقائي', brand: 'Yamaha',
    categoryId: 'generators', subcategory: 'مولدات ديزل', price: 14500, compareAt: 16500,
    image: IMG.generator, rating: 4.8, reviews: 98, stock: 4, powerSource: 'ديزل',
    capacity: 'صناعي', badge: 'exclusive',
  },
  {
    id: 'p21', sku: 'CF-GEN-003', name: 'مولد إنفرتر صامت 3KVA', brand: 'Honda',
    categoryId: 'generators', subcategory: 'مولدات إنفرتر', price: 6200,
    image: IMG.generator, rating: 4.7, reviews: 143, stock: 9, powerSource: 'بنزين',
    badge: 'new',
  },
  {
    id: 'p22', sku: 'CF-IND-001', name: 'كومبروسور 500 لتر صناعي', brand: 'Makita',
    categoryId: 'industrial', subcategory: 'كومبروسورات', price: 9800, compareAt: 11200,
    image: IMG.compressor, rating: 4.9, reviews: 72, stock: 3, powerSource: 'كهربائي', voltage: '380V',
    capacity: 'صناعي', badge: 'bestseller',
  },
  {
    id: 'p23', sku: 'CF-IND-002', name: 'ماكينة لحام إنفرتر 300A', brand: 'CHIEKH FERRO PRO',
    categoryId: 'industrial', subcategory: 'معدات اللحام', price: 3400, compareAt: 3900,
    image: IMG.welder, rating: 4.7, reviews: 168, stock: 18, powerSource: 'كهربائي', voltage: '380V',
    badge: 'bestseller',
  },
  {
    id: 'p24', sku: 'CF-IND-003', name: 'شاكوش كهربائي 25kg صناعي', brand: 'Hilti',
    categoryId: 'industrial', subcategory: 'آلات ثقيلة', price: 5600,
    image: IMG.hammer, rating: 4.8, reviews: 54, stock: 7, powerSource: 'كهربائي', voltage: '220V',
    capacity: 'صناعي', badge: 'exclusive',
  },
];

export const PROMO_SLIDES = [
  {
    id: 's1',
    title: 'تخفيضات ضخمة على الأدوات الكهربائية',
    subtitle: 'حتى 40% خصم على الماركات العالمية',
    cta: 'تسوق الآن',
    href: '#construction',
    accent: 'rgba(255,140,0,0.18)',
  },
  {
    id: 's2',
    title: 'مولدات كهربائية بضمان 3 سنوات',
    subtitle: 'طاقة موثوقة لكل الظروف — توصيل مجاني',
    cta: 'اكتشف المجموعة',
    href: '#generators',
    accent: 'rgba(245,166,35,0.16)',
  },
  {
    id: 's3',
    title: 'معدات الورشة الاحترافية',
    subtitle: 'مكابس، رافعات، طاولات — جودة صناعية',
    cta: 'تصفح المجموعة',
    href: '#workshop',
    accent: 'rgba(255,140,0,0.14)',
  },
];

export const formatPrice = (n: number): string =>
  new Intl.NumberFormat('ar-DZ', { maximumFractionDigits: 0 }).format(n) + ' دج';

export interface SpecRow {
  label: string;
  value: string;
}

export function getSpecs(p: Product): SpecRow[] {
  const rows: SpecRow[] = [
    { label: 'الماركة', value: p.brand },
    { label: 'رقم SKU', value: p.sku },
    { label: 'الفئة', value: p.subcategory },
    { label: 'مصدر الطاقة', value: p.powerSource },
  ];
  if (p.voltage) rows.push({ label: 'الجهد الكهربائي', value: p.voltage });
  if (p.capacity) rows.push({ label: 'السعة / الحجم', value: p.capacity });
  rows.push({ label: 'الضمان', value: 'ضمان رسمي 24 شهر' });
  rows.push({ label: 'المنشأ', value: 'مستورد أصلي' });
  return rows;
}

export function getDescription(p: Product): string {
  const power = p.voltage ? ` (${p.voltage})` : '';
  return `معدة ${p.name} من ${p.brand} مصممة للاستخدام المكثف في الورشات والمواقع الصناعية. ` +
    `تعمل بطاقة ${p.powerSource}${power} بأداء ثابت وموثوقية عالية، مع بنية متينة تقاوم ظروف العمل القاسية. ` +
    `تأتي بضمان رسمي معتمد وقطع غيار متوفرة، مثالية للمحترفين والمقاولات.`;
}

export function getRelated(p: Product, count = 4): Product[] {
  return PRODUCTS.filter((x) => x.categoryId === p.categoryId && x.id !== p.id).slice(0, count);
}

export const WHATSAPP_NUMBER = '213555000000';

export function buildWhatsAppLink(product: Product, qty: number): string {
  const text = `مرحباً CHIEKH FERRO، أرغب في طلب عرض سعر لـ:\n\n` +
    `• المنتج: ${product.name}\n• المرجع: ${product.sku}\n• الماركة: ${product.brand}\n• الكمية: ${qty}\n\nشكراً.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
