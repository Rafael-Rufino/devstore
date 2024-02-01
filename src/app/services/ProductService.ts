import { api } from '@/data/api'
import IProduct from '@/data/types/IProduct'

export default async function getProductsService(
  slug: string
): Promise<IProduct> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  })
  const Products = await response.json()
  return Products
}
