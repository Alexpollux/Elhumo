'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react'

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
]

export default function Reservation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="reservation" className="py-24 px-6 bg-humo-brown">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className="text-humo-orange mx-auto mb-6" />
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Réservation confirmée !
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Merci <strong className="text-white">{form.name}</strong>. Nous avons bien reçu votre demande
              pour le <strong className="text-white">{form.date}</strong> à <strong className="text-white">{form.time}</strong>.
              Un email de confirmation vous a été envoyé à <strong className="text-white">{form.email}</strong>.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="reservation" className="py-24 px-6 bg-humo-brown">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texte gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-humo-orange font-medium text-sm uppercase tracking-[0.3em] mb-4">
              Réservation
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Réservez<br />votre table
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Vivez l'expérience El Humo autour d'une table. Réservez en quelques secondes et recevez votre confirmation par email.
            </p>

            <div className="space-y-4">
              {[
                { icon: Calendar, text: 'Ouvert 7j/7, midi et soir' },
                { icon: Clock, text: 'Service de 12h à 14h30 et 19h à 22h30' },
                { icon: Users, text: 'Groupes de 1 à 12 personnes' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/70">
                  <Icon size={18} className="text-humo-orange shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-humo-cream rounded-3xl p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Nom</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder="Marie Dupont"
                    className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Téléphone</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="vous@exemple.fr"
                  className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Date</label>
                  <input
                    name="date" type="date" value={form.date} onChange={handleChange} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown focus:outline-none focus:border-humo-orange transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Heure</label>
                  <select
                    name="time" value={form.time} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown focus:outline-none focus:border-humo-orange transition"
                  >
                    <option value="">Choisir</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Nombre de personnes</label>
                <select
                  name="guests" value={form.guests} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown focus:outline-none focus:border-humo-orange transition"
                >
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                    <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">Message (optionnel)</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Allergie, occasion spéciale..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-humo-orange text-white font-medium py-4 rounded-xl hover:bg-humo-orange-dark transition-colors disabled:opacity-60 uppercase tracking-wide text-sm"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Confirmer la réservation'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
