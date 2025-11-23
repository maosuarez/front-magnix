'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingCalendar } from '@/components/booking-calendar';
import { BookingsList } from '@/components/bookings-list';

type ViewMode = 'calendar' | 'list';

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mis Reservas</h1>
            <p className="text-muted-foreground mt-1">Gestiona tus reservas de espacios deportivos</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' ? 'bg-primary' : ''}
            >
              📅 Calendario
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary' : ''}
            >
              📋 Lista
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              ➕ Nueva Reserva
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'calendar' ? (
          <BookingCalendar />
        ) : (
          <BookingsList />
        )}
      </div>
    </DashboardLayout>
  );
}
