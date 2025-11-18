import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Users, DollarSign } from 'lucide-react'
import type { Space } from '@/types'

const SPORT_LABELS = {
  FOOTBALL: 'Fútbol',
  BASKETBALL: 'Baloncesto',
  TENNIS: 'Tenis',
  VOLLEYBALL: 'Voleibol',
}

interface SpaceCardProps {
  space: Space
  onSelect: (space: Space) => void
}

export function SpaceCard({ space, onSelect }: SpaceCardProps) {
  return (
    <Card className={!space.available ? 'opacity-60' : 'hover:border-primary transition-colors'}>
      <div className="aspect-video relative bg-muted overflow-hidden">
        <img
          src={space.imageUrl || `/placeholder.svg?height=200&width=400&query=${space.sport}-court`}
          alt={space.name}
          className="w-full h-full object-cover"
        />
        {!space.available && (
          <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
            <Badge variant="secondary">No Disponible</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit">
            {SPORT_LABELS[space.sport]}
          </Badge>
          <CardTitle className="text-xl">{space.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            Capacidad: {space.capacity} personas
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            ${space.pricePerHour}/hora
          </div>
        </div>

        <Button
          className="w-full"
          disabled={!space.available}
          onClick={() => onSelect(space)}
        >
          {space.available ? 'Seleccionar' : 'No Disponible'}
        </Button>
      </CardContent>
    </Card>
  )
}
