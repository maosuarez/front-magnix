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

interface CreatePostDialogProps {
  onPostCreated: () => void
}

export function CreatePostDialog({ onPostCreated }: CreatePostDialogProps) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [sport, setSport] = useState<SportType>('FOOTBALL')
  const [creating, setCreating] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return

    setCreating(true)
    const response = await api.post('/posts', {
      content: content.trim(),
      sport,
    })
    setCreating(false)

    if (response.data) {
      setContent('')
      setSport('FOOTBALL')
      setOpen(false)
      onPostCreated()
    } else {
      alert(response.error || 'Error al crear publicación')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Publicación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Publicación</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              placeholder="¿Qué quieres compartir con la comunidad?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              disabled={creating}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={creating}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!content.trim() || creating}>
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                'Publicar'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
