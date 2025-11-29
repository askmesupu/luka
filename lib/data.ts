export interface Watch {
  id: string
  name: string
  category: "men" | "women" | "popular" | "top-selling"
  images: string[]
  price: number
  originalPrice?: number
  discount?: number
  description: string
  brand: string
  specifications?: {
    material?: string
    waterResistance?: string
    movement?: string
    caseSize?: string
  }
}

export const watches: Watch[] = [
  {
    id: "1",
    name: "Classic Black Steel",
    category: "men",
    images: ["/black-steel-watch-mens.jpg", "/watch-detail-mens.jpg"],
    price: 15000,
    originalPrice: 18000,
    discount: 16,
    description: "Elegant black steel watch with premium finish",
    brand: "HourGlass",
    specifications: {
      material: "Stainless Steel",
      waterResistance: "50m",
      movement: "Quartz",
      caseSize: "42mm",
    },
  },
  {
    id: "2",
    name: "Rose Gold Elegance",
    category: "women",
    images: ["/rose-gold-watch-womens.jpg", "/womens-watch-detail.jpg"],
    price: 18000,
    originalPrice: 22000,
    discount: 18,
    description: "Sophisticated rose gold watch for women",
    brand: "HourGlass",
    specifications: {
      material: "Rose Gold Plated",
      waterResistance: "30m",
      movement: "Quartz",
      caseSize: "36mm",
    },
  },
  {
    id: "3",
    name: "Ultimate Silver",
    category: "top-selling",
    images: ["/silver-luxury-watch.png", "/premium-silver-watch.jpg"],
    price: 12000,
    originalPrice: 14000,
    discount: 14,
    description: "Best-selling silver watch with classic design",
    brand: "HourGlass",
    specifications: {
      material: "Silver Stainless Steel",
      waterResistance: "50m",
      movement: "Automatic",
      caseSize: "40mm",
    },
  },
  {
    id: "4",
    name: "Modern Gold",
    category: "popular",
    images: ["/gold-watch-luxury.jpg", "/gold-watch-premium.jpg"],
    price: 16000,
    originalPrice: 19000,
    discount: 15,
    description: "Popular gold-toned watch for everyday wear",
    brand: "HourGlass",
    specifications: {
      material: "Gold Plated",
      waterResistance: "50m",
      movement: "Quartz",
      caseSize: "38mm",
    },
  },
  {
    id: "5",
    name: "Midnight Black Pro",
    category: "men",
    images: ["/black-professional-watch-mens.jpg", "/sports-watch-mens.jpg"],
    price: 20000,
    originalPrice: 25000,
    discount: 20,
    description: "Professional black watch for men with sport features",
    brand: "HourGlass",
    specifications: {
      material: "Titanium",
      waterResistance: "100m",
      movement: "Automatic",
      caseSize: "44mm",
    },
  },
  {
    id: "6",
    name: "Crystal White",
    category: "women",
    images: ["/white-elegant-watch-womens.jpg", "/white-diamond-watch.jpg"],
    price: 17000,
    originalPrice: 21000,
    discount: 19,
    description: "Crystal white watch with elegant design for women",
    brand: "HourGlass",
    specifications: {
      material: "White Gold Plated",
      waterResistance: "30m",
      movement: "Quartz",
      caseSize: "34mm",
    },
  },
]

export interface CouponCode {
  code: string
  discount: number
  active: boolean
}

export const couponCodes: CouponCode[] = [
  { code: "WELCOME10", discount: 10, active: true },
  { code: "SAVE20", discount: 20, active: true },
  { code: "LUXURY15", discount: 15, active: true },
]
