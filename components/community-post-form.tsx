'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CommunityPostFormProps {
  onSubmit: (contenido: string, deporte: string) => void;
}

export function CommunityPostForm({ onSubmit }: CommunityPostFormProps) {
  const [contenido, setContenido] = useState('');
  const [deporte, setDeporte] = useState('futbol');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (contenido.trim()) {
      onSubmit(contenido, deporte);
      setContenido('');
      setIsExpanded(false);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <div className="text-3xl">👤</div>
          <div className="flex-1">
            <textarea
              placeholder="¿Qué quieres compartir con la comunidad?"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none min-h-12"
            />
            {isExpanded && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-sm font-medium">Deporte</label>
                  <select
                    value={deporte}
                    onChange={(e) => setDeporte(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm mt-1"
                  >
                    <option value="futbol">Fútbol</option>
                    <option value="tenis">Tenis</option>
                    <option value="baloncesto">Baloncesto</option>
                    <option value="voleibol">Voleibol</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary/90"
                    disabled={!contenido.trim()}
                  >
                    Publicar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsExpanded(false);
                      setContenido('');
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
