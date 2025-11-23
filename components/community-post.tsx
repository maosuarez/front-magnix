'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  autor: {
    nombre: string;
    avatar: string;
  };
  deporte: string;
  contenido: string;
  imagen?: string;
  fecha: string;
  likes: number;
  comentarios: number;
  meGusta: boolean;
}

interface CommunityPostProps {
  post: Post;
  onToggleLike: () => void;
}

export function CommunityPost({ post, onToggleLike }: CommunityPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isReporting, setIsReporting] = useState(false);

  const timeAgo = (fecha: string) => {
    const diff = Date.now() - new Date(fecha).getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 60) return `hace ${minutos}m`;
    if (horas < 24) return `hace ${horas}h`;
    return `hace ${dias}d`;
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setNewComment('');
      // TODO: Submit comment to API
    }
  };

  return (
    <Card className="hover:border-primary transition-colors">
      <CardContent className="pt-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{post.autor.avatar}</div>
            <div>
              <p className="font-semibold">{post.autor.nombre}</p>
              <p className="text-xs text-muted-foreground">{timeAgo(post.fecha)}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReporting(!isReporting)}
              className="text-muted-foreground hover:text-destructive"
            >
              ⚠️
            </Button>
          </div>
        </div>

        {/* Report Form */}
        {isReporting && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-xs font-semibold mb-2">Reportar publicación</p>
            <select className="w-full text-xs px-2 py-1 border border-border rounded mb-2 bg-background">
              <option>Contenido inapropiado</option>
              <option>Spam</option>
              <option>Acoso</option>
              <option>Otro</option>
            </select>
            <div className="flex gap-2">
              <Button size="sm" variant="destructive" className="text-xs">
                Enviar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsReporting(false)}
                className="text-xs"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Post Content */}
        <p className="mb-3">{post.contenido}</p>

        {/* Post Image */}
        {post.imagen && (
          <img
            src={post.imagen || "/placeholder.svg"}
            alt="Post"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Engagement Stats */}
        <div className="flex gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
          <span>👍 {post.likes} me gusta</span>
          <span>💬 {post.comentarios} comentarios</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLike}
            className={`flex-1 ${post.meGusta ? 'text-primary' : 'text-muted-foreground'}`}
          >
            👍 {post.meGusta ? 'Me gusta' : 'Me gusta'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1"
          >
            💬 Comentar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
          >
            🔗 Compartir
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 border-t border-border pt-4">
            {/* Comment Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
              />
              <Button
                size="sm"
                onClick={handleComment}
                className="bg-primary hover:bg-primary/90"
              >
                Enviar
              </Button>
            </div>

            {/* Sample Comments */}
            <div className="space-y-2">
              {[
                { autor: 'Ana Silva', texto: '¡Increíble! Felicidades! 🎉' },
                { autor: 'Pedro Martín', texto: 'Quiero unirme al equipo, ¿dónde entrenas?' },
              ].map((comentario, i) => (
                <div key={i} className="text-sm">
                  <p><span className="font-semibold">{comentario.autor}</span> {comentario.texto}</p>
                  <p className="text-xs text-muted-foreground mt-1">Hace 2 horas · Me gusta · Responder</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
