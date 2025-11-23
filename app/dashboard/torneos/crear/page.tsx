'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateTournamentPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    deporte: '',
    fechaInicio: '',
    fechaFin: '',
    maxEquipos: '8',
    descripcion: '',
    reglamento: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create tournament
    alert('Torneo creado exitosamente');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Crear Torneo</h1>
          <p className="text-muted-foreground mt-1">Organiza un nuevo torneo deportivo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Datos principales del torneo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Torneo</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Liga de Fútbol Metropolitana"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deporte">Deporte</Label>
                <select
                  id="deporte"
                  name="deporte"
                  value={formData.deporte}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  required
                >
                  <option value="">Selecciona un deporte</option>
                  <option value="futbol">Fútbol</option>
                  <option value="tenis">Tenis</option>
                  <option value="baloncesto">Baloncesto</option>
                  <option value="voleibol">Voleibol</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                  <Input
                    id="fechaInicio"
                    name="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha Fin</Label>
                  <Input
                    id="fechaFin"
                    name="fechaFin"
                    type="date"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxEquipos">Máximo de Equipos</Label>
                <Input
                  id="maxEquipos"
                  name="maxEquipos"
                  type="number"
                  min="2"
                  max="32"
                  value={formData.maxEquipos}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
              <CardDescription>Detalles del torneo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del Torneo</Label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe los detalles principales del torneo"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-20 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reglamento">Reglamento</Label>
                <textarea
                  id="reglamento"
                  name="reglamento"
                  value={formData.reglamento}
                  onChange={handleChange}
                  placeholder="Especifica las reglas y normas del torneo"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-20 resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Crear Torneo
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
