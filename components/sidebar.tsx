"use client"

import Link from "next/link"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [adminOpen, setAdminOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Men's Watches", href: "/category/men" },
    { label: "Women's Watches", href: "/category/women" },
    { label: "Top Selling Watches", href: "/category/top-selling" },
    { label: "Popular Watches", href: "/category/popular" },
  ]

  const links = [
    { label: "Facebook", href: "https://www.facebook.com/share/19kuqxexRV/" },
    { label: "Developer", href: "https://www.facebook.com/share/17gJ18d9n4/" },
  ]

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto md:w-full md:border-r-0 md:border-b`}
      >
        <nav className="pt-20 md:pt-0 md:px-4 md:py-4 md:flex md:justify-center md:gap-8">
          <ul className="flex flex-col md:flex-row md:gap-8 gap-2 py-4 px-4 md:px-0">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-minecraft text-sm text-foreground hover:text-accent transition-colors block py-2 md:py-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="md:hidden">
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="text-minecraft text-sm text-foreground hover:text-accent transition-colors block py-2 w-full text-left"
              >
                Admin Panel
              </button>
              {adminOpen && (
                <div className="pl-4 mt-2">
                  <Link
                    href="/admin"
                    className="text-minecraft text-xs text-muted-foreground hover:text-accent transition-colors block py-2"
                    onClick={() => {
                      setIsOpen(false)
                      setAdminOpen(false)
                    }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </li>

            <li className="md:hidden border-t border-border pt-4 mt-4">
              <div className="space-y-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-minecraft text-xs text-muted-foreground hover:text-accent transition-colors block py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
