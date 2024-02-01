'use client'

import { useCart } from '@/contexts/cart-context'

interface AddButtonToCartProps {
  children: React.ReactNode
  productId: number
}

export const Button = ({ children, productId }: AddButtonToCartProps) => {
  const { addToCart } = useCart()
  const handleClick = () => {
    addToCart(productId)
  }
  return (
    <button
      onClick={handleClick}
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 font-semibold text-zinc-50"
    >
      {children}
    </button>
  )
}
