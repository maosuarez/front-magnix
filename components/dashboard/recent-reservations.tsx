'use client'

import { useReservations } from '@/hooks/use-reservations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, X, Loader2 } from 'lucide-react'
import { useState } from 'react'

const SPORT_LABELS = {
  FOOTBALL: 'Fútbol',
  BASKETBALL: 'Baloncesto',
  TENNIS: 'Tenis',
  VOLLEYBALL: 'Voleibol',
}

const STATUS_LABELS = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  CANCELLED: 'Cancelada',
}

export function RecentReservations() {
  const { reservations, loading, cancelReservation } = useReservations()
  const [cancelling, setCancelling] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    setCancelling(id)
    await cancelReservation(id)
    setCancelling(null)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'default'
      case 'PENDING':
        return 'secondary'
      case 'CANCELLED':
        return 'outline'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mis Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        {reservations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No tienes reservas activas
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(reservation.status)}>
                      {STATUS_LABELS[reservation.status]}
                    </Badge>
                    <span className="text-sm font-medium">
                      {SPORT_LABELS[reservation.sport]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(reservation.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {reservation.startTime} - {reservation.endTime}
                    </div>
                  </div>
                </div>
                {reservation.status !== 'CANCELLED' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCancel(reservation.id)}
                    disabled={cancelling === reservation.id}
                  >
                    {cancelling === reservation.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
