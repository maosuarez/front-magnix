'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'

interface TimeSlot {
  time: string
  available: boolean
}

export function useSpaceAvailability(spaceId: string, date: string) {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!spaceId || !date) return

    const fetchAvailability = async () => {
      console.log('[v0] Fetching availability for space:', spaceId, 'date:', date)
      const response = await api.get<TimeSlot[]>(
        `/spaces/${spaceId}/availability?date=${date}`
      )
      
      if (response.data) {
        setSlots(response.data)
      } else {
        setError(response.error || 'Error al cargar disponibilidad')
      }
      
      setLoading(false)
    }

    fetchAvailability()
  }, [spaceId, date])

  return { slots, loading, error }
}
