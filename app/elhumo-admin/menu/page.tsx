import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import AdminSidebar from '@/components/admin/AdminSidebar'
import MenuManager from '@/components/admin/MenuManager'

export default async function AdminMenuPage() {
  const auth = await isAdminAuthenticated()
  if (!auth) redirect('/elhumo-admin')

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      items: { orderBy: { order: 'asc' } },
    },
  })

  return (
    <div className="flex min-h-screen bg-humo-cream">
      <AdminSidebar />
      <main className="flex-1 p-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-humo-brown">Gestion du menu</h1>
          <p className="text-humo-brown/50 text-sm mt-1">Modifiez les prix et la disponibilité des plats en temps réel</p>
        </div>
        <MenuManager categories={categories} />
      </main>
    </div>
  )
}
