'use client'

import { useState, useEffect } from 'react'

// Define UserProfile locally because '@/hooks/use-auth' does not export it.
// Adjust fields as needed to match your application's user shape.
type UserProfile = {
  id: string
  name?: string
  email?: string
  role?: string
}

export function useAdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    console.log('[v0] Fetching users')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/admin/users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!res.ok) {
        const text = await res.text().catch(() => null)
        setError(text || `Error fetching users: ${res.status}`)
        setUsers([])
        return
      }

      const data = (await res.json()) as UserProfile[]
      setUsers(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err?.message || 'Error al cargar usuarios')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const updateUser = async (userId: string, data: Partial<UserProfile>) => {
    try {
      const res = await fetch(`/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => null)
        return { success: false, error: text || `Request failed: ${res.status}` }
      }

      await fetchUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network error' }
    }
  }

  return { users, loading, error, updateUser, refetch: fetchUsers }
}
