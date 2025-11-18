'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { UserProfile } from '@/hooks/use-auth'

export function useAdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    console.log('[v0] Fetching users')
    const response = await api.get<UserProfile[]>('/admin/users')
    
    if (response.data) {
      setUsers(response.data)
    } else {
      setError(response.error || 'Error al cargar usuarios')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const updateUser = async (userId: string, data: Partial<UserProfile>) => {
    const response = await api.put(`/admin/users/${userId}`, data)
    
    if (response.data) {
      await fetchUsers()
      return { success: true }
    }
    
    return { success: false, error: response.error }
  }

  return { users, loading, error, updateUser, refetch: fetchUsers }
}
