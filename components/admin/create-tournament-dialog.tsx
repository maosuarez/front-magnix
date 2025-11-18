'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, Loader2 } from 'lucide-react'
import { api } from '@/lib/api-client'
import type { SportType } from '@/types'

const SPORT_OPTIONS: { value: SportType; label: string }[] = [
  { value: 'FOOTBALL', label: 'Fútbol' },
  { value: 'BASKETBALL', label: 'Baloncesto' },
  { value: 'TENNIS', label: 'Tenis' },
  { value: 'VOLLEYBALL', label: 'Voleibol' },
]

interface CreateTournamentDialogProps {
  onTournamentCreated: () => void
}

export function CreateTournamentDialog({ onTournamentCreated }: CreateTournamentDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sport, setSport] = useState<SportType>('FOOTBALL')
  const [maxTeams, setMaxTeams] = useState('8')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [creating, setCreating] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim() || !startDate || !endDate) return

    setCreating(true)
    const response = await api.post('/tournaments', {
      name: name.trim(),
      description: description.trim(),
      sport,
      maxTeams: parseInt(maxTeams),
      startDate,
      endDate,
    })
    setCreating(false)

    if (response.data) {
      setName('')
      setDescription('')
      setSport('FOOTBALL')
      setMaxTeams('8')
      setStartDate('')
      setEndDate('')
      setOpen(false)
      onTournamentCreated()
    } else {
      alert(response.error || 'Error al crear torneo')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Crear Torneo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Torneo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Copa de Fútbol 2025"
              disabled={creating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del torneo..."
              rows={3}
              disabled={creating}
            />
          </div>

          <div className="space-y-2">
            <Label>Deporte</Label>
            <div className="flex flex-wrap gap-2">
              {SPORT_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={sport === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSport(option.value)}
                  type="button"
                  disabled={creating}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxTeams">Equipos Máx.</Label>
              <Input
                id="maxTeams"
                type="number"
                value={maxTeams}
                onChange={(e) => setMaxTeams(e.target.value)}
                min="2"
                disabled={creating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha Inicio</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={creating}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Fecha Fin</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={creating}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={creating}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name.trim() || !startDate || !endDate || creating}
            >
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                'Crear Torneo'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
