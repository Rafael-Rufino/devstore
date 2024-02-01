import { api } from '@/data/api'
import IProduct from '@/data/types/IProduct'

export default async function getSearchProductsService(
  query: string
): Promise<IProduct[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  })
  const Products = await response.json()
  return Products
}
