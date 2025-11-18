export interface Tournament {
  id: string
  name: string
  sport: SportType
  startDate: string
  endDate: string
  maxTeams: number
  currentTeams: number
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED'
  description?: string
  imageUrl?: string
}

export interface Team {
  id: string
  name: string
  tournamentId: string
  captainId: string
  members: string[]
  wins: number
  losses: number
}

export interface Reservation {
  id: string
  userId: string
  spaceId: string
  date: string
  startTime: string
  endTime: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  sport: SportType
}

export interface Space {
  id: string
  name: string
  sport: SportType
  capacity: number
  pricePerHour: number
  available: boolean
  imageUrl?: string
}

export interface CommunityPost {
  id: string
  userId: string
  userName: string
  userPhotoUrl?: string
  sport: SportType
  content: string
  imageUrl?: string
  likes: number
  commentsCount: number
  createdAt: string
  liked?: boolean
}

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userPhotoUrl?: string
  content: string
  createdAt: string
}

export type SportType = 'FOOTBALL' | 'TENNIS' | 'BASKETBALL' | 'VOLLEYBALL'

export interface UserStatistics {
  totalReservations: number
  activeTournaments: number
  postsCreated: number
  teamsJoined: number
}
