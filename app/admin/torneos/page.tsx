'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Torneo {
  id: string;
  nombre: string;
  deporte: string;
  estado: string;
  equipos: number;
  maxEquipos: number;
  fechaInicio: string;
}

export default function AdminTournamentsPage() {
  const [torneos] = useState<Torneo[]>([
    {
      id: '1',
      nombre: 'Liga de Fútbol Metropolitana',
      deporte: 'Fútbol',
      estado: 'registracion',
      equipos: 8,
      maxEquipos: 16,
      fechaInicio: '2025-02-01',
    },
    {
      id: '2',
      nombre: 'Campeonato de Tenis',
      deporte: 'Tenis',
      estado: 'en-curso',
      equipos: 12,
      maxEquipos: 12,
      fechaInicio: '2025-01-15',
    },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Torneos</h1>
            <p className="text-muted-foreground mt-1">Crea y administra torneos</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            ➕ Crear Torneo
          </Button>
        </div>

        {/* Tournaments Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold">Deporte</th>
                    <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold">Equipos</th>
                    <th className="text-left py-3 px-4 font-semibold">Inicio</th>
                    <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {torneos.map((torneo) => (
                    <tr key={torneo.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{torneo.nombre}</td>
                      <td className="py-3 px-4">{torneo.deporte}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 capitalize">
                          {torneo.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4">{torneo.equipos}/{torneo.maxEquipos}</td>
                      <td className="py-3 px-4">{new Date(torneo.fechaInicio).toLocaleDateString('es-ES')}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="destructive" size="sm">Eliminar</Button>
                        </div>
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
