'use client'

import { use } from 'react'
import { useState } from 'react'
import { useTournamentDetails } from '@/hooks/use-tournament-details'
import { useAuthContext } from '@/components/auth-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BracketView } from '@/components/tournaments/bracket-view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Users, Trophy, Loader2, UserPlus } from 'lucide-react'

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

export default function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { tournament, loading, registerForTournament } = useTournamentDetails(id)
  const { isAuthenticated } = useAuthContext()
  const [registering, setRegistering] = useState(false)

  const handleRegister = async () => {
    setRegistering(true)
    const result = await registerForTournament()
    setRegistering(false)
    
    if (result.success) {
      alert('Inscripción exitosa')
    } else {
      alert(result.error || 'Error al inscribirse')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Torneo no encontrado</h1>
            <p className="text-muted-foreground">El torneo que buscas no existe</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return 'default'
      case 'UPCOMING':
        return 'secondary'
      case 'COMPLETED':
        return 'outline'
      default:
        return 'default'
    }
  }

  const canRegister = tournament.status === 'UPCOMING' && 
                      tournament.currentTeams < tournament.maxTeams &&
                      isAuthenticated

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Tournament Header */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="aspect-[21/9] relative bg-secondary">
              <img
                src={tournament.imageUrl || `/placeholder.svg?height=400&width=1200&query=${tournament.sport}`}
                alt={tournament.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="container mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusVariant(tournament.status)}>
                          {STATUS_LABELS[tournament.status]}
                        </Badge>
                        <Badge variant="outline">
                          {SPORT_LABELS[tournament.sport]}
                        </Badge>
                      </div>
                      <h1 className="text-4xl font-bold text-secondary-foreground">
                        {tournament.name}
                      </h1>
                    </div>
                    {canRegister && (
                      <Button
                        size="lg"
                        onClick={handleRegister}
                        disabled={registering}
                      >
                        {registering ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Inscribiendo...
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-5 w-5" />
                            Inscribirse
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de inicio</p>
                    <p className="font-semibold">
                      {new Date(tournament.startDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Equipos inscritos</p>
                    <p className="font-semibold">
                      {tournament.currentTeams} / {tournament.maxTeams}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Formato</p>
                    <p className="font-semibold">Eliminación directa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bracket" className="space-y-6">
            <TabsList>
              <TabsTrigger value="bracket">Bracket</TabsTrigger>
              <TabsTrigger value="teams">
                Equipos ({tournament.teams.length})
              </TabsTrigger>
              <TabsTrigger value="info">Información</TabsTrigger>
            </TabsList>

            <TabsContent value="bracket">
              <Card>
                <CardHeader>
                  <CardTitle>Bracket del Torneo</CardTitle>
                </CardHeader>
                <CardContent>
                  <BracketView matches={tournament.matches} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams">
              <Card>
                <CardHeader>
                  <CardTitle>Equipos Inscritos</CardTitle>
                </CardHeader>
                <CardContent>
                  {tournament.teams.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Aún no hay equipos inscritos
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tournament.teams.map((team) => (
                        <div
                          key={team.id}
                          className="p-4 border border-border rounded-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{team.name}</h3>
                            <Badge variant="outline">
                              {team.members.length} miembros
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {team.wins}V - {team.losses}D
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Torneo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Descripción</h3>
                    <p className="text-muted-foreground">
                      {tournament.description || 'Sin descripción disponible'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <h3 className="font-semibold mb-2">Fecha de inicio</h3>
                      <p className="text-muted-foreground">
                        {new Date(tournament.startDate).toLocaleDateString('es-ES', {
                          dateStyle: 'full',
                        })}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Fecha de finalización</h3>
                      <p className="text-muted-foreground">
                        {new Date(tournament.endDate).toLocaleDateString('es-ES', {
                          dateStyle: 'full',
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
