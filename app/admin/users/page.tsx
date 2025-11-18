'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/auth-provider'
import { useAdminUsers } from '@/hooks/use-admin-users'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, Mail, Shield } from 'lucide-react'

export default function AdminUsersPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuthContext()
  const { users, loading, updateUser } = useAdminUsers()
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/')
    }
  }, [authLoading, isAuthenticated, isAdmin, router])

  const handleToggleAdmin = async (userId: string, currentRole: string) => {
    setUpdating(userId)
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN'
    await updateUser(userId, { role: newRole })
    setUpdating(null)
  }

  if (authLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 bg-muted p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
              <p className="text-muted-foreground">
                Administra usuarios y sus roles en la plataforma
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Todos los Usuarios ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.photoUrl || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{user.name}</p>
                              {user.role === 'ADMIN' && (
                                <Badge variant="secondary" className="gap-1">
                                  <Shield className="h-3 w-3" />
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={user.role === 'ADMIN' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => handleToggleAdmin(user.id, user.role)}
                          disabled={updating === user.id}
                        >
                          {updating === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : user.role === 'ADMIN' ? (
                            'Quitar Admin'
                          ) : (
                            'Hacer Admin'
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
