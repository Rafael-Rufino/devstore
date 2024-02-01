import getSearchProductsService from '@/app/services/SearchProductsService'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const product = await getSearchProductsService(query)

  const hasProduct = product.length > 0

  return (
    <>
      {!hasProduct ? (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Nenhum produto encontrado</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Resultados para: <span className="font-semibold">{query}</span>
          </p>

          <div className="grid grid-cols-3 gap-6">
            {product.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
              >
                <Image
                  src={product.image}
                  className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  width={480}
                  height={480}
                  quality={100}
                  alt={product.title}
                />
                <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5 ">
                  <span className="text-sm truncate">{product.title}</span>
                  <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Search
