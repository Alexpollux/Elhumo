'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  available: boolean
  order: number
}

interface Category {
  id: string
  name: string
  slug: string
  order: number
  items: MenuItem[]
}

export default function Menu({ categories }: { categories: Category[] }) {
  return (
    <section id="menu" className="py-24 px-6 bg-humo-cream">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-humo-orange font-medium text-sm uppercase tracking-[0.3em] mb-3">
            Notre carte
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-humo-brown mb-4">
            Fait avec passion,<br />servi avec fierté
          </h2>
          <div className="w-16 h-0.5 bg-humo-orange mx-auto" />
        </div>

        {/* Catégories */}
        <div className="space-y-16">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Titre catégorie */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display font-bold text-2xl text-humo-brown">
                  {category.name}
                </h3>
                <div className="flex-1 h-px bg-humo-kraft" />
              </div>

              {/* Plats */}
              <div className="grid md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={`relative bg-white rounded-2xl p-5 border border-humo-kraft transition-all overflow-hidden ${
                      item.available ? 'hover:shadow-md hover:border-humo-orange/30' : ''
                    }`}
                  >
                    {/* Overlay rupture diagonal */}
                    {!item.available && (
                      <>
                        <div className="absolute inset-0 bg-white/60 z-10 rounded-2xl" />
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <span
                            className="font-display font-bold text-3xl text-humo-orange select-none"
                            style={{ transform: 'rotate(-20deg)', letterSpacing: '0.25em', textShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                          >
                            RUPTURE
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {category.slug === 'tacos' && (
                            <Flame size={14} className="text-humo-orange shrink-0" />
                          )}
                          <h4 className="font-display font-semibold text-humo-brown text-lg leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        {item.description && (
                          <p className="text-sm text-humo-brown/60 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="font-display font-bold text-humo-orange text-lg shrink-0">
                        {item.price.toFixed(2).replace('.', ',')}€
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
