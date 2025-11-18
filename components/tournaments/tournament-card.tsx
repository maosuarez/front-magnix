import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Trophy } from 'lucide-react'
import type { Tournament } from '@/types'

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

interface TournamentCardProps {
  tournament: Tournament
}

export function TournamentCard({ tournament }: TournamentCardProps) {
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

  return (
    <Card className="overflow-hidden hover:border-primary transition-colors">
      <div className="aspect-video relative bg-muted overflow-hidden">
        <img
          src={tournament.imageUrl || `/placeholder.svg?height=200&width=400&query=${tournament.sport}`}
          alt={tournament.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusVariant(tournament.status)}>
            {STATUS_LABELS[tournament.status]}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit">
            {SPORT_LABELS[tournament.sport]}
          </Badge>
          <CardTitle className="text-xl">{tournament.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tournament.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
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
            {tournament.currentTeams}/{tournament.maxTeams}
          </div>
        </div>

        <Button className="w-full" asChild>
          <Link href={`/tournaments/${tournament.id}`}>
            Ver Detalles
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
