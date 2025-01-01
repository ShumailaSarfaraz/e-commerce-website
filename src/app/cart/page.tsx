// src/app/cart/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

interface CartItem extends Product {
  quantity: number
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(items)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0)
    
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b py-4">
          <Image 
            src={item.image} 
            alt={item.title}
            width={100}
            height={100}
            className="object-contain"
          />
          <div className="flex-grow">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-gray-600">${item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="mt-8 text-right">
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  )
}