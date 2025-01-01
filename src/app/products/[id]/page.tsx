'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Product {
    id: number
    title: string
    price: number
    description: string
    image: string
  }

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [params.id])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product?.id)
    
    if (existingItem) {
      existingItem.quantity += 1
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    
    router.refresh()
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image 
            src={product.image} 
            alt={product.title}
            width={400}
            height={400}
            className="w-full object-contain"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <button 
            onClick={addToCart}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}