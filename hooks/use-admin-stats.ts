'use client'

import { useState, useEffect } from 'react';


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
      try {
        const res = await fetch('/admin/stats')
        if (!res.ok) {
          setError(`Error fetching statistics: ${res.status} ${res.statusText}`)
          setLoading(false)
          return
        }
        const data: AdminStats = await res.json()
        setStats(data)
      } catch (err: any) {
        setError(err?.message || 'Error al cargar estadísticas')
      }
      
      setLoading(false)
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
