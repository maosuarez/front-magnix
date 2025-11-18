'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { Tournament } from '@/types'

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTournaments = async () => {
    console.log('[v0] Fetching tournaments')
    const response = await api.get<Tournament[]>('/tournaments')
    
    if (response.data) {
      setTournaments(response.data)
    } else {
      setError(response.error || 'Error al cargar torneos')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchTournaments()
  }, [])

  return { tournaments, loading, error, refetch: fetchTournaments }
}
