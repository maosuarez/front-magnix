'use client'

import Link from 'next/link'
import { useAuthContext } from './auth-provider'
import { Button } from './ui/button'
import { Trophy, Calendar, Users, LogOut, LayoutDashboard, Shield } from 'lucide-react'

export function Header() {
  const { isAuthenticated, isAdmin, signOut, profile } = useAuthContext()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Magnix</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/tournaments" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Torneos
          </Link>
          <Link href="/reservations" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Reservas
          </Link>
          <Link href="/community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Comunidad
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">Comenzar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
