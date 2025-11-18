import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Team } from '@/types'

interface Match {
  id: string
  round: number
  position: number
  team1?: Team
  team2?: Team
  winner?: Team
  score1?: number
  score2?: number
}

interface BracketViewProps {
  matches: Match[]
}

export function BracketView({ matches }: BracketViewProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        El bracket del torneo aún no está disponible
      </div>
    )
  }

  // Group matches by round
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = []
    }
    acc[match.round].push(match)
    return acc
  }, {} as Record<number, Match[]>)

  const rounds = Object.keys(matchesByRound).map(Number).sort((a, b) => a - b)

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max p-4">
        {rounds.map((round) => (
          <div key={round} className="space-y-4 min-w-[280px]">
            <h3 className="text-lg font-semibold text-center">
              {round === rounds.length ? 'Final' : `Ronda ${round}`}
            </h3>
            <div className="space-y-8">
              {matchesByRound[round].map((match) => (
                <Card key={match.id} className="border-2">
                  <CardContent className="p-4 space-y-2">
                    <div
                      className={`flex items-center justify-between p-3 rounded-md ${
                        match.winner?.id === match.team1?.id
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <span className="font-medium">
                        {match.team1?.name || 'TBD'}
                      </span>
                      {match.score1 !== undefined && (
                        <Badge variant="secondary">{match.score1}</Badge>
                      )}
                    </div>
                    <div className="text-center text-xs text-muted-foreground">vs</div>
                    <div
                      className={`flex items-center justify-between p-3 rounded-md ${
                        match.winner?.id === match.team2?.id
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <span className="font-medium">
                        {match.team2?.name || 'TBD'}
                      </span>
                      {match.score2 !== undefined && (
                        <Badge variant="secondary">{match.score2}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
