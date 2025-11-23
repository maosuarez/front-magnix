'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TournamentBracket() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bracket del Torneo</CardTitle>
        <CardDescription>Visualiza el avance de la competencia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full p-8 bg-muted/50 rounded-lg">
            {/* Fase 1 */}
            <div className="flex gap-8 items-start">
              {/* Semifinales */}
              <div className="min-w-max">
                <h4 className="text-sm font-semibold mb-4">Semifinales</h4>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-border rounded px-3 py-2 min-w-40">
                      <p className="text-xs text-muted-foreground">Equipo {i}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flechas */}
              <div className="flex flex-col justify-around h-48">
                {[1, 2].map((i) => (
                  <div key={i} className="h-px w-8 bg-border"></div>
                ))}
              </div>

              {/* Finales */}
              <div className="min-w-max">
                <h4 className="text-sm font-semibold mb-4">Finales</h4>
                <div className="space-y-12">
                  <div className="border border-border rounded px-3 py-2 min-w-40">
                    <p className="text-xs text-muted-foreground">Ganador SF1</p>
                  </div>
                  <div className="border border-border rounded px-3 py-2 min-w-40">
                    <p className="text-xs text-muted-foreground">Ganador SF2</p>
                  </div>
                </div>
              </div>

              {/* Flechas */}
              <div className="flex flex-col justify-around h-48">
                <div className="h-px w-8 bg-border"></div>
              </div>

              {/* Campeón */}
              <div className="min-w-max">
                <h4 className="text-sm font-semibold mb-4">Campeón</h4>
                <div className="border-2 border-primary rounded px-3 py-2 min-w-40 bg-primary/5">
                  <p className="text-sm font-semibold text-primary">Por determinarse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
