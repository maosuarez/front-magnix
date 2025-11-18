'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Trash2, Loader2 } from 'lucide-react'
import type { CommunityPost } from '@/types'
import { useAuthContext } from '@/components/auth-provider'

const SPORT_LABELS = {
  FOOTBALL: 'Fútbol',
  BASKETBALL: 'Baloncesto',
  TENNIS: 'Tenis',
  VOLLEYBALL: 'Voleibol',
}

interface PostCardProps {
  post: CommunityPost
  onLike: (postId: string) => Promise<void>
  onDelete?: (postId: string) => Promise<void>
  onComment: (postId: string) => void
}

export function PostCard({ post, onLike, onDelete, onComment }: PostCardProps) {
  const { profile } = useAuthContext()
  const [isLiking, setIsLiking] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLike = async () => {
    setIsLiking(true)
    await onLike(post.id)
    setIsLiking(false)
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta publicación?')) return
    
    setIsDeleting(true)
    if (onDelete) {
      await onDelete(post.id)
    }
    setIsDeleting(false)
  }

  const canDelete = profile?.id === post.userId || profile?.role === 'ADMIN'

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.userPhotoUrl || "/placeholder.svg"} alt={post.userName} />
              <AvatarFallback>
                {post.userName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.userName}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {SPORT_LABELS[post.sport]}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString('es-ES', {
                    dateStyle: 'medium',
                  })}
                </p>
              </div>
            </div>
          </div>
          {canDelete && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 text-destructive" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>

        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt="Post image"
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Button
            variant={post.liked ? 'default' : 'ghost'}
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className="gap-2"
          >
            {isLiking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
            )}
            {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(post.id)}
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            {post.commentsCount}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
