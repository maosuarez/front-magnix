'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TournamentBracket } from '@/components/tournament-bracket';

type TabType = 'info' | 'equipos' | 'fixtures' | 'bracket';

export default function TournamentDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isInscribed, setIsInscribed] = useState(false);

  const mockTournament = {
    id: params.id,
    nombre: 'Liga de Fútbol Metropolitana',
    deporte: 'Fútbol',
    estado: 'registracion' as const,
    fechaInicio: '2025-02-01',
    fechaFin: '2025-04-30',
    equipos: 8,
    maxEquipos: 16,
    organizador: 'Federación de Fútbol',
    descripcion: 'Torneo de fútbol de 11 vs 11 para equipos aficionados',
    reglamento: 'Cada equipo debe tener al menos 11 jugadores. Se jugarán dos rondas de todos contra todos.',
    premios: 'Primer lugar: $5000 | Segundo lugar: $2500 | Tercer lugar: $1000',
  };

  const mockEquipos = [
    { id: '1', nombre: 'Atlético Futuro', integrantes: 15, ganadas: 3, empatadas: 1, perdidas: 0 },
    { id: '2', nombre: 'FC Dragons', integrantes: 12, ganadas: 2, empatadas: 2, perdidas: 1 },
    { id: '3', nombre: 'Eagles United', integrantes: 14, ganadas: 1, empatadas: 1, perdidas: 2 },
    { id: '4', nombre: 'Mi Equipo', integrantes: 11, ganadas: 2, empatadas: 0, perdidas: 1 },
  ];

  const mockFixtures = [
    { id: '1', equipo1: 'Atlético Futuro', equipo2: 'FC Dragons', fecha: '2025-02-05', resultado: '2-1' },
    { id: '2', equipo1: 'Eagles United', equipo2: 'Mi Equipo', fecha: '2025-02-08', resultado: null },
    { id: '3', equipo1: 'FC Dragons', equipo2: 'Eagles United', fecha: '2025-02-12', resultado: '1-0' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{mockTournament.nombre}</h1>
            <p className="text-muted-foreground mt-1">{mockTournament.deporte}</p>
          </div>
          <Button
            className={`${isInscribed ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
            onClick={() => setIsInscribed(!isInscribed)}
          >
            {isInscribed ? '✕ Desinscribirse' : '✓ Inscribirse'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {(['info', 'equipos', 'fixtures', 'bracket'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary -mb-px'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'info' && 'Información'}
              {tab === 'equipos' && 'Equipos'}
              {tab === 'fixtures' && 'Fixtures'}
              {tab === 'bracket' && 'Bracket'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'info' && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Acerca del Torneo</p>
                  <p className="text-muted-foreground">{mockTournament.descripcion}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Reglamento</p>
                  <p className="text-muted-foreground">{mockTournament.reglamento}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Premios</p>
                  <p className="text-muted-foreground">{mockTournament.premios}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Organizador</p>
                  <p className="font-semibold">{mockTournament.organizador}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Inicio</p>
                  <p className="font-semibold">{new Date(mockTournament.fechaInicio).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fin</p>
                  <p className="font-semibold">{new Date(mockTournament.fechaFin).toLocaleDateString('es-ES')}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-muted-foreground">Equipos</p>
                  <p className="font-semibold">{mockTournament.equipos}/{mockTournament.maxEquipos}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'equipos' && (
          <div className="grid gap-4 md:grid-cols-2">
            {mockEquipos.map((equipo) => (
              <Card key={equipo.id} className="hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{equipo.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{equipo.integrantes} integrantes</p>
                    </div>
                    {equipo.nombre === 'Mi Equipo' && (
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                        Tu equipo
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="p-2 rounded bg-green-100 text-green-800">
                      <p className="font-semibold">{equipo.ganadas}</p>
                      <p>Ganancias</p>
                    </div>
                    <div className="p-2 rounded bg-yellow-100 text-yellow-800">
                      <p className="font-semibold">{equipo.empatadas}</p>
                      <p>Empates</p>
                    </div>
                    <div className="p-2 rounded bg-red-100 text-red-800">
                      <p className="font-semibold">{equipo.perdidas}</p>
                      <p>Derrotas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'fixtures' && (
          <div className="space-y-3">
            {mockFixtures.map((fixture) => (
              <Card key={fixture.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{fixture.equipo1}</p>
                    </div>
                    <div className="px-4 text-center">
                      {fixture.resultado ? (
                        <p className="text-xl font-bold">{fixture.resultado}</p>
                      ) : (
                        <p className="text-muted-foreground">Por jugar</p>
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-semibold">{fixture.equipo2}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {new Date(fixture.fecha).toLocaleDateString('es-ES')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'bracket' && (
          <TournamentBracket />
        )}
      </div>
    </DashboardLayout>
  );
}
