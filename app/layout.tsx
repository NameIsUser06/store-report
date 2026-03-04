import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StoreReport — Automatic Monthly Reports for Shopify Stores',
  description: 'Connect Shopify, Stripe, and Meta Ads once. Get a clean performance report delivered to your inbox every month.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
