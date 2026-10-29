'use client';

import type { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  items: Record<string, CartItem>;
  onRemove: (key: string) => void;
  onUpdate: (key: string, amount: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartDrawer({ isOpen, onClose, total, items, onRemove, onUpdate, onClear, onCheckout }: CartDrawerProps) {
  return (
    <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`}>
      <div className="drawer">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Cart summary</p>
            <h2>Shopping cart</h2>
          </div>
          <button className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="drawer-content">
          {Object.keys(items).length ? (
            <>
              <div className="cart-items">
                {Object.entries(items).map(([key, item]) => (
                  <div key={key} className="cart-item">
                    <div>
                      <p className="cart-item-title">{item.product.name}</p>
                      <p className="cart-item-meta">{item.product.category}</p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button onClick={() => onUpdate(key, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdate(key, 1)}>+</button>
                      </div>
                      <p className="cart-item-price">{formatCurrency(item.product.price * item.quantity)}</p>
                      <button className="ghost-button" onClick={() => onRemove(key)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="drawer-footer">
                <div>
                  <p className="label">Subtotal</p>
                  <p className="subtotal">{formatCurrency(total)}</p>
                </div>
                <div className="drawer-actions">
                  <button className="ghost-button" onClick={onClear}>
                    Clear cart
                  </button>
                  <button className="button-primary" onClick={onCheckout}>
                    Checkout now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>Your cart is empty</h3>
              <p>Add some products to complete your order.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
