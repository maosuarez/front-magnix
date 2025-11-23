'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookingDay {
  date: Date;
  bookings: Array<{
    id: string;
    hora: string;
    espacio: string;
    estado: 'confirmada' | 'pendiente' | 'cancelada';
  }>;
}

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  // Mock data for bookings
  const mockBookings: Record<string, BookingDay['bookings']> = {
    '5': [
      { id: '1', hora: '14:00 - 15:00', espacio: 'Cancha A', estado: 'confirmada' },
    ],
    '12': [
      { id: '2', hora: '18:00 - 19:00', espacio: 'Cancha B', estado: 'confirmada' },
      { id: '3', hora: '19:00 - 20:00', espacio: 'Cancha C', estado: 'pendiente' },
    ],
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Calendario de Reservas</CardTitle>
              <CardDescription>Visualiza tus reservas</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                ←
              </Button>
              <span className="px-4 py-2 font-semibold capitalize">{monthName}</span>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                →
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                {day}
              </div>
            ))}
            {days.map((date, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-3 min-h-24 ${
                  date
                    ? 'bg-card hover:border-primary cursor-pointer'
                    : 'bg-muted'
                }`}
              >
                {date && (
                  <div>
                    <p className="font-semibold text-sm">{date.getDate()}</p>
                    <div className="mt-2 space-y-1">
                      {mockBookings[date.getDate()]?.map((booking) => (
                        <div
                          key={booking.id}
                          className={`text-xs px-2 py-1 rounded text-white truncate ${
                            booking.estado === 'confirmada'
                              ? 'bg-primary'
                              : booking.estado === 'pendiente'
                              ? 'bg-yellow-500'
                              : 'bg-gray-400 line-through'
                          }`}
                        >
                          {booking.hora}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles de Reservas</CardTitle>
          <CardDescription>Información de tus próximas reservas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(mockBookings).map(([day, bookings]) =>
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-border rounded-lg p-4 flex items-start justify-between hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-semibold">{booking.espacio}</p>
                  <p className="text-sm text-muted-foreground">{booking.hora}</p>
                  <span className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                    booking.estado === 'confirmada'
                      ? 'bg-green-100 text-green-800'
                      : booking.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.estado === 'confirmada' && '✓ Confirmada'}
                    {booking.estado === 'pendiente' && '⏳ Pendiente'}
                    {booking.estado === 'cancelada' && '✕ Cancelada'}
                  </span>
                </div>
                <div className="flex gap-2">
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
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
