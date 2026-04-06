'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-humo-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-2xl text-humo-brown tracking-wide">
          El <span className="text-humo-orange">Humo</span>
        </Link>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#reservation"
            className="bg-humo-orange text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-humo-orange-dark transition-colors"
          >
            Réserver une table
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2 text-humo-brown" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-humo-cream border-t border-humo-kraft px-6 py-6 flex flex-col gap-5">
          <a
            href="#reservation"
            onClick={() => setOpen(false)}
            className="bg-humo-orange text-white text-sm font-medium px-6 py-3 rounded-full text-center hover:bg-humo-orange-dark transition-colors"
          >
            Réserver une table
          </a>
        </div>
      )}
    </header>
  )
}
