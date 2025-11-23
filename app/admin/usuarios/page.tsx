'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  fechaRegistro: string;
}

export default function AdminUsersPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: '1', nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'usuario', estado: 'activo', fechaRegistro: '2025-01-10' },
    { id: '2', nombre: 'María García', email: 'maria@example.com', rol: 'usuario', estado: 'activo', fechaRegistro: '2025-01-12' },
    { id: '3', nombre: 'Carlos López', email: 'carlos@example.com', rol: 'usuario', estado: 'inactivo', fechaRegistro: '2025-01-08' },
  ]);

  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteUser = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const handleSuspendUser = (id: string) => {
    setUsuarios(usuarios.map(u =>
      u.id === id ? { ...u, estado: u.estado === 'suspendido' ? 'activo' : 'suspendido' } : u
    ));
  };

  const filtered = usuarios.filter(u => {
    const matchFilter = filter === 'todos' || u.estado === filter;
    const matchSearch = u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'inactivo': return 'bg-yellow-100 text-yellow-800';
      case 'suspendido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">Administra los usuarios del sistema</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            ➕ Nuevo Usuario
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="todos">Todos</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
                <option value="suspendido">Suspendidos</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Rol</th>
                    <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold">Registro</th>
                    <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{usuario.nombre}</td>
                      <td className="py-3 px-4">{usuario.email}</td>
                      <td className="py-3 px-4 capitalize">{usuario.rol}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded capitalize ${getStatusColor(usuario.estado)}`}>
                          {usuario.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(usuario.fechaRegistro).toLocaleDateString('es-ES')}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuspendUser(usuario.id)}
                            className={usuario.estado === 'suspendido' ? 'text-green-600' : 'text-yellow-600'}
                          >
                            {usuario.estado === 'suspendido' ? 'Activar' : 'Suspender'}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(usuario.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
