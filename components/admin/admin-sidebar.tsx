'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Trophy, Calendar, UsersIcon, MessageSquare, MapPin, BarChart3 } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/admin/users', icon: UsersIcon },
  { name: 'Torneos', href: '/admin/tournaments', icon: Trophy },
  { name: 'Reservas', href: '/admin/reservations', icon: Calendar },
  { name: 'Espacios', href: '/admin/spaces', icon: MapPin },
  { name: 'Comunidad', href: '/admin/community', icon: MessageSquare },
  { name: 'Métricas', href: '/admin/metrics', icon: BarChart3 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-border bg-card">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Panel de Admin</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
