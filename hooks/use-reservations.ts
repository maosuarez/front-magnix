'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { Reservation } from '@/types'

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReservations = async () => {
    console.log('[v0] Fetching user reservations')
    const response = await api.get<Reservation[]>('/reservations')
    
    if (response.data) {
      setReservations(response.data)
    } else {
      setError(response.error || 'Error al cargar reservas')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const cancelReservation = async (id: string) => {
    const response = await api.put(`/reservations/${id}/cancel`)
    
    if (response.data) {
      await fetchReservations()
      return { success: true }
    }
    
    return { success: false, error: response.error }
  }

  return { reservations, loading, error, cancelReservation, refetch: fetchReservations }
}
