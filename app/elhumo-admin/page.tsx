'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/elhumo-admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push('/elhumo-admin/dashboard')
    router.refresh()
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
          <h1 className="font-display font-semibold text-humo-brown text-xl mb-6">
            Connexion administrateur
          </h1>

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

            <div>
              <label className="block text-xs font-medium text-humo-brown/60 uppercase tracking-wide mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-humo-orange text-white font-medium py-3 rounded-xl hover:bg-humo-orange-dark transition-colors disabled:opacity-60 text-sm uppercase tracking-wide"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="/elhumo-admin/forgot-password"
              className="text-sm text-humo-brown/50 hover:text-humo-orange transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
