'use client';

import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-preview" aria-hidden="true">
        <div className="product-hero" />
      </div>
      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-actions">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button className="button-primary" onClick={onAdd}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
