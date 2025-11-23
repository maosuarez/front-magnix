'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TournamentCard } from '@/components/tournament-card';

type FilterTab = 'todos' | 'mis-torneos' | 'disponibles';

interface Tournament {
  id: string;
  nombre: string;
  deporte: string;
  estado: 'registracion' | 'en-curso' | 'finalizado';
  fechaInicio: string;
  equipos: number;
  maxEquipos: number;
  organizador: string;
  descripcion: string;
  inscrito: boolean;
}

export default function TournamentsPage() {
  const [filter, setFilter] = useState<FilterTab>('todos');

  const mockTournaments: Tournament[] = [
    {
      id: '1',
      nombre: 'Liga de Fútbol Metropolitana',
      deporte: 'Fútbol',
      estado: 'registracion',
      fechaInicio: '2025-02-01',
      equipos: 8,
      maxEquipos: 16,
      organizador: 'Federación de Fútbol',
      descripcion: 'Torneo de fútbol de 11 vs 11',
      inscrito: true,
    },
    {
      id: '2',
      nombre: 'Campeonato de Tenis',
      deporte: 'Tenis',
      estado: 'en-curso',
      fechaInicio: '2025-01-15',
      equipos: 12,
      maxEquipos: 12,
      organizador: 'Club de Tenis Central',
      descripcion: 'Campeonato individual de tenis',
      inscrito: false,
    },
    {
      id: '3',
      nombre: 'Copa de Voleibol 2025',
      deporte: 'Voleibol',
      estado: 'registracion',
      fechaInicio: '2025-02-15',
      equipos: 6,
      maxEquipos: 12,
      organizador: 'Asociación de Voleibol',
      descripcion: 'Torneo de voleibol mixto',
      inscrito: false,
    },
    {
      id: '4',
      nombre: 'Baloncesto Liga Mayor',
      deporte: 'Baloncesto',
      estado: 'finalizado',
      fechaInicio: '2024-12-01',
      equipos: 10,
      maxEquipos: 10,
      organizador: 'Federación de Baloncesto',
      descripcion: 'Torneo profesional de baloncesto',
      inscrito: true,
    },
  ];

  const filtered = mockTournaments.filter((t) => {
    if (filter === 'mis-torneos') return t.inscrito;
    if (filter === 'disponibles') return !t.inscrito && t.estado === 'registracion';
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Torneos</h1>
            <p className="text-muted-foreground mt-1">Descubre y participa en torneos deportivos</p>
          </div>
          <Link href="/dashboard/torneos/crear">
            <Button className="bg-primary hover:bg-primary/90">
              ➕ Crear Torneo
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['todos', 'mis-torneos', 'disponibles'] as const).map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? 'default' : 'outline'}
              onClick={() => setFilter(tab)}
              className={filter === tab ? 'bg-primary' : ''}
            >
              {tab === 'todos' && 'Todos'}
              {tab === 'mis-torneos' && 'Mis Torneos'}
              {tab === 'disponibles' && 'Disponibles'}
            </Button>
          ))}
        </div>

        {/* Tournaments Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tournament) => (
            <Link key={tournament.id} href={`/dashboard/torneos/${tournament.id}`}>
              <TournamentCard tournament={tournament} />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">No hay torneos disponibles en esta categoría</p>
              <Link href="/dashboard/torneos/crear">
                <Button className="bg-primary hover:bg-primary/90">
                  Crear tu primer torneo
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
