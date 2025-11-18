'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/auth-provider'
import { useAdminStats } from '@/hooks/use-admin-stats'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Trophy, Calendar, MessageSquare, TrendingUp, DollarSign, Loader2 } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuthContext()
  const { stats, loading: statsLoading } = useAdminStats()

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/')
    }
  }, [authLoading, isAuthenticated, isAdmin, router])

  if (authLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 bg-muted p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Panel de Administración</h1>
              <p className="text-muted-foreground">
                Gestiona todos los aspectos de la plataforma
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Usuarios"
                value={statsLoading ? '-' : stats?.totalUsers || 0}
                icon={Users}
                description="Usuarios registrados"
              />
              <StatCard
                title="Usuarios Activos"
                value={statsLoading ? '-' : stats?.activeUsers || 0}
                icon={TrendingUp}
                description="Últimos 30 días"
              />
              <StatCard
                title="Torneos"
                value={statsLoading ? '-' : stats?.totalTournaments || 0}
                icon={Trophy}
                description="Torneos totales"
              />
              <StatCard
                title="Reservas"
                value={statsLoading ? '-' : stats?.totalReservations || 0}
                icon={Calendar}
                description="Reservas totales"
              />
              <StatCard
                title="Publicaciones"
                value={statsLoading ? '-' : stats?.totalPosts || 0}
                icon={MessageSquare}
                description="Posts en comunidad"
              />
              <StatCard
                title="Ingresos"
                value={statsLoading ? '-' : `$${stats?.revenue || 0}`}
                icon={DollarSign}
                description="Total acumulado"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nuevo usuario registrado</p>
                        <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nuevo torneo creado</p>
                        <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Reserva confirmada</p>
                        <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => router.push('/admin/tournaments')}
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Trophy className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Gestionar Torneos</span>
                    </button>
                    <button
                      onClick={() => router.push('/admin/users')}
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Users className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Gestionar Usuarios</span>
                    </button>
                    <button
                      onClick={() => router.push('/admin/reservations')}
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Calendar className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Ver Reservas</span>
                    </button>
                    <button
                      onClick={() => router.push('/admin/community')}
                      className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <MessageSquare className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Moderar Comunidad</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
