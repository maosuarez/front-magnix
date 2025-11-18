'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { UserStatistics } from '@/types'

export function useUserStats() {
  const [stats, setStats] = useState<UserStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      console.log('[v0] Fetching user statistics')
      const response = await api.get<UserStatistics>('/users/statistics')
      
      if (response.data) {
        setStats(response.data)
      } else {
        setError(response.error || 'Error al cargar estadísticas')
      }
      
      setLoading(false)
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
