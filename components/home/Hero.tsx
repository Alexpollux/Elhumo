'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=80')" }}
      />
      {/* Overlay kraft */}
      <div className="absolute inset-0 bg-humo-brown/60" />

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-humo-orange font-medium text-sm uppercase tracking-[0.3em] mb-6"
        >
          Cuisine mexicaine premium
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl text-white leading-tight mb-6"
        >
          L'âme du Mexique,<br />
          <span className="text-humo-orange">au feu de bois</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Tacos, burritos et quesadillas artisanaux. Ingrédients frais, recettes authentiques, fumée et caractère.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#menu"
            className="bg-humo-orange text-white font-medium px-8 py-4 rounded-full hover:bg-humo-orange-dark transition-colors text-sm uppercase tracking-wide"
          >
            Voir le menu
          </a>
          <a
            href="#reservation"
            className="border-2 border-white text-white font-medium px-8 py-4 rounded-full hover:bg-white hover:text-humo-brown transition-colors text-sm uppercase tracking-wide"
          >
            Réserver
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-white/30"
        />
      </motion.div>
    </section>
  )
}
