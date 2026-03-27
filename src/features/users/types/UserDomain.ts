export type Role = 'ALUNO' | 'PROFESSOR' | 'TECNICO'

export type UserDomain = {
  id: string,
  firstName: string
  lastName: string
  name: string
  bio: string,
  avatarURL?: string
  handle: string
  email: string
  role: Role
  campus: {
      id: string,
      name: string
    }
  course?: string | undefined
  stats: {
    followersCount: number
    followingCounts: number
    postsCount: number
  }
  isFollwing: boolean

}