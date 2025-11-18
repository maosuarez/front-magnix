'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'

interface AdminStats {
  totalUsers: number
  totalTournaments: number
  totalReservations: number
  totalPosts: number
  activeUsers: number
  revenue: number
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      console.log('[v0] Fetching admin statistics')
      const response = await api.get<AdminStats>('/admin/stats')
      
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
