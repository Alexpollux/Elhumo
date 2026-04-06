'use client'

import { useState } from 'react'
import { ToggleLeft, ToggleRight, Pencil, Check, X } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  available: boolean
}

interface Category {
  id: string
  name: string
  items: MenuItem[]
}

export default function MenuManager({ categories: initial }: { categories: Category[] }) {
  const [categories, setCategories] = useState(initial)
  const [editing, setEditing] = useState<{ id: string; price: string } | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  const toggleAvailability = async (id: string, available: boolean) => {
    setLoading(id)
    const res = await fetch(`/api/admin/menu/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: !available }),
    })
    if (res.ok) {
      setCategories((prev) => prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === id ? { ...item, available: !available } : item
        ),
      })))
    }
    setLoading(null)
  }

  const savePrice = async (id: string) => {
    if (!editing || editing.id !== id) return
    const price = parseFloat(editing.price)
    if (isNaN(price) || price <= 0) return

    setLoading(id)
    const res = await fetch(`/api/admin/menu/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    })
    if (res.ok) {
      setCategories((prev) => prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item) =>
          item.id === id ? { ...item, price } : item
        ),
      })))
      setEditing(null)
    }
    setLoading(null)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {categories.map((category) => (
        <div key={category.id}>
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-display font-bold text-base text-humo-brown">{category.name}</h3>
            <div className="flex-1 h-px bg-humo-kraft" />
          </div>

          <div className="bg-white rounded-xl border border-humo-kraft overflow-hidden">
            <ul className="divide-y divide-humo-kraft/40">
              {category.items.map((item) => (
                <li key={item.id} className={`px-5 py-4 flex items-center justify-between gap-3 transition-colors ${!item.available ? 'opacity-60 bg-humo-cream/30' : 'hover:bg-humo-cream/20'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-humo-brown text-sm truncate">{item.name}</p>
                      {!item.available && (
                        <span className="text-xs bg-humo-brown/10 text-humo-brown/60 px-2 py-0.5 rounded-full shrink-0">
                          Rupture
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-humo-brown/40 truncate">{item.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {editing?.id === item.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={editing.price}
                          onChange={(e) => setEditing({ id: item.id, price: e.target.value })}
                          className="w-16 px-2 py-1 rounded-lg border border-humo-orange text-sm text-humo-brown text-center focus:outline-none"
                          autoFocus
                        />
                        <button onClick={() => savePrice(item.id)} disabled={loading === item.id} className="text-green-600 hover:text-green-700">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setEditing(null)} className="text-red-500 hover:text-red-600">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditing({ id: item.id, price: item.price.toString() })}
                        className="flex items-center gap-1.5 text-base font-display font-bold text-humo-orange hover:text-humo-orange-dark transition-colors group"
                      >
                        {item.price.toFixed(2).replace('.', ',')}€
                        <Pencil size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}

                    <button
                      onClick={() => toggleAvailability(item.id, item.available)}
                      disabled={loading === item.id}
                      className="transition-colors disabled:opacity-50"
                      title={item.available ? 'Marquer en rupture' : 'Remettre en stock'}
                    >
                      {item.available
                        ? <ToggleRight size={28} className="text-green-500 hover:text-green-600" />
                        : <ToggleLeft size={28} className="text-humo-brown/30 hover:text-humo-brown/50" />
                      }
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
