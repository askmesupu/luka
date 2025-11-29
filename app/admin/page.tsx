"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const ADMIN_USERNAME = "chutiya"
const ADMIN_PASSWORD = "instantrice2010"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [watches, setWatches] = useState<any[]>([])
  const [coupons, setCoupons] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<"watches" | "coupons">("watches")
  const [editingWatch, setEditingWatch] = useState<any>(null)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    const storedWatches = JSON.parse(localStorage.getItem("admin_watches") || "[]")
    const storedCoupons = JSON.parse(localStorage.getItem("admin_coupons") || "[]")

    if (storedWatches.length === 0) {
      // Initialize with default data
      const defaultWatches = [
        {
          id: "1",
          name: "Classic Black Steel",
          brand: "HourGlass",
          category: "men",
          price: 15000,
          originalPrice: 18000,
          discount: 16,
          description: "Elegant black steel watch with premium finish",
          specifications: { material: "Stainless Steel", waterResistance: "50m", movement: "Quartz", caseSize: "42mm" },
        },
      ]
      localStorage.setItem("admin_watches", JSON.stringify(defaultWatches))
      setWatches(defaultWatches)
    } else {
      setWatches(storedWatches)
    }

    if (storedCoupons.length === 0) {
      const defaultCoupons = [
        { code: "WELCOME10", discount: 10, active: true },
        { code: "SAVE20", discount: 20, active: true },
      ]
      localStorage.setItem("admin_coupons", JSON.stringify(defaultCoupons))
      setCoupons(defaultCoupons)
    } else {
      setCoupons(storedCoupons)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleWatchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let updatedWatches

    if (editingWatch) {
      updatedWatches = watches.map((w) => (w.id === editingWatch.id ? { ...formData } : w))
    } else {
      updatedWatches = [...watches, { ...formData, id: Date.now().toString() }]
    }

    setWatches(updatedWatches)
    localStorage.setItem("admin_watches", JSON.stringify(updatedWatches))
    resetWatchForm()
  }

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let updatedCoupons

    if (editingCoupon) {
      updatedCoupons = coupons.map((c) => (c.code === editingCoupon.code ? { ...formData } : c))
    } else {
      updatedCoupons = [...coupons, { ...formData }]
    }

    setCoupons(updatedCoupons)
    localStorage.setItem("admin_coupons", JSON.stringify(updatedCoupons))
    resetCouponForm()
  }

  const resetWatchForm = () => {
    setFormData({})
    setEditingWatch(null)
  }

  const resetCouponForm = () => {
    setFormData({})
    setEditingCoupon(null)
  }

  const editWatch = (watch: any) => {
    setEditingWatch(watch)
    setFormData(watch)
  }

  const deleteWatch = (id: string) => {
    const updatedWatches = watches.filter((w) => w.id !== id)
    setWatches(updatedWatches)
    localStorage.setItem("admin_watches", JSON.stringify(updatedWatches))
  }

  const editCoupon = (coupon: any) => {
    setEditingCoupon(coupon)
    setFormData(coupon)
  }

  const deleteCoupon = (code: string) => {
    const updatedCoupons = coupons.filter((c) => c.code !== code)
    setCoupons(updatedCoupons)
    localStorage.setItem("admin_coupons", JSON.stringify(updatedCoupons))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-md mx-auto px-4 pt-32 pb-8">
          <div className="luxury-card p-8">
            <h1 className="text-minecraft text-2xl md:text-3xl font-bold text-accent mb-8 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-minecraft text-sm font-bold text-foreground mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-secondary text-foreground text-minecraft px-4 py-3 rounded border border-border focus:border-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-minecraft text-sm font-bold text-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-secondary text-foreground text-minecraft px-4 py-3 rounded border border-border focus:border-accent outline-none transition-colors"
                />
              </div>
              {loginError && <p className="text-minecraft text-sm text-destructive text-center">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-accent text-primary-foreground text-minecraft font-bold py-3 rounded hover:bg-accent/80 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-chalkboard text-2xl text-accent font-bold">HourGlass Admin</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false)
              setUsername("")
              setPassword("")
            }}
            className="text-minecraft text-sm bg-destructive text-white px-4 py-2 rounded hover:bg-destructive/80 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("watches")}
            className={`text-minecraft font-bold py-3 px-6 border-b-2 transition-colors ${
              activeTab === "watches" ? "border-accent text-accent" : "border-transparent text-muted-foreground"
            }`}
          >
            Watches ({watches.length})
          </button>
          <button
            onClick={() => setActiveTab("coupons")}
            className={`text-minecraft font-bold py-3 px-6 border-b-2 transition-colors ${
              activeTab === "coupons" ? "border-accent text-accent" : "border-transparent text-muted-foreground"
            }`}
          >
            Coupons ({coupons.length})
          </button>
        </div>

        {activeTab === "watches" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {watches.length === 0 ? (
                  <p className="text-minecraft text-center text-muted-foreground py-8">No watches yet</p>
                ) : (
                  watches.map((watch) => (
                    <div key={watch.id} className="luxury-card p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-minecraft font-bold text-foreground">{watch.name}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editWatch(watch)}
                            className="text-minecraft text-xs bg-accent text-primary-foreground px-3 py-1 rounded hover:bg-accent/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteWatch(watch.id)}
                            className="text-minecraft text-xs bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/80"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-minecraft text-sm text-muted-foreground">{watch.description}</p>
                      <div className="flex gap-4 mt-2 text-minecraft text-sm">
                        <span className="text-accent font-bold">{watch.price} BDT</span>
                        {watch.originalPrice && (
                          <span className="text-muted-foreground line-through">{watch.originalPrice} BDT</span>
                        )}
                        {watch.discount && <span className="text-accent">-{watch.discount}%</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="luxury-card p-6 sticky top-24">
                <h3 className="text-minecraft font-bold text-foreground mb-6">
                  {editingWatch ? "Edit Watch" : "Add New Watch"}
                </h3>
                <form onSubmit={handleWatchSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Watch name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Brand"
                    value={formData.brand || ""}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                  />
                  <select
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="popular">Popular</option>
                    <option value="top-selling">Top Selling</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price (BDT)"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Original price"
                    value={formData.originalPrice || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Discount %"
                    value={formData.discount || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-accent text-primary-foreground text-minecraft text-sm font-bold py-2 rounded hover:bg-accent/80"
                    >
                      {editingWatch ? "Update" : "Add"}
                    </button>
                    {editingWatch && (
                      <button
                        type="button"
                        onClick={resetWatchForm}
                        className="flex-1 bg-secondary text-foreground text-minecraft text-sm font-bold py-2 rounded hover:bg-secondary/80"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === "coupons" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {coupons.length === 0 ? (
                  <p className="text-minecraft text-center text-muted-foreground py-8">No coupons yet</p>
                ) : (
                  coupons.map((coupon) => (
                    <div key={coupon.code} className="luxury-card p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-minecraft font-bold text-accent text-lg">{coupon.code}</h3>
                          <p className="text-minecraft text-sm text-muted-foreground">
                            {coupon.discount}% discount - {coupon.active ? "Active" : "Inactive"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editCoupon(coupon)}
                            className="text-minecraft text-xs bg-accent text-primary-foreground px-3 py-1 rounded hover:bg-accent/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCoupon(coupon.code)}
                            className="text-minecraft text-xs bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/80"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="luxury-card p-6 sticky top-24">
                <h3 className="text-minecraft font-bold text-foreground mb-6">
                  {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
                </h3>
                <form onSubmit={handleCouponSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={formData.code || ""}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none uppercase"
                    required
                    disabled={editingCoupon ? true : false}
                  />
                  <input
                    type="number"
                    placeholder="Discount %"
                    value={formData.discount || ""}
                    onChange={(e) => setFormData({ ...formData, discount: Number.parseInt(e.target.value) })}
                    className="w-full bg-secondary text-foreground text-minecraft text-sm px-3 py-2 rounded border border-border outline-none"
                    required
                  />
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active !== false}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-minecraft text-sm text-foreground">Active</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-accent text-primary-foreground text-minecraft text-sm font-bold py-2 rounded hover:bg-accent/80"
                    >
                      {editingCoupon ? "Update" : "Add"}
                    </button>
                    {editingCoupon && (
                      <button
                        type="button"
                        onClick={resetCouponForm}
                        className="flex-1 bg-secondary text-foreground text-minecraft text-sm font-bold py-2 rounded hover:bg-secondary/80"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
