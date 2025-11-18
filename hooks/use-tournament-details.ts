'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api-client'
import type { Tournament, Team } from '@/types'

interface TournamentMatch {
  id: string
  round: number
  position: number
  team1?: Team
  team2?: Team
  winner?: Team
  score1?: number
  score2?: number
}

interface TournamentDetails extends Tournament {
  teams: Team[]
  matches: TournamentMatch[]
}

export function useTournamentDetails(tournamentId: string) {
  const [tournament, setTournament] = useState<TournamentDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTournament = async () => {
    console.log('[v0] Fetching tournament details:', tournamentId)
    const response = await api.get<TournamentDetails>(`/tournaments/${tournamentId}`)
    
    if (response.data) {
      setTournament(response.data)
    } else {
      setError(response.error || 'Error al cargar torneo')
    }
    
    setLoading(false)
  }

  useEffect(() => {
    if (tournamentId) {
      fetchTournament()
    }
  }, [tournamentId])

  const registerForTournament = async () => {
    const response = await api.post(`/tournaments/${tournamentId}/register`)
    
    if (response.data) {
      await fetchTournament()
      return { success: true }
    }
    
    return { success: false, error: response.error }
  }

  return { tournament, loading, error, registerForTournament, refetch: fetchTournament }
}
