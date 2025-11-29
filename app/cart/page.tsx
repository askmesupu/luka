"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { watches, couponCodes } from "@/lib/data"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<string[]>([])
  const [delivery, setDelivery] = useState<"inside" | "outside">("inside")
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
  }, [])

  const deliveryCharge = delivery === "inside" ? 70 : 100
  const subtotal = cartItems.reduce((sum, itemId) => {
    const watch = watches.find((w) => w.id === itemId)
    return sum + (watch?.price || 0)
  }, 0)

  const coupon = couponCodes.find((c) => c.code === appliedCoupon)
  const couponDiscount = coupon ? Math.floor((subtotal * coupon.discount) / 100) : 0
  const total = subtotal - couponDiscount + deliveryCharge

  const applyCoupon = () => {
    const code = couponCode.toUpperCase()
    const coupon = couponCodes.find((c) => c.code === code)

    if (!coupon) {
      setCouponError("Invalid coupon code")
      return
    }

    if (!coupon.active) {
      setCouponError("This coupon is not active")
      return
    }

    setAppliedCoupon(code)
    setCouponError("")
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index)
    setCartItems(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const handleOrder = () => {
    if (!name || !number || !address) {
      alert("Please fill in all required fields")
      return
    }

    const orderData = {
      name,
      number,
      address,
      deliveryArea: delivery === "inside" ? "Inside Dhaka" : "Outside Dhaka",
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Bkash",
      items: cartItems.map((id) => {
        const watch = watches.find((w) => w.id === id)
        return { name: watch?.name, price: watch?.price }
      }),
      subtotal,
      deliveryCharge,
      couponDiscount,
      total,
      timestamp: new Date().toLocaleString(),
    }

    console.log("Order placed:", orderData)
    setOrderPlaced(true)
    localStorage.setItem("cart", JSON.stringify([]))

    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "/"
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-20 pb-8 text-center">
          <h1 className="text-minecraft text-3xl md:text-4xl font-bold text-accent mb-4">Order Placed Successfully!</h1>
          <p className="text-minecraft text-base text-muted-foreground mb-4">
            Thank you for your purchase. Your order will be delivered soon.
          </p>
          <p className="text-minecraft text-sm text-muted-foreground">Redirecting to home page...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-20 pb-8">
        <h1 className="text-minecraft text-3xl md:text-4xl font-bold text-accent mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-minecraft text-lg text-muted-foreground mb-4">Your cart is empty</p>
            <a href="/" className="text-minecraft text-base text-accent hover:text-accent/80 font-bold">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((itemId, index) => {
                  const watch = watches.find((w) => w.id === itemId)
                  if (!watch) return null

                  return (
                    <div key={index} className="luxury-card p-4 flex gap-4 md:gap-6 items-start md:items-center">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded">
                        <Image
                          src={watch.images[0] || "/placeholder.svg"}
                          alt={watch.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-minecraft font-bold text-foreground truncate">{watch.name}</h3>
                        <p className="text-minecraft text-sm text-muted-foreground">{watch.brand}</p>
                        <div className="text-minecraft text-lg font-bold text-accent mt-2">
                          {watch.price.toLocaleString("en-BD")} BDT
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-minecraft text-sm text-destructive hover:text-destructive/80 font-bold px-3 py-1 border border-destructive rounded hover:bg-destructive/10 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="luxury-card p-6 space-y-6 sticky top-24">
                <div>
                  <h3 className="text-minecraft font-bold text-foreground mb-3">Delivery Area</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        value="inside"
                        checked={delivery === "inside"}
                        onChange={(e) => setDelivery(e.target.value as "inside")}
                        className="w-4 h-4"
                      />
                      <span className="text-minecraft text-sm text-foreground">Inside Dhaka (70 BDT)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        value="outside"
                        checked={delivery === "outside"}
                        onChange={(e) => setDelivery(e.target.value as "outside")}
                        className="w-4 h-4"
                      />
                      <span className="text-minecraft text-sm text-foreground">Outside Dhaka (100 BDT)</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-minecraft font-bold text-foreground mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value as "cod")}
                        className="w-4 h-4"
                      />
                      <span className="text-minecraft text-sm text-foreground">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={paymentMethod === "bkash"}
                        onChange={(e) => setPaymentMethod(e.target.value as "bkash")}
                        className="w-4 h-4"
                      />
                      <span className="text-minecraft text-sm text-foreground">Bkash</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-minecraft font-bold text-foreground mb-3">Coupon Code</h3>
                  {appliedCoupon ? (
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500 rounded">
                      <span className="text-minecraft text-sm text-green-500 font-bold flex-1">
                        {appliedCoupon} ({coupon?.discount}% off)
                      </span>
                      <button onClick={removeCoupon} className="text-green-500 hover:text-green-600 font-bold">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError("")
                        }}
                        className="flex-1 bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border focus:border-accent outline-none transition-colors"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-accent text-primary-foreground text-minecraft text-sm px-4 py-2 rounded font-bold hover:bg-accent/80 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-minecraft text-xs text-destructive mt-2">{couponError}</p>}
                </div>

                <div className="border-t border-border pt-6 space-y-3">
                  <div className="flex justify-between text-minecraft text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-foreground font-bold">{subtotal.toLocaleString("en-BD")} BDT</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-minecraft text-sm">
                      <span className="text-muted-foreground">Coupon Discount:</span>
                      <span className="text-green-500 font-bold">-{couponDiscount.toLocaleString("en-BD")} BDT</span>
                    </div>
                  )}
                  <div className="flex justify-between text-minecraft text-sm">
                    <span className="text-muted-foreground">Delivery Charge:</span>
                    <span className="text-foreground font-bold">{deliveryCharge} BDT</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-minecraft text-lg font-bold">
                    <span className="text-foreground">Total:</span>
                    <span className="text-accent">{total.toLocaleString("en-BD")} BDT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="luxury-card p-6">
                <h3 className="text-minecraft text-xl font-bold text-foreground mb-6">Delivery Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-minecraft text-sm font-bold text-foreground mb-2">Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-secondary text-foreground text-minecraft text-base px-4 py-3 rounded border border-border focus:border-accent outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-minecraft text-sm font-bold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full bg-secondary text-foreground text-minecraft text-base px-4 py-3 rounded border border-border focus:border-accent outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-minecraft text-sm font-bold text-foreground mb-2">Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your delivery address"
                      rows={4}
                      className="w-full bg-secondary text-foreground text-minecraft text-base px-4 py-3 rounded border border-border focus:border-accent outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <button
                onClick={handleOrder}
                className="w-full bg-accent text-primary-foreground text-minecraft text-base py-4 rounded font-bold hover:bg-accent/80 transition-colors sticky top-96"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
