import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'
import { Metadata } from 'next'

interface StoreLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | devstore',
    default: 'devstore',
  },
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
