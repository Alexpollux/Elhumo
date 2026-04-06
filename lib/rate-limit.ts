import 'server-only'

interface Attempt {
  count: number
  firstAttempt: number
  blockedUntil?: number
}

const attempts = new Map<string, Attempt>()

const MAX_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000  // 15 minutes
const BLOCK_MS = 15 * 60 * 1000   // bloqué 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; retryAfterMs?: number } {
  const now = Date.now()
  const record = attempts.get(ip)

  // IP bloquée ?
  if (record?.blockedUntil && now < record.blockedUntil) {
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterMs: record.blockedUntil - now,
    }
  }

  // Fenêtre expirée → reset
  if (!record || now - record.firstAttempt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now })
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 }
  }

  // Incrément
  const newCount = record.count + 1

  if (newCount >= MAX_ATTEMPTS) {
    attempts.set(ip, { count: newCount, firstAttempt: record.firstAttempt, blockedUntil: now + BLOCK_MS })
    return { allowed: false, remainingAttempts: 0, retryAfterMs: BLOCK_MS }
  }

  attempts.set(ip, { ...record, count: newCount })
  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - newCount }
}

export function resetRateLimit(ip: string) {
  attempts.delete(ip)
}
