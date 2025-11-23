'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function NewBookingPage() {
  const [deporte, setDeporte] = useState('');
  const [fecha, setFecha] = useState('');
  const [disponibilidad, setDisponibilidad] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState('');

  // Mock available times
  const timeSlots: TimeSlot[] = [
    { time: '08:00 - 09:00', available: true },
    { time: '09:00 - 10:00', available: true },
    { time: '10:00 - 11:00', available: false },
    { time: '14:00 - 15:00', available: true },
    { time: '15:00 - 16:00', available: true },
    { time: '16:00 - 17:00', available: false },
    { time: '18:00 - 19:00', available: true },
    { time: '19:00 - 20:00', available: true },
  ];

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
    // Simulate availability check
    setDisponibilidad(timeSlots);
  };

  const handleReservar = () => {
    if (!deporte || !fecha || !selectedTime) {
      alert('Por favor completa todos los campos');
      return;
    }
    // TODO: Implement booking creation API call
    alert('Reserva creada exitosamente');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Nueva Reserva</h1>
          <p className="text-muted-foreground mt-1">Crea una nueva reserva de espacio deportivo</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Selecciona los Detalles</CardTitle>
            <CardDescription>Completa el formulario para hacer tu reserva</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sport Selection */}
            <div className="space-y-2">
              <Label htmlFor="deporte">Deporte</Label>
              <select
                id="deporte"
                value={deporte}
                onChange={(e) => setDeporte(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Selecciona un deporte</option>
                <option value="futbol">Fútbol</option>
                <option value="tenis">Tenis</option>
                <option value="baloncesto">Baloncesto</option>
                <option value="voleibol">Voleibol</option>
              </select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={handleFechaChange}
              />
            </div>

            {/* Time Slots */}
            {fecha && (
              <div className="space-y-2">
                <Label>Horarios Disponibles</Label>
                <div className="grid grid-cols-2 gap-2">
                  {disponibilidad.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border transition-colors ${
                        !slot.available
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'border-primary bg-primary/10 border-2'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {slot.time}
                      {!slot.available && ' (No disponible)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {selectedTime && (
              <Card className="bg-muted border-border">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-4">Resumen de tu Reserva</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deporte:</span>
                      <span className="font-medium capitalize">{deporte}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span className="font-medium">{new Date(fecha).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hora:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-muted-foreground">Precio:</span>
                      <span className="font-semibold">$45</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleReservar}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!selectedTime}
              >
                Confirmar Reserva
              </Button>
              <Button variant="outline" className="flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
