'use client';

import { Card, CardContent } from '@/components/ui/card';

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

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const getStatusColor = (estado: Tournament['estado']) => {
    switch (estado) {
      case 'registracion':
        return 'bg-blue-100 text-blue-800';
      case 'en-curso':
        return 'bg-green-100 text-green-800';
      case 'finalizado':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (estado: Tournament['estado']) => {
    switch (estado) {
      case 'registracion':
        return 'Inscripciones Abiertas';
      case 'en-curso':
        return 'En Curso';
      case 'finalizado':
        return 'Finalizado';
    }
  };

  const spotsAvailable = tournament.maxEquipos - tournament.equipos;

  return (
    <Card className="hover:border-primary transition-colors h-full cursor-pointer hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold line-clamp-2">{tournament.nombre}</h3>
            <p className="text-xs text-muted-foreground">{tournament.deporte}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${getStatusColor(tournament.estado)}`}>
            {getStatusLabel(tournament.estado)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tournament.descripcion}</p>

        <div className="space-y-2 mb-4 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Organizador:</span>
            <span className="font-medium">{tournament.organizador}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Inicio:</span>
            <span className="font-medium">{new Date(tournament.fechaInicio).toLocaleDateString('es-ES')}</span>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold">{tournament.equipos}</span>
              <span className="text-muted-foreground">/{tournament.maxEquipos}</span>
            </div>
            {tournament.inscrito && (
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                ✓ Inscrito
              </span>
            )}
            {!tournament.inscrito && tournament.estado === 'registracion' && spotsAvailable > 0 && (
              <span className="text-xs text-green-600">+{spotsAvailable} lugares</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
