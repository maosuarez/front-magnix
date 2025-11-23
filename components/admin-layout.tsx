'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.rol !== 'administrador')) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading || !isAuthenticated || user?.rol !== 'administrador') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/usuarios', label: 'Usuarios', icon: '👥' },
    { href: '/admin/torneos', label: 'Torneos', icon: '🏆' },
    { href: '/admin/espacios', label: 'Espacios', icon: '🏢' },
    { href: '/admin/reservas', label: 'Reservas', icon: '📅' },
    { href: '/admin/moderacion', label: 'Moderación', icon: '⚖️' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="border-b border-sidebar-border px-6 py-4">
            <Link href="/admin" className="text-xl font-bold text-sidebar-primary">
              Magnix Admin
            </Link>
          </div>

          {/* Admin Info */}
          <div className="border-b border-sidebar-border px-6 py-4">
            <p className="font-semibold text-sidebar-foreground text-sm">Admin</p>
            <p className="text-xs text-sidebar-accent">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {adminNavItems.map((item) => (
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
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Volver a Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
