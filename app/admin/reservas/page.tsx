'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminBookingsPage() {
  const reservas = [
    {
      id: '1',
      usuario: 'Juan Pérez',
      espacio: 'Cancha A',
      fecha: '2025-01-20',
      hora: '14:00 - 15:00',
      estado: 'confirmada',
      precio: 50,
    },
    {
      id: '2',
      usuario: 'María García',
      espacio: 'Cancha B',
      fecha: '2025-01-20',
      hora: '10:00 - 11:00',
      estado: 'pendiente',
      precio: 40,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Reservas</h1>
          <p className="text-muted-foreground mt-1">Administra todas las reservas del sistema</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                    <th className="text-left py-3 px-4 font-semibold">Espacio</th>
                    <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                    <th className="text-left py-3 px-4 font-semibold">Hora</th>
                    <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold">Monto</th>
                    <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => (
                    <tr key={reserva.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{reserva.usuario}</td>
                      <td className="py-3 px-4">{reserva.espacio}</td>
                      <td className="py-3 px-4">{new Date(reserva.fecha).toLocaleDateString('es-ES')}</td>
                      <td className="py-3 px-4">{reserva.hora}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded capitalize ${
                          reserva.estado === 'confirmada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reserva.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4">${reserva.precio}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Ver</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
