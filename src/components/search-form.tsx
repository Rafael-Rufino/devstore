'use client'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export const SearchForm = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) return null

    router.push(`/search?q=${query}`)
  }
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <SearchIcon className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        defaultValue={query || ''}
        type="text"
        placeholder="Buscar produtos..."
        className=" flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 focus:outline-none w-full"
      />
    </form>
  )
}
