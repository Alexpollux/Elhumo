import { NextRequest, NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  await setAdminCookie()
  return NextResponse.json({ success: true })
}
