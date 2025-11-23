'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminFacilitiesPage() {
  const espacios = [
    { id: '1', nombre: 'Cancha de Fútbol A', tipo: 'Fútbol', disponible: true, precio: 50 },
    { id: '2', nombre: 'Cancha de Tenis 1', tipo: 'Tenis', disponible: true, precio: 40 },
    { id: '3', nombre: 'Cancha de Voleibol', tipo: 'Voleibol', disponible: false, precio: 35 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Espacios</h1>
            <p className="text-muted-foreground mt-1">Administra espacios deportivos</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            ➕ Nuevo Espacio
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {espacios.map((espacio) => (
            <Card key={espacio.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{espacio.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{espacio.tipo}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    espacio.disponible
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {espacio.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
                <p className="text-lg font-bold mb-4">${espacio.precio}/hora</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                  <Button variant="destructive" size="sm" className="flex-1">Eliminar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
