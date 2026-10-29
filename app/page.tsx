'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import { products, categories } from '@/lib/products';
import type { Product } from '@/types/product';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Record<string, { product: Product; quantity: number }>>({});
  const [isCartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [search, selectedCategory]
  );

  const addToCart = (product: Product) => {
    const key = product.id.toString();
    setCart((prev) => ({
      ...prev,
      [key]: {
        product,
        quantity: prev[key] ? prev[key].quantity + 1 : 1
      }
    }));
    setCartOpen(true);
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const nextCart = { ...prev };
      delete nextCart[key];
      return nextCart;
    });
  };

  const updateQuantity = (key: string, amount: number) => {
    setCart((prev) => {
      const item = prev[key];
      if (!item) return prev;
      const quantity = item.quantity + amount;
      if (quantity <= 0) {
        const nextCart = { ...prev };
        delete nextCart[key];
        return nextCart;
      }
      return {
        ...prev,
        [key]: {
          ...item,
          quantity
        }
      };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalQuantity = Object.values(cart).reduce((count, item) => count + item.quantity, 0);
  const subtotal = Object.values(cart).reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Professional ecommerce UI</p>
          <h1>Shamol Shop</h1>
          <p className="hero-copy">Stylish product browsing, fast checkout, and modern cart experience built with Next.js.</p>
        </div>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          Cart ({totalQuantity})
        </button>
      </header>

      <section className="hero-panel">
        <div>
          <span className="badge">Trusted shopping experience</span>
          <h2>Shop the latest styles with smart filters and a polished interface.</h2>
          <p>Search products, choose categories, add items to cart, adjust quantities, and finalize your checkout with a responsive storefront layout.</p>
        </div>
        <div className="hero-image" aria-hidden="true" />
      </section>

      <section className="controls-row">
        <div className="search-field">
          <label htmlFor="search">Search products</label>
          <input
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search sneakers, jackets, headphones..."
          />
        </div>
        <div className="category-filter">
          <label>Category</label>
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="product-grid">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />
          ))
        ) : (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try a different search term or choose another category.</p>
          </div>
        )}
      </section>

      <section className="feature-panel">
        <article>
          <h3>Fast product discovery</h3>
          <p>Search instantly across curated collections and filter by category for an efficient shopping journey.</p>
        </article>
        <article>
          <h3>Smart cart controls</h3>
          <p>Add items with one click, update quantities, remove products, and see your subtotal update live.</p>
        </article>
        <article>
          <h3>Mobile-first layout</h3>
          <p>The design responds smoothly on phones, tablets, and desktop screens for every customer.</p>
        </article>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        total={subtotal}
        onRemove={removeFromCart}
        onUpdate={updateQuantity}
        onClear={clearCart}
        onCheckout={() => {
          if (!totalQuantity) {
            alert('Add products before checkout.');
            return;
          }
          alert(`Thank you! ${totalQuantity} item(s) ready for checkout.`);
          clearCart();
          setCartOpen(false);
        }}
      />
    </main>
  );
}
