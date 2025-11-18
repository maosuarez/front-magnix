'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/auth-provider'
import { useReservations } from '@/hooks/use-reservations'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Plus, Loader2, X } from 'lucide-react'
import Link from 'next/link'
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

export default function ReservationsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuthContext()
  const { reservations, loading, cancelReservation } = useReservations()
  const [cancelling, setCancelling] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  const handleCancel = async (id: string) => {
    if (!confirm('¿Estás seguro de cancelar esta reserva?')) return
    
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                Mis Reservas
              </h1>
              <p className="text-muted-foreground">
                Administra tus reservas de espacios deportivos
              </p>
            </div>
            <Button asChild>
              <Link href="/reservations/new">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Reserva
              </Link>
            </Button>
          </div>

          {/* Reservations List */}
          <Card>
            <CardHeader>
              <CardTitle>Todas las Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-muted-foreground">
                    No tienes reservas activas
                  </p>
                  <Button asChild>
                    <Link href="/reservations/new">Crear Primera Reserva</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-start justify-between gap-4 p-6 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={getStatusVariant(reservation.status)}>
                            {STATUS_LABELS[reservation.status]}
                          </Badge>
                          <span className="text-lg font-semibold">
                            {SPORT_LABELS[reservation.sport]}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(reservation.date).toLocaleDateString('es-ES', {
                              dateStyle: 'full',
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {reservation.startTime} - {reservation.endTime}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ID de Espacio: {reservation.spaceId}
                        </p>
                      </div>
                      {reservation.status !== 'CANCELLED' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(reservation.id)}
                          disabled={cancelling === reservation.id}
                        >
                          {cancelling === reservation.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              Cancelar
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
