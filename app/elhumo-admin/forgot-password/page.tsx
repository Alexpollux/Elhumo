'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/elhumo-admin/reset-password`,
    })

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-humo-brown flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display font-bold text-3xl text-white mb-1">
            El <span className="text-humo-orange">Humo</span>
          </p>
          <p className="text-white/40 text-sm uppercase tracking-widest">Back-office</p>
        </div>

        <div className="bg-humo-cream rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle size={48} className="text-humo-orange mx-auto mb-4" />
              <h2 className="font-display font-semibold text-humo-brown text-xl mb-2">
                Email envoyé !
              </h2>
              <p className="text-sm text-humo-brown/60 leading-relaxed">
                Vérifiez votre boîte mail. Le lien est valable <strong>15 minutes</strong>.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display font-semibold text-humo-brown text-xl mb-2">
                Mot de passe oublié
              </h1>
              <p className="text-sm text-humo-brown/50 mb-6">
                Entrez votre email pour recevoir un lien de réinitialisation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@elhumo.fr"
                    className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-humo-orange text-white font-medium py-3 rounded-xl hover:bg-humo-orange-dark transition-colors disabled:opacity-60 text-sm uppercase tracking-wide"
                >
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <a href="/elhumo-admin" className="inline-flex items-center gap-1.5 text-sm text-humo-brown/50 hover:text-humo-orange transition-colors">
              <ArrowLeft size={14} /> Retour à la connexion
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
