"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { watches } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Home() {
  const [cartItems, setCartItems] = useState<string[]>([])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
  }, [])

  const topSelling = watches.filter((w) => w.category === "top-selling")
  const menWatches = watches.filter((w) => w.category === "men")
  const womenWatches = watches.filter((w) => w.category === "women")
  const popularWatches = watches.filter((w) => w.category === "popular")

  const addToCart = (watchId: string) => {
    setCartItems([...cartItems, watchId])
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...existingCart, watchId]))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const buyNow = (watchId: string) => {
    addToCart(watchId)
    window.location.href = "/cart"
  }

  const WatchCard = ({ watch }: { watch: (typeof watches)[0] }) => (
    <div className="luxury-card p-4 md:p-6 animate-fade-in-up page-transition">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={watch.images[0] || "/placeholder.svg"}
          alt={watch.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        {watch.discount && watch.discount > 0 && (
          <div className="absolute top-2 right-2 bg-accent text-primary-foreground px-3 py-1 rounded text-minecraft text-xs font-bold animate-pulse-glow">
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
          className="flex-1 bg-foreground text-primary-foreground text-minecraft text-xs md:text-sm py-2 rounded hover:bg-accent hover:scale-105 transition-all duration-200 font-bold"
        >
          Buy Now
        </button>
        <button
          onClick={() => addToCart(watch.id)}
          className="flex-1 border border-foreground text-foreground text-minecraft text-xs md:text-sm py-2 rounded hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200 font-bold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )

  const CategorySection = ({ title, watches, href }: { title: string; watches: typeof watches; href: string }) => (
    <section className="mb-12 animate-fade-in page-transition">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-minecraft text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        <Link
          href={href}
          className="text-minecraft text-sm text-accent hover:text-accent/80 transition-colors duration-200"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {watches.slice(0, 4).map((watch, idx) => (
          <Link key={watch.id} href={`/product/${watch.id}`}>
            <div style={{ animationDelay: `${idx * 0.1}s` }}>
              <WatchCard watch={watch} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-20 pb-8">
        <section className="text-center mb-12 animate-fade-in page-transition">
          <h1 className="text-chalkboard text-4xl md:text-6xl text-accent mb-2 font-bold hover:scale-105 transition-transform duration-300">
            HourGlass
          </h1>
          <p className="text-minecraft text-sm md:text-base text-muted-foreground">Premium Watches for Every Moment</p>
        </section>

        <CategorySection title="⭐ Top Selling Watches" watches={topSelling} href="/category/top-selling" />
        <CategorySection title="👔 Men's Watches" watches={menWatches} href="/category/men" />
        <CategorySection title="👗 Women's Watches" watches={womenWatches} href="/category/women" />
        <CategorySection title="🔥 Popular Watches" watches={popularWatches} href="/category/popular" />
      </main>
      <Footer />
    </div>
  )
}
