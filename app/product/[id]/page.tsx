"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { watches } from "@/lib/data"
import Image from "next/image"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function ProductDetail() {
  const params = useParams()
  const id = params.id as string
  const watch = watches.find((w) => w.id === id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [zoomedImage, setZoomedImage] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  if (!watch) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 pt-24 pb-8 text-center">
          <p className="text-minecraft text-foreground">Watch not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      if (direction === "in") return Math.min(prev + 0.2, 3)
      return Math.max(prev - 0.2, 1)
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...cart, watch.id]))
    alert("Added to cart!")
  }

  const buyNow = () => {
    addToCart()
    window.location.href = "/cart"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <div
              className="relative w-full aspect-square bg-secondary rounded-lg overflow-hidden cursor-zoom-in group"
              onClick={() => setZoomedImage(true)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={watch.images[selectedImage] || "/placeholder.svg"}
                alt={watch.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-foreground px-3 py-1 rounded text-minecraft text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Click to zoom
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {watch.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded flex-shrink-0 border-2 transition-all ${
                    selectedImage === idx ? "border-accent" : "border-border"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${watch.name} view ${idx + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-minecraft text-sm text-muted-foreground mb-2">{watch.brand}</p>
              <h1 className="text-minecraft text-2xl md:text-4xl font-bold text-foreground mb-2">{watch.name}</h1>
              <p className="text-minecraft text-base text-muted-foreground">{watch.description}</p>
            </div>

            <div className="space-y-2 p-4 bg-secondary rounded-lg">
              <div className="text-minecraft text-3xl font-bold text-accent">
                {watch.price.toLocaleString("en-BD")} BDT
              </div>
              {watch.originalPrice && watch.originalPrice > watch.price && (
                <>
                  <div className="text-minecraft text-sm text-muted-foreground line-through">
                    {watch.originalPrice.toLocaleString("en-BD")} BDT
                  </div>
                  <div className="text-minecraft text-sm text-accent font-bold">
                    Save {watch.discount}% ({(watch.originalPrice - watch.price).toLocaleString("en-BD")}) BDT
                  </div>
                </>
              )}
            </div>

            {watch.specifications && (
              <div className="space-y-3 p-4 bg-secondary rounded-lg">
                <h3 className="text-minecraft font-bold text-foreground mb-3">Specifications</h3>
                <div className="space-y-2">
                  {watch.specifications.material && (
                    <div className="flex justify-between">
                      <span className="text-minecraft text-sm text-muted-foreground">Material:</span>
                      <span className="text-minecraft text-sm text-foreground font-medium">
                        {watch.specifications.material}
                      </span>
                    </div>
                  )}
                  {watch.specifications.caseSize && (
                    <div className="flex justify-between">
                      <span className="text-minecraft text-sm text-muted-foreground">Case Size:</span>
                      <span className="text-minecraft text-sm text-foreground font-medium">
                        {watch.specifications.caseSize}
                      </span>
                    </div>
                  )}
                  {watch.specifications.movement && (
                    <div className="flex justify-between">
                      <span className="text-minecraft text-sm text-muted-foreground">Movement:</span>
                      <span className="text-minecraft text-sm text-foreground font-medium">
                        {watch.specifications.movement}
                      </span>
                    </div>
                  )}
                  {watch.specifications.waterResistance && (
                    <div className="flex justify-between">
                      <span className="text-minecraft text-sm text-muted-foreground">Water Resistance:</span>
                      <span className="text-minecraft text-sm text-foreground font-medium">
                        {watch.specifications.waterResistance}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={buyNow}
                className="w-full bg-foreground text-primary-foreground text-minecraft text-base py-3 rounded font-bold hover:bg-accent hover:text-primary-foreground transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={addToCart}
                className="w-full border-2 border-foreground text-foreground text-minecraft text-base py-3 rounded font-bold hover:border-accent hover:text-accent transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      {zoomedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={() => handleZoom("in")}
              className="bg-accent text-primary-foreground p-2 rounded text-minecraft text-sm font-bold hover:bg-accent/80"
            >
              +
            </button>
            <button
              onClick={() => handleZoom("out")}
              className="bg-accent text-primary-foreground p-2 rounded text-minecraft text-sm font-bold hover:bg-accent/80"
            >
              -
            </button>
            <button
              onClick={() => {
                setZoomedImage(false)
                setZoomLevel(1)
              }}
              className="bg-accent text-primary-foreground p-2 rounded text-minecraft text-sm font-bold hover:bg-accent/80"
            >
              ✕
            </button>
          </div>

          <div
            className="relative w-full h-full flex items-center justify-center overflow-auto"
            onMouseMove={handleMouseMove}
          >
            <div className="relative w-full max-w-2xl aspect-square">
              <Image
                src={watch.images[selectedImage] || "/placeholder.svg"}
                alt={watch.name}
                fill
                className="object-contain"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6 overflow-x-auto justify-center pb-2 max-w-full">
            {watch.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-12 h-12 rounded flex-shrink-0 border-2 transition-all ${
                  selectedImage === idx ? "border-accent" : "border-border"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${watch.name} view ${idx + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
