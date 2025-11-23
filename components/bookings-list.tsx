'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type FilterStatus = 'todas' | 'confirmada' | 'pendiente' | 'cancelada';

interface Booking {
  id: string;
  fecha: string;
  hora: string;
  espacio: string;
  deporte: string;
  precio: number;
  estado: 'confirmada' | 'pendiente' | 'cancelada';
}

export function BookingsList() {
  const [filter, setFilter] = useState<FilterStatus>('todas');

  // Mock data
  const mockBookings: Booking[] = [
    {
      id: '1',
      fecha: '2025-01-15',
      hora: '14:00 - 15:00',
      espacio: 'Cancha de Fútbol A',
      deporte: 'Fútbol',
      precio: 50,
      estado: 'confirmada',
    },
    {
      id: '2',
      fecha: '2025-01-20',
      hora: '10:00 - 11:00',
      espacio: 'Cancha de Tenis 2',
      deporte: 'Tenis',
      precio: 40,
      estado: 'pendiente',
    },
    {
      id: '3',
      fecha: '2025-01-10',
      hora: '16:00 - 17:00',
      espacio: 'Cancha de Voleibol',
      deporte: 'Voleibol',
      precio: 35,
      estado: 'cancelada',
    },
    {
      id: '4',
      fecha: '2025-01-25',
      hora: '18:00 - 19:00',
      espacio: 'Cancha de Baloncesto',
      deporte: 'Baloncesto',
      precio: 45,
      estado: 'confirmada',
    },
  ];

  const filteredBookings = mockBookings.filter(
    (booking) => filter === 'todas' || booking.estado === filter
  );

  const getStatusBadge = (status: Booking['estado']) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelada':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Booking['estado']) => {
    switch (status) {
      case 'confirmada':
        return '✓ Confirmada';
      case 'pendiente':
        return '⏳ Pendiente';
      case 'cancelada':
        return '✕ Cancelada';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['todas', 'confirmada', 'pendiente', 'cancelada'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                onClick={() => setFilter(status as FilterStatus)}
                className={filter === status ? 'bg-primary' : ''}
              >
                {status === 'todas' && 'Todas'}
                {status === 'confirmada' && 'Confirmadas'}
                {status === 'pendiente' && 'Pendientes'}
                {status === 'cancelada' && 'Canceladas'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{booking.espacio}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(booking.estado)}`}>
                      {getStatusLabel(booking.estado)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground">📅 Fecha</p>
                      <p>{new Date(booking.fecha).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">⏰ Hora</p>
                      <p>{booking.hora}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">🏃 Deporte</p>
                      <p>{booking.deporte}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">💰 Precio</p>
                      <p>${booking.precio}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {booking.estado !== 'cancelada' && (
                    <>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
