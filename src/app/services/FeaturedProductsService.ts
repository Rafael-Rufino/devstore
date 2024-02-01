import { api } from '@/data/api'
import IProduct from '@/data/types/IProduct'

export default async function getFeaturedProductsService(): Promise<
  IProduct[]
> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  })
  const featuredProducts = await response.json()
  return featuredProducts
}
