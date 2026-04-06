'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, UtensilsCrossed, LogOut } from 'lucide-react'

const links = [
  { label: 'Réservations', href: '/elhumo-admin/dashboard', icon: CalendarDays },
  { label: 'Menu', href: '/elhumo-admin/menu', icon: UtensilsCrossed },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/elhumo-admin')
    router.refresh()
  }

  return (
    <aside className="w-56 bg-humo-brown min-h-screen flex flex-col p-6">
      <div className="mb-10">
        <p className="font-display font-bold text-xl text-white">
          El <span className="text-humo-orange">Humo</span>
        </p>
        <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Admin</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-humo-orange text-white'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/10 transition-colors"
      >
        <LogOut size={16} />
        Déconnexion
      </button>
    </aside>
  )
}
