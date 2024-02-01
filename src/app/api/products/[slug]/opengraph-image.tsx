import getProductsService from '@/app/services/ProductService'
import { env } from '@/env'
import { ImageResponse } from 'next/image'
import colors from 'tailwindcss/colors'

export const runtime = 'edge'

export const alt = 'A product image'

export const size = {
  width: 1200,
  height: 630,
}

export const contentTypes = 'image/png'

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProductsService(params.slug)
  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}
