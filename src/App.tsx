import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { CollectionPage } from '@/components/CollectionPage';
import { ProductDetailPage } from '@/components/ProductDetailPage';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import type { CategoryId, Product } from '@/data/catalog';

function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const handleOpenProduct = (p: Product) => {
    setOpenProduct(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setOpenProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (id: CategoryId | 'all') => {
    setOpenProduct(null);
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-bg-primary">
        <Header activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
        <main className="flex-1">
          {openProduct ? (
            <ProductDetailPage
              product={openProduct}
              onBack={handleBack}
              onSelectCategory={handleSelectCategory}
              onOpenProduct={handleOpenProduct}
            />
          ) : (
            <CollectionPage
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              onOpenProduct={handleOpenProduct}
            />
          )}
        </main>
        <Footer onSelectCategory={handleSelectCategory} />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
