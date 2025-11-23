'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportedPost {
  id: string;
  autor: string;
  contenido: string;
  razon: string;
  reportes: number;
  fecha: string;
}

export default function AdminModerationPage() {
  const [posts, setPosts] = useState<ReportedPost[]>([
    {
      id: '1',
      autor: 'Usuario123',
      contenido: 'Contenido ofensivo reportado por múltiples usuarios',
      razon: 'Acoso',
      reportes: 5,
      fecha: '2025-01-19',
    },
    {
      id: '2',
      autor: 'Spammer456',
      contenido: 'Publicidad no autorizada - Enlaces sospechosos',
      razon: 'Spam',
      reportes: 8,
      fecha: '2025-01-18',
    },
  ]);

  const handleApprove = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    alert('Publicación aprobada');
  };

  const handleReject = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    alert('Publicación rechazada');
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Moderación de Comunidad</h1>
          <p className="text-muted-foreground mt-1">Revisa y modera publicaciones reportadas</p>
        </div>

        {/* Reported Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-yellow-200 bg-yellow-50/50">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{post.autor}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(post.fecha).toLocaleDateString('es-ES')}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-800">
                      ⚠️ {post.reportes} reportes
                    </span>
                  </div>
                  <p className="text-sm mb-3">{post.contenido}</p>
                  <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                    Motivo: {post.razon}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(post.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    ✓ Aprobar
                  </Button>
                  <Button
                    onClick={() => handleReject(post.id)}
                    variant="destructive"
                  >
                    ✕ Rechazar
                  </Button>
                  <Button variant="outline">
                    👁️ Ver Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No hay publicaciones pendientes de moderación</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
