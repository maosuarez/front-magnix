import { auth, isFirebaseConfigured } from './firebase'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

async function getAuthToken(): Promise<string | null> {
  if (!isFirebaseConfigured() || !auth) {
    console.log('[v0] Firebase not configured yet')
    return null
  }
  
  const user = auth.currentUser
  if (user) {
    return await user.getIdToken()
  }
  return null
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = await getAuthToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        error: errorData.message || `Error: ${response.status}`,
      }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('[API Error]', error)
    return {
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
}
