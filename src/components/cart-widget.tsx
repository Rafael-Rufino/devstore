'use client'
import { useCart } from '@/contexts/cart-context'
import { ShoppingBagIcon } from 'lucide-react'

export const CartWidget = () => {
  const { items } = useCart()
  const totalItems = items.length
  return (
    <div className="flex items-center gap-2">
      <ShoppingBagIcon className="w-4 h-4" />
      <span className="text-sm">Cart ({totalItems})</span>
    </div>
  )
}
