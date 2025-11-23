'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CommunityFeed } from '@/components/community-feed';

type SportFilter = 'todos' | 'futbol' | 'tenis' | 'baloncesto' | 'voleibol';

export default function CommunityPage() {
  const [filter, setFilter] = useState<SportFilter>('todos');

  const sports = [
    { id: 'futbol', label: 'Fútbol', icon: '⚽' },
    { id: 'tenis', label: 'Tenis', icon: '🎾' },
    { id: 'baloncesto', label: 'Baloncesto', icon: '🏀' },
    { id: 'voleibol', label: 'Voleibol', icon: '🏐' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Comunidad</h1>
            <p className="text-muted-foreground mt-1">Conecta con otros deportistas y comparte tu pasión</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            ✏️ Nueva Publicación
          </Button>
        </div>

        {/* Sport Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={filter === 'todos' ? 'default' : 'outline'}
            onClick={() => setFilter('todos')}
            className={filter === 'todos' ? 'bg-primary' : ''}
          >
            Todos
          </Button>
          {sports.map((sport) => (
            <Button
              key={sport.id}
              variant={filter === sport.id as SportFilter ? 'default' : 'outline'}
              onClick={() => setFilter(sport.id as SportFilter)}
              className={filter === sport.id as SportFilter ? 'bg-primary' : ''}
            >
              {sport.icon} {sport.label}
            </Button>
          ))}
        </div>

        {/* Feed */}
        <CommunityFeed sport={filter} />
      </div>
    </DashboardLayout>
  );
}
