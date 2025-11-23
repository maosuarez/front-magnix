'use client';

import { useState } from 'react';
import { CommunityPost } from './community-post';
import { CommunityPostForm } from './community-post-form';

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

interface CommunityFeedProps {
  sport: 'todos' | 'futbol' | 'tenis' | 'baloncesto' | 'voleibol';
}

export function CommunityFeed({ sport }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      autor: { nombre: 'Juan Pérez', avatar: '👨' },
      deporte: 'futbol',
      contenido: '¡Gran partido hoy! Nuestro equipo ganó 3-2. Increíble segundo tiempo. 🔥',
      imagen: '/futbol-match-celebration.jpg',
      fecha: '2025-01-19T14:30:00',
      likes: 24,
      comentarios: 5,
      meGusta: false,
    },
    {
      id: '2',
      autor: { nombre: 'María García', avatar: '👩' },
      deporte: 'tenis',
      contenido: 'Completé mi primer torneo de tenis. ¡Qué experiencia tan emocionante! 🎾',
      fecha: '2025-01-18T10:15:00',
      likes: 18,
      comentarios: 8,
      meGusta: true,
    },
    {
      id: '3',
      autor: { nombre: 'Carlos López', avatar: '👨' },
      deporte: 'baloncesto',
      contenido: 'Buscamos jugadores para entrenamientos de baloncesto todos los martes a las 7 PM. ¡Únete a nosotros!',
      fecha: '2025-01-17T16:45:00',
      likes: 12,
      comentarios: 3,
      meGusta: false,
    },
  ]);

  const filteredPosts = posts.filter(post => 
    sport === 'todos' || post.deporte === sport
  );

  const handleToggleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            meGusta: !post.meGusta,
            likes: post.meGusta ? post.likes - 1 : post.likes + 1,
          }
        : post
    ));
  };

  const handleNewPost = (contenido: string, deporte: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      autor: { nombre: 'Tú', avatar: '👤' },
      deporte,
      contenido,
      fecha: new Date().toISOString(),
      likes: 0,
      comentarios: 0,
      meGusta: false,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <CommunityPostForm onSubmit={handleNewPost} />
      {filteredPosts.map(post => (
        <CommunityPost
          key={post.id}
          post={post}
          onToggleLike={() => handleToggleLike(post.id)}
        />
      ))}
      {filteredPosts.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          No hay publicaciones en esta categoría
        </div>
      )}
    </div>
  );
}
