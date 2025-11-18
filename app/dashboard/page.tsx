'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/auth-provider'
import { useUserStats } from '@/hooks/use-user-stats'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StatCard } from '@/components/dashboard/stat-card'
import { ProfileCard } from '@/components/dashboard/profile-card'
import { RecentReservations } from '@/components/dashboard/recent-reservations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Calendar, Users, FileText, Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading, profile } = useAuthContext()
  const { stats, loading: statsLoading } = useUserStats()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-balance">
                Bienvenido, {profile?.name}
              </h1>
              <p className="text-muted-foreground">
                Gestiona tus actividades deportivas desde aquí
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/reservations/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Reserva
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tournaments">Ver Torneos</Link>
              </Button>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Reservas Totales"
              value={statsLoading ? '-' : stats?.totalReservations || 0}
              icon={Calendar}
              description="Espacios reservados"
            />
            <StatCard
              title="Torneos Activos"
              value={statsLoading ? '-' : stats?.activeTournaments || 0}
              icon={Trophy}
              description="Participando actualmente"
            />
            <StatCard
              title="Equipos"
              value={statsLoading ? '-' : stats?.teamsJoined || 0}
              icon={Users}
              description="Equipos unidos"
            />
            <StatCard
              title="Publicaciones"
              value={statsLoading ? '-' : stats?.postsCreated || 0}
              icon={FileText}
              description="En la comunidad"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>

            {/* Recent Reservations */}
            <div className="lg:col-span-2">
              <RecentReservations />
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/tournaments"
                  className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Explorar Torneos</p>
                    <p className="text-xs text-muted-foreground">
                      Encuentra competiciones
                    </p>
                  </div>
                </Link>

                <Link
                  href="/reservations"
                  className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Mis Reservas</p>
                    <p className="text-xs text-muted-foreground">
                      Ver todas las reservas
                    </p>
                  </div>
                </Link>

                <Link
                  href="/community"
                  className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Comunidad</p>
                    <p className="text-xs text-muted-foreground">
                      Conecta con deportistas
                    </p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
