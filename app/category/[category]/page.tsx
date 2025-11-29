"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { watches } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [cartItems, setCartItems] = useState<string[]>([])

  const categoryWatches = watches.filter((w) => w.category === category)
  const categoryTitles: Record<string, string> = {
    men: "👔 Men's Watches",
    women: "👗 Women's Watches",
    popular: "🔥 Popular Watches",
    "top-selling": "⭐ Top Selling Watches",
  }

  if (!categoryWatches.length) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-20 pb-8 text-center">
          <p className="text-minecraft text-foreground">No watches in this category</p>
        </main>
        <Footer />
      </div>
    )
  }

  const addToCart = (watchId: string) => {
    setCartItems([...cartItems, watchId])
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...existingCart, watchId]))
  }

  const buyNow = (watchId: string) => {
    addToCart(watchId)
    window.location.href = "/cart"
  }

  const WatchCard = ({ watch }: { watch: (typeof watches)[0] }) => (
    <div className="luxury-card p-4 md:p-6 animate-fade-in-up">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={watch.images[0] || "/placeholder.svg"}
          alt={watch.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {watch.discount && watch.discount > 0 && (
          <div className="absolute top-2 right-2 bg-accent text-primary-foreground px-3 py-1 rounded text-minecraft text-xs font-bold">
            -{watch.discount}%
          </div>
        )}
      </div>
      <h3 className="text-minecraft text-sm md:text-base font-bold text-foreground mb-2 line-clamp-2">{watch.name}</h3>
      <p className="text-minecraft text-xs text-muted-foreground mb-3">{watch.brand}</p>
      <div className="space-y-1 mb-4">
        <div className="text-minecraft text-lg font-bold text-accent">{watch.price.toLocaleString("en-BD")} BDT</div>
        {watch.originalPrice && watch.originalPrice > watch.price && (
          <div className="text-minecraft text-xs text-muted-foreground line-through">
            {watch.originalPrice.toLocaleString("en-BD")} BDT
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => buyNow(watch.id)}
          className="flex-1 bg-foreground text-primary-foreground text-minecraft text-xs md:text-sm py-2 rounded hover:bg-accent transition-colors font-bold"
        >
          Buy Now
        </button>
        <button
          onClick={() => addToCart(watch.id)}
          className="flex-1 border border-foreground text-foreground text-minecraft text-xs md:text-sm py-2 rounded hover:border-accent hover:text-accent transition-colors font-bold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-20 pb-8">
        <h1 className="text-minecraft text-2xl md:text-4xl font-bold text-foreground mb-8">
          {categoryTitles[category] || "Watches"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryWatches.map((watch) => (
            <Link key={watch.id} href={`/product/${watch.id}`}>
              <WatchCard watch={watch} />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
