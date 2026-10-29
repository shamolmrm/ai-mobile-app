import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shamol Shop',
  description: 'Professional Next.js ecommerce UI with cart, search, and product filtering.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
