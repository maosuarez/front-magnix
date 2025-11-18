'use client'

import { useEffect, useState } from 'react'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User 
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/lib/firebase'
import { api } from '@/lib/api-client'

export interface UserProfile {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  photoUrl?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      console.log('[v0] Firebase not configured, skipping auth setup')
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('[v0] Auth state changed:', firebaseUser?.email)
      setUser(firebaseUser)
      
      if (firebaseUser) {
        // Fetch user profile from backend
        const response = await api.get<UserProfile>('/users/profile')
        if (response.data) {
          setProfile(response.data)
        }
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isFirebaseConfigured() || !auth) {
      return { 
        success: false, 
        error: 'Firebase not configured. Please add environment variables.' 
      }
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error('[v0] Sign in error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      }
    }
  }

  const signOut = async () => {
    if (!isFirebaseConfigured() || !auth) {
      return { success: true }
    }

    try {
      await firebaseSignOut(auth)
      setProfile(null)
      return { success: true }
    } catch (error) {
      console.error('[v0] Sign out error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign out failed' 
      }
    }
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'ADMIN',
  }
}
