"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import Sidebar from "./sidebar"

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartCount(cart.length)
    }

    updateCartCount()
    window.addEventListener("storage", updateCartCount)
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between md:justify-center relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden absolute left-4 z-50 text-foreground hover:text-accent transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <svg className="w-6 h-6 animate-fade-in-scale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 animate-fade-in-scale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-3 justify-center md:justify-center animate-fade-in-up">
            <div className="relative w-12 h-12 md:w-16 md:h-16 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://i.ibb.co/d430dV52/20251104-154152.jpg"
                alt="HourGlass Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-chalkboard text-xl md:text-3xl text-accent font-bold hover:text-accent/90 transition-colors duration-300">
              HourGlass
            </span>
          </div>

          <Link
            href="/cart"
            className="absolute right-4 md:absolute md:right-8 text-minecraft text-sm text-foreground hover:text-accent transition-colors duration-200 flex items-center gap-2"
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-accent text-primary-foreground text-xs font-bold px-2 py-1 rounded-full animate-pulse-glow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}
