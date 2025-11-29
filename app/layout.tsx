import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

// <CHANGE> Import custom fonts for HourGlass branding
import localFont from "next/font/local"

const chalkboard = localFont({
  src: [
    {
      path: "../fonts/chalkboard.ttf",
      weight: "400",
    },
  ],
  variable: "--font-chalkboard",
  fallback: ["cursive"],
})

const minecraft = localFont({
  src: [
    {
      path: "../fonts/minecraft.ttf",
      weight: "400",
    },
  ],
  variable: "--font-minecraft",
  fallback: ["monospace"],
})

export const metadata: Metadata = {
  title: "HourGlass - Premium Watches Store",
  description: "Luxury watches from top brands delivered to your door",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} ${chalkboard.variable} ${minecraft.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
