import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: number
    title: string
    price: number
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <Image 
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="font-semibold mb-2 line-clamp-2">{product.title}</h2>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
    </Link>
  )
}