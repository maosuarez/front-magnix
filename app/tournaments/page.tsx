'use client'

import { useState } from 'react'
import { useTournaments } from '@/hooks/use-tournaments'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { TournamentCard } from '@/components/tournaments/tournament-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Trophy } from 'lucide-react'
import type { Tournament } from '@/types'

export default function TournamentsPage() {
  const { tournaments, loading } = useTournaments()
  const [selectedSport, setSelectedSport] = useState<string>('ALL')

  const filteredTournaments = tournaments.filter((tournament) => {
    if (selectedSport === 'ALL') return true
    return tournament.sport === selectedSport
  })

  const upcomingTournaments = filteredTournaments.filter((t) => t.status === 'UPCOMING')
  const ongoingTournaments = filteredTournaments.filter((t) => t.status === 'ONGOING')
  const completedTournaments = filteredTournaments.filter((t) => t.status === 'COMPLETED')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                Torneos
              </h1>
              <p className="text-muted-foreground">
                Encuentra y participa en competiciones deportivas
              </p>
            </div>
          </div>

          {/* Sport Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSport === 'ALL' ? 'default' : 'outline'}
              onClick={() => setSelectedSport('ALL')}
            >
              Todos
            </Button>
            <Button
              variant={selectedSport === 'FOOTBALL' ? 'default' : 'outline'}
              onClick={() => setSelectedSport('FOOTBALL')}
            >
              Fútbol
            </Button>
            <Button
              variant={selectedSport === 'BASKETBALL' ? 'default' : 'outline'}
              onClick={() => setSelectedSport('BASKETBALL')}
            >
              Baloncesto
            </Button>
            <Button
              variant={selectedSport === 'TENNIS' ? 'default' : 'outline'}
              onClick={() => setSelectedSport('TENNIS')}
            >
              Tenis
            </Button>
            <Button
              variant={selectedSport === 'VOLLEYBALL' ? 'default' : 'outline'}
              onClick={() => setSelectedSport('VOLLEYBALL')}
            >
              Voleibol
            </Button>
          </div>

          {/* Tournaments Tabs */}
          <Tabs defaultValue="ongoing" className="space-y-6">
            <TabsList>
              <TabsTrigger value="ongoing">
                En Curso ({ongoingTournaments.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Próximos ({upcomingTournaments.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Finalizados ({completedTournaments.length})
              </TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <TabsContent value="ongoing" className="space-y-4">
                  {ongoingTournaments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No hay torneos en curso
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ongoingTournaments.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                  {upcomingTournaments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No hay torneos próximos
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingTournaments.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {completedTournaments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No hay torneos finalizados
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {completedTournaments.map((tournament) => (
                        <TournamentCard key={tournament.id} tournament={tournament} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
