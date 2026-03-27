type Role = 'ALUNO' | 'PROFESSOR' | 'TECNICO'

export type UserRequestDTO = {
  firstName: string
  lastName: string
  handle: string
  email: string
  role: Role
  campus: string
  password: string
  course?: string | undefined
}

export type AuthUser = {
  id: string,
  firstName: string
  lastName: string
  handle: string
  name: string
  avatarURL?: string
  email: string
  role: Role
  campus: {
    id: string
    name: string
  }
  course?: string | undefined
}


export type UserResponseDTO = {
  token: string,
  user: AuthUser
}