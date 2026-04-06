import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const { status } = await request.json()

  const reservation = await prisma.reservation.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(reservation)
}
