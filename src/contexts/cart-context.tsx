'use client'
import { createContext, useContext, useState } from 'react'

interface ICartItem {
  productId: number
  quantity: number
}

interface CartContextType {
  items: ICartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  const addToCart = (productId: number) => {
    setCartItems((prevState) => {
      const productInCart = prevState.some(
        (item) => item.productId === productId
      )
      if (productInCart) {
        return prevState.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevState, { productId, quantity: 1 }]
      }
    })
  }
  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
