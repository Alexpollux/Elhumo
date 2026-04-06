'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError('Une erreur est survenue. Le lien a peut-être expiré.')
      setLoading(false)
      return
    }

    setDone(true)
    setTimeout(() => router.push('/elhumo-admin/dashboard'), 2000)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-humo-brown flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle size={64} className="text-humo-orange mx-auto mb-4" />
          <p className="font-display font-bold text-2xl text-white mb-2">Mot de passe mis à jour !</p>
          <p className="text-white/50 text-sm">Redirection en cours...</p>
        </div>
      </div>
    )
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
          <h1 className="font-display font-semibold text-humo-brown text-xl mb-2">
            Nouveau mot de passe
          </h1>
          <p className="text-sm text-humo-brown/50 mb-6">
            Choisissez un mot de passe sécurisé d'au moins 8 caractères.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="8 caractères minimum"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-humo-brown/40 hover:text-humo-brown transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-humo-kraft bg-white text-sm text-humo-brown placeholder-humo-brown/30 focus:outline-none focus:border-humo-orange transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-humo-orange text-white font-medium py-3 rounded-xl hover:bg-humo-orange-dark transition-colors disabled:opacity-60 text-sm uppercase tracking-wide"
            >
              {loading ? 'Mise à jour...' : 'Enregistrer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
