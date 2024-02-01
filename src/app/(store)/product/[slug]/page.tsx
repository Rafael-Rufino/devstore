import getFeaturedProductsService from '@/app/services/FeaturedProductsService'
import getProductsService from '@/app/services/ProductService'
import { Button } from '@/components/add-button-to-cart'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductsService(params.slug)
  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const products = await getFeaturedProductsService()
  return products.map((product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductsService(params.slug)

  const installmentAmount = (product.price / 12).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <div className="relative grid max-h-[800px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            ou em 12x de {installmentAmount} sem juros
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-800 text-sm font-semibold border-zinc-700"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-800 text-sm font-semibold border-zinc-700"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-800 text-sm font-semibold border-zinc-700"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border bg-zinc-800 text-sm font-semibold border-zinc-700"
            >
              GG
            </button>
          </div>
        </div>

        <Button productId={product.id}>Adicionar ao carinho </Button>
      </div>
    </div>
  )
}
