'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: '',
    ciudad: '',
    deporte: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // TODO: Implement API call to update profile
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-muted-foreground mt-1">Gestiona tu información personal</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary hover:bg-primary/90"
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        </div>

        {/* Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
              👤
            </div>
            {isEditing && (
              <Button variant="outline">Cambiar Foto</Button>
            )}
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Tus datos básicos de cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Tu número de teléfono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Tu ciudad"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deporte">Deporte Favorito</Label>
              <select
                id="deporte"
                name="deporte"
                value={formData.deporte}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Selecciona un deporte</option>
                <option value="futbol">Fútbol</option>
                <option value="tenis">Tenis</option>
                <option value="baloncesto">Baloncesto</option>
                <option value="voleibol">Voleibol</option>
              </select>
            </div>

            {isEditing && (
              <Button
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Guardar Cambios
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
              🔐 Cambiar Contraseña
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
              🔔 Notificaciones
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
              🗑️ Eliminar Cuenta
            </button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
