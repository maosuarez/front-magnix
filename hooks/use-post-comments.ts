'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { Comment } from '@/types'

export function usePostComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    if (!postId) return
    
    console.log('[v0] Fetching comments for post:', postId)
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`)
    
    if (response.data) {
      setComments(response.data)
    } else {
      setError(response.error || 'Error al cargar comentarios')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const addComment = async (content: string) => {
    const response = await api.post(`/posts/${postId}/comments`, { content })
    
    if (response.data) {
      await fetchComments()
      return { success: true }
    }
    
    return { success: false, error: response.error }
  }

  return { comments, loading, error, addComment, refetch: fetchComments }
}
