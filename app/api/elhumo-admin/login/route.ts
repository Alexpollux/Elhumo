import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, resetRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Récupère l'IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  // Vérifie le rate limit
  const limit = checkRateLimit(ip)

  if (!limit.allowed) {
    const minutes = Math.ceil((limit.retryAfterMs ?? 0) / 60000)
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${minutes} minute${minutes > 1 ? 's' : ''}.` },
      { status: 429 }
    )
  }

  const { email, password } = await request.json()

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const remaining = limit.remainingAttempts - 1
    const message = remaining > 0
      ? `Email ou mot de passe incorrect. ${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}.`
      : 'Email ou mot de passe incorrect.'
    return NextResponse.json({ error: message }, { status: 401 })
  }

  // Succès → reset le compteur
  resetRateLimit(ip)
  return NextResponse.json({ success: true })
}
