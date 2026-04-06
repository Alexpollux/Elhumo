import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await isAdminAuthenticated()
  if (!auth) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const body = await request.json()

  const item = await prisma.menuItem.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(item)
}
