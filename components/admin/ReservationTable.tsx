'use client'

import { useState } from 'react'
import { Check, X, Clock } from 'lucide-react'

type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

interface Reservation {
  id: string
  name: string
  email: string
  phone: string | null
  date: Date
  guests: number
  message: string | null
  status: ReservationStatus
  createdAt: Date
}

const statusConfig = {
  PENDING:   { label: 'En attente',  color: 'bg-amber-100 text-amber-700',  icon: Clock },
  CONFIRMED: { label: 'Confirmée',   color: 'bg-green-100 text-green-700',  icon: Check },
  CANCELLED: { label: 'Annulée',     color: 'bg-red-100 text-red-600',      icon: X },
}

export default function ReservationTable({ reservations: initial }: { reservations: Reservation[] }) {
  const [reservations, setReservations] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)

  const updateStatus = async (id: string, status: ReservationStatus) => {
    setLoading(id)
    const res = await fetch(`/api/admin/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status } : r))
    }
    setLoading(null)
  }

  if (reservations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-humo-kraft p-12 text-center">
        <p className="text-3xl mb-3">📭</p>
        <p className="font-display font-semibold text-humo-brown">Aucune réservation</p>
        <p className="text-sm text-humo-brown/40 mt-1">Les réservations apparaîtront ici</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-humo-kraft overflow-hidden">
      <div className="px-6 py-4 border-b border-humo-kraft">
        <p className="font-display font-semibold text-humo-brown">Toutes les réservations</p>
      </div>
      <ul className="divide-y divide-humo-kraft/50">
        {reservations.map((r) => {
          const cfg = statusConfig[r.status]
          const StatusIcon = cfg.icon
          const date = new Date(r.date)
          return (
            <li key={r.id} className="px-6 py-4 hover:bg-humo-cream/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-humo-brown text-sm">{r.name}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${cfg.color}`}>
                      <StatusIcon size={11} />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-humo-brown/50 mb-0.5">
                    {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à{' '}
                    {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} · {r.guests} personne{r.guests > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-humo-brown/40">{r.email}{r.phone ? ` · ${r.phone}` : ''}</p>
                  {r.message && <p className="text-xs text-humo-brown/50 italic mt-1">"{r.message}"</p>}
                </div>

                {r.status === 'PENDING' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateStatus(r.id, 'CONFIRMED')}
                      disabled={loading === r.id}
                      className="flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Check size={12} /> Confirmer
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, 'CANCELLED')}
                      disabled={loading === r.id}
                      className="flex items-center gap-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X size={12} /> Annuler
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
