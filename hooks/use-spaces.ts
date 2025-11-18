'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { Space, SportType } from '@/types'

export function useSpaces(sport?: SportType) {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSpaces = async () => {
    console.log('[v0] Fetching spaces')
    const endpoint = sport ? `/spaces?sport=${sport}` : '/spaces'
    const response = await api.get<Space[]>(endpoint)
    
    if (response.data) {
      setSpaces(response.data)
    } else {
      setError(response.error || 'Error al cargar espacios')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchSpaces()
  }, [sport])

  return { spaces, loading, error, refetch: fetchSpaces }
}
