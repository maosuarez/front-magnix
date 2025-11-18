'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/auth-provider'
import { useSpaces } from '@/hooks/use-spaces'
import { useSpaceAvailability } from '@/hooks/use-space-availability'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SpaceCard } from '@/components/reservations/space-card'
import { CalendarView } from '@/components/reservations/calendar-view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, Check } from 'lucide-react'
import { api } from '@/lib/api-client'
import type { Space, SportType } from '@/types'

const SPORT_LABELS = {
  FOOTBALL: 'Fútbol',
  BASKETBALL: 'Baloncesto',
  TENNIS: 'Tenis',
  VOLLEYBALL: 'Voleibol',
}

export default function NewReservationPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuthContext()
  const [selectedSport, setSelectedSport] = useState<SportType>('FOOTBALL')
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const { spaces, loading: spacesLoading } = useSpaces(selectedSport)
  const { slots, loading: slotsLoading } = useSpaceAvailability(
    selectedSpace?.id || '',
    selectedDate.toISOString().split('T')[0]
  )

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  const handleCreateReservation = async () => {
    if (!selectedSpace || !selectedTime) return

    setCreating(true)

    const [startTime, endTime] = selectedTime.split('-')
    const response = await api.post('/reservations', {
      spaceId: selectedSpace.id,
      date: selectedDate.toISOString().split('T')[0],
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      sport: selectedSport,
    })

    setCreating(false)

    if (response.data) {
      alert('Reserva creada exitosamente')
      router.push('/reservations')
    } else {
      alert(response.error || 'Error al crear reserva')
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Nueva Reserva</h1>
              <p className="text-muted-foreground">
                Sigue los pasos para reservar un espacio deportivo
              </p>
            </div>
          </div>

          {/* Step 1: Select Sport */}
          <Card>
            <CardHeader>
              <CardTitle>1. Selecciona el Deporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {(['FOOTBALL', 'BASKETBALL', 'TENNIS', 'VOLLEYBALL'] as SportType[]).map(
                  (sport) => (
                    <Button
                      key={sport}
                      variant={selectedSport === sport ? 'default' : 'outline'}
                      onClick={() => {
                        setSelectedSport(sport)
                        setSelectedSpace(null)
                        setSelectedTime(null)
                      }}
                    >
                      {SPORT_LABELS[sport]}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Select Space */}
          <Card>
            <CardHeader>
              <CardTitle>2. Selecciona el Espacio</CardTitle>
            </CardHeader>
            <CardContent>
              {spacesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : spaces.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay espacios disponibles para este deporte
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {spaces.map((space) => (
                    <div
                      key={space.id}
                      className={`relative ${
                        selectedSpace?.id === space.id ? 'ring-2 ring-primary rounded-lg' : ''
                      }`}
                    >
                      <SpaceCard space={space} onSelect={setSelectedSpace} />
                      {selectedSpace?.id === space.id && (
                        <div className="absolute top-3 right-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Select Date and Time */}
          {selectedSpace && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarView
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />

              <Card>
                <CardHeader>
                  <CardTitle>3. Selecciona Horario</CardTitle>
                </CardHeader>
                <CardContent>
                  {slotsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay horarios disponibles para esta fecha
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {slots.map((slot) => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`
                            w-full p-4 text-left rounded-lg border transition-colors
                            ${!slot.available ? 'opacity-50 cursor-not-allowed bg-muted' : ''}
                            ${
                              selectedTime === slot.time
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:border-primary'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{slot.time}</span>
                            {slot.available ? (
                              selectedTime === slot.time ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <Badge variant="secondary">Disponible</Badge>
                              )
                            ) : (
                              <Badge variant="outline">Ocupado</Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Summary and Submit */}
          {selectedSpace && selectedTime && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Espacio</p>
                    <p className="font-semibold">{selectedSpace.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                    <p className="font-semibold">
                      {selectedDate.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Horario</p>
                    <p className="font-semibold">{selectedTime}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">
                      ${selectedSpace.pricePerHour}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleCreateReservation}
                    disabled={creating}
                  >
                    {creating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      'Confirmar Reserva'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
