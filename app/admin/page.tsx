'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { mes: 'Ene', usuarios: 120, reservas: 45, torneos: 8 },
  { mes: 'Feb', usuarios: 180, reservas: 65, torneos: 12 },
  { mes: 'Mar', usuarios: 220, reservas: 89, torneos: 15 },
  { mes: 'Abr', usuarios: 290, reservas: 120, torneos: 19 },
];

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.rol !== 'administrador') {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground mt-1">Gestión general de Magnix</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Usuarios Totales', value: '1,248', icon: '👥', trend: '+12%' },
            { label: 'Reservas Activas', value: '342', icon: '📅', trend: '+8%' },
            { label: 'Torneos', value: '24', icon: '🏆', trend: '+4' },
            { label: 'Reportes Pendientes', value: '7', icon: '⚠️', trend: '-2' },
          ].map((metric) => (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-3xl font-bold mt-2">{metric.value}</p>
                    <p className="text-xs text-green-600 mt-1">{metric.trend}</p>
                  </div>
                  <span className="text-2xl">{metric.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad del Sistema</CardTitle>
            <CardDescription>Crecimiento de usuarios, reservas y torneos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="usuarios" stroke="hsl(142.5, 50%, 50%)" />
                <Line type="monotone" dataKey="reservas" stroke="hsl(0, 0%, 20%)" />
                <Line type="monotone" dataKey="torneos" stroke="hsl(0, 0%, 80%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimos Usuarios</CardTitle>
              <CardDescription>Usuarios registrados recientemente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { nombre: 'Carlos Rodríguez', email: 'carlos@example.com', fecha: 'Hoy' },
                { nombre: 'Ana Martínez', email: 'ana@example.com', fecha: 'Ayer' },
                { nombre: 'Pedro López', email: 'pedro@example.com', fecha: 'Hace 2 días' },
              ].map((usuario, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{usuario.nombre}</p>
                    <p className="text-xs text-muted-foreground">{usuario.email}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{usuario.fecha}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservas Recientes</CardTitle>
              <CardDescription>Últimas reservas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { espacio: 'Cancha A', usuario: 'Juan Pérez', fecha: 'Hoy 14:00' },
                { espacio: 'Cancha B', usuario: 'María García', fecha: 'Hoy 10:00' },
                { espacio: 'Cancha C', usuario: 'Carlos López', fecha: 'Ayer 18:00' },
              ].map((reserva, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{reserva.espacio}</p>
                    <p className="text-xs text-muted-foreground">{reserva.usuario}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{reserva.fecha}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
