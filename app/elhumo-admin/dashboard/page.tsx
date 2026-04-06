import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ReservationTable from '@/components/admin/ReservationTable'

export default async function AdminDashboardPage() {
  const auth = await isAdminAuthenticated()
  if (!auth) redirect('/elhumo-admin')

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const pending = reservations.filter((r) => r.status === 'PENDING').length
  const confirmed = reservations.filter((r) => r.status === 'CONFIRMED').length
  const today = reservations.filter((r) => {
    const d = new Date(r.date)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  return (
    <div className="flex min-h-screen bg-humo-cream">
      <AdminSidebar />
      <main className="flex-1 p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-humo-brown">Réservations</h1>
          <p className="text-humo-brown/50 text-sm mt-1">Gérez les réservations de vos clients</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'En attente', value: pending, color: 'text-amber-600' },
            { label: 'Confirmées', value: confirmed, color: 'text-green-600' },
            { label: "Aujourd'hui", value: today, color: 'text-humo-orange' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-humo-kraft p-5">
              <p className="text-xs text-humo-brown/50 uppercase tracking-wide mb-1">{stat.label}</p>
              <p className={`font-display font-bold text-3xl ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <ReservationTable reservations={reservations} />
      </main>
    </div>
  )
}
