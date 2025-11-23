'use client';

import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockStats = [
  { label: 'Reservas', value: '12', icon: '📅' },
  { label: 'Torneos', value: '3', icon: '🏆' },
  { label: 'Publicaciones', value: '8', icon: '📝' },
  { label: 'Comunidad', value: '45', icon: '👥' },
];

const mockChartData = [
  { mes: 'Ene', reservas: 4, torneos: 2 },
  { mes: 'Feb', reservas: 3, torneos: 1 },
  { mes: 'Mar', reservas: 5, torneos: 3 },
  { mes: 'Abr', reservas: 6, torneos: 2 },
  { mes: 'May', reservas: 8, torneos: 4 },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Bienvenido, {user?.nombre}</h1>
          <p className="text-muted-foreground mt-1">Aquí está tu resumen de actividad</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          {mockStats.map((stat) => (
            <Card key={stat.label} className="bg-card hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Mensual</CardTitle>
              <CardDescription>Reservas y torneos por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reservas" fill="hsl(142.5, 50%, 50%)" />
                  <Bar dataKey="torneos" fill="hsl(0, 0%, 20%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Accede a las funciones principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                ➕ Nueva Reserva
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                ➕ Crear Torneo
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                ➕ Nueva Publicación
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                👀 Ver Comunidad
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Tus últimas acciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Reserva', desc: 'Cancha de fútbol - Campo A', date: 'Hace 2 días' },
                { type: 'Torneo', desc: 'Inscripción - Liga de Tenis', date: 'Hace 5 días' },
                { type: 'Comunidad', desc: 'Publicación en Fútbol', date: 'Hace 1 semana' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
