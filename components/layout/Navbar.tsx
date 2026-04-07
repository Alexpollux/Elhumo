'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
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

        {/* CTA — visible sur desktop et mobile */}
        <a
          href="#reservation"
          className="bg-humo-orange text-white text-xs font-medium px-4 py-1.5 md:px-4 md:py-2 md:text-sm rounded-full hover:bg-humo-orange-dark transition-colors"
        >
          Réserver une table
        </a>
      </nav>
    </header>
  )
}
