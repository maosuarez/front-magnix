'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { CommunityPost, SportType } from '@/types'

export function useCommunityPosts(sport?: SportType) {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    console.log('[v0] Fetching community posts')
    const endpoint = sport ? `/posts?sport=${sport}` : '/posts'
    const response = await api.get<CommunityPost[]>(endpoint)
    
    if (response.data) {
      setPosts(response.data)
    } else {
      setError(response.error || 'Error al cargar publicaciones')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [sport])

  const likePost = async (postId: string) => {
    const response = await api.post(`/posts/${postId}/like`)
    
    if (response.data) {
      await fetchPosts()
      return { success: true }
    }
    
    return { success: false, error: response.error }
  }

  const deletePost = async (postId: string) => {
    const response = await api.delete(`/posts/${postId}`)
    
    if (response.data) {
      await fetchPosts()
      return { success: true }
    }
    
    return { success: false, error: response.error }
  }

  return { posts, loading, error, likePost, deletePost, refetch: fetchPosts }
}
