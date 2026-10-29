import type { Product } from '@/types/product';

export const categories = ['All', 'Sneakers', 'Accessories', 'Outerwear'];

export const products: Product[] = [
  {
    id: 1,
    name: 'Veloce Runner Sneakers',
    category: 'Sneakers',
    price: 98.0,
    description: 'Comfortable everyday sneakers with lightweight cushioning and breathable mesh.',
    image: '/images/sneakers-1.jpg'
  },
  {
    id: 2,
    name: 'Aura Classic Hoodie',
    category: 'Outerwear',
    price: 74.0,
    description: 'Soft fleece hoodie with a modern fit for cool-weather layering and street style.',
    image: '/images/hoodie-1.jpg'
  },
  {
    id: 3,
    name: 'Pulse Wireless Earbuds',
    category: 'Accessories',
    price: 54.0,
    description: 'Stream music with crisp sound and a secure fit for daily workouts and travel.',
    image: '/images/earbuds-1.jpg'
  },
  {
    id: 4,
    name: 'Motion Track Jacket',
    category: 'Outerwear',
    price: 120.0,
    description: 'Engineered jacket with wind-resistant fabric and a lightweight thermal lining.',
    image: '/images/jacket-1.jpg'
  },
  {
    id: 5,
    name: 'Stride Trail Sneakers',
    category: 'Sneakers',
    price: 110.0,
    description: 'Durable trail sneakers built for grip, comfort, and energetic city runs.',
    image: '/images/sneakers-2.jpg'
  },
  {
    id: 6,
    name: 'Nova Travel Backpack',
    category: 'Accessories',
    price: 48.0,
    description: 'Utility backpack with padded straps and storage pockets for daily essentials.',
    image: '/images/backpack-1.jpg'
  }
];
