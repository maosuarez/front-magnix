'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCommunityPosts } from '@/hooks/use-community-posts'
import { useAuthContext } from '@/components/auth-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/community/post-card'
import { CommentSection } from '@/components/community/comment-section'
import { CreatePostDialog } from '@/components/community/create-post-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Users, Loader2 } from 'lucide-react'
import type { SportType } from '@/types'

const SPORT_OPTIONS = [
  { value: 'ALL', label: 'Todos' },
  { value: 'FOOTBALL', label: 'Fútbol' },
  { value: 'BASKETBALL', label: 'Baloncesto' },
  { value: 'TENNIS', label: 'Tenis' },
  { value: 'VOLLEYBALL', label: 'Voleibol' },
]

export default function CommunityPage() {
  const searchParams = useSearchParams()
  const initialSport = searchParams.get('sport') as SportType | null
  
  const [selectedSport, setSelectedSport] = useState<SportType | 'ALL'>(
    initialSport || 'ALL'
  )
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null)

  const { isAuthenticated } = useAuthContext()
  const { posts, loading, likePost, deletePost, refetch } = useCommunityPosts(
    selectedSport === 'ALL' ? undefined : selectedSport
  )

  const handleLike = async (postId: string) => {
    await likePost(postId)
  }

  const handleDelete = async (postId: string) => {
    await deletePost(postId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Comunidad
              </h1>
              <p className="text-muted-foreground">
                Comparte experiencias y conecta con otros deportistas
              </p>
            </div>
            {isAuthenticated && <CreatePostDialog onPostCreated={refetch} />}
          </div>

          {/* Sport Filter */}
          <div className="flex flex-wrap gap-2">
            {SPORT_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={selectedSport === option.value ? 'default' : 'outline'}
                onClick={() => setSelectedSport(option.value as SportType | 'ALL')}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* Posts Feed */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">
                No hay publicaciones en esta categoría
              </p>
              {isAuthenticated && <CreatePostDialog onPostCreated={refetch} />}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  onComment={(postId) => setCommentingPostId(postId)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Comments Dialog */}
      <Dialog open={!!commentingPostId} onOpenChange={() => setCommentingPostId(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comentarios</DialogTitle>
          </DialogHeader>
          {commentingPostId && <CommentSection postId={commentingPostId} />}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
