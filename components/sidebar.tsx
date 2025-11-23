'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/profile', label: 'Mi Perfil', icon: '👤' },
    { href: '/dashboard/reservas', label: 'Mis Reservas', icon: '📅' },
    { href: '/dashboard/torneos', label: 'Torneos', icon: '🏆' },
    { href: '/dashboard/comunidad', label: 'Comunidad', icon: '👥' },
    ...(user?.rol === 'administrador' ? [
      { href: '/admin', label: 'Panel Admin', icon: '⚙️' },
    ] : []),
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="border-b border-sidebar-border px-6 py-4">
          <Link href="/dashboard" className="text-xl font-bold text-sidebar-primary">
            Magnix
          </Link>
        </div>

        {/* User Info */}
        <div className="border-b border-sidebar-border px-6 py-4">
          <p className="font-semibold text-sidebar-foreground">{user?.nombre}</p>
          <p className="text-xs text-sidebar-accent">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  pathname === item.href
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-4">
          <Button
            onClick={logout}
            variant="destructive"
            className="w-full"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </aside>
  );
}
