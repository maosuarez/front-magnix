'use client'

import { useState } from 'react'
import { usePostComments } from '@/hooks/use-post-comments'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { comments, loading, addComment } = usePostComments(postId)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.trim()) return

    setSubmitting(true)
    const result = await addComment(newComment)
    setSubmitting(false)

    if (result.success) {
      setNewComment('')
    } else {
      alert(result.error || 'Error al agregar comentario')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.userPhotoUrl || "/placeholder.svg"} alt={comment.userName} />
              <AvatarFallback className="text-xs">
                {comment.userName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{comment.userName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <p className="text-sm text-foreground">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Textarea
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={2}
          disabled={submitting}
        />
        <Button
          onClick={handleSubmit}
          disabled={!newComment.trim() || submitting}
          size="icon"
          className="shrink-0"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
