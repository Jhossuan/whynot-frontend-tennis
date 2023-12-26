export type TournamentStatusT = 'CANCELED' | 'PENDING' | 'FINISHED' | 'OPEN' | 'CLOSED' | 'POSTPONED'

export default interface TournamentI {
    tournament?: string
    tid?: string
    title: string
    description: string
    eventDate: Date
    location: string
    price: string
    minParticipants: number
    maxParticipants: number
    reward: string
    created_at?: Date
    imageUrl?: string
    status: TournamentStatusT
    uid?: string
}