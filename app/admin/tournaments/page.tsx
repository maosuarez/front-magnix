'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/auth-provider'
import { useTournaments } from '@/hooks/use-tournaments'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { CreateTournamentDialog } from '@/components/admin/create-tournament-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, Calendar, Users, Trash2 } from 'lucide-react'
import { api } from '@/lib/api-client'
import { useState } from 'react'

const SPORT_LABELS = {
  FOOTBALL: 'Fútbol',
  BASKETBALL: 'Baloncesto',
  TENNIS: 'Tenis',
  VOLLEYBALL: 'Voleibol',
}

const STATUS_LABELS = {
  UPCOMING: 'Próximo',
  ONGOING: 'En Curso',
  COMPLETED: 'Finalizado',
}

export default function AdminTournamentsPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuthContext()
  const { tournaments, loading, refetch } = useTournaments()
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/')
    }
  }, [authLoading, isAuthenticated, isAdmin, router])

  const handleDelete = async (tournamentId: string) => {
    if (!confirm('¿Estás seguro de eliminar este torneo?')) return

    setDeleting(tournamentId)
    const response = await api.delete(`/tournaments/${tournamentId}`)
    setDeleting(null)

    if (response.data) {
      refetch()
    } else {
      alert(response.error || 'Error al eliminar torneo')
    }
  }

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Gestión de Torneos</h1>
                <p className="text-muted-foreground">
                  Crea y administra torneos deportivos
                </p>
              </div>
              <CreateTournamentDialog onTournamentCreated={refetch} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Todos los Torneos ({tournaments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : tournaments.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <p className="text-muted-foreground">No hay torneos creados</p>
                    <CreateTournamentDialog onTournamentCreated={refetch} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tournaments.map((tournament) => (
                      <div
                        key={tournament.id}
                        className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">
                              {SPORT_LABELS[tournament.sport]}
                            </Badge>
                            <Badge>
                              {STATUS_LABELS[tournament.status]}
                            </Badge>
                            <h3 className="font-semibold">{tournament.name}</h3>
                          </div>
                          {tournament.description && (
                            <p className="text-sm text-muted-foreground">
                              {tournament.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(tournament.startDate).toLocaleDateString('es-ES')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {tournament.currentTeams}/{tournament.maxTeams} equipos
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(tournament.id)}
                          disabled={deleting === tournament.id}
                        >
                          {deleting === tournament.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
