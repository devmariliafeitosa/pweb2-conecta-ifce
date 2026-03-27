

export type UserRequestDTO = {
  firstName: string
  lastName: string
  handle: string
  email: string
  campus: string
  password: string
  course?: string | undefined
}

export type AuthUser = {
  id: string,
  firstName: string
  lastName: string
  name: string
  avatarURL?: string
  email: string
}


export type UserResponseDTO = {
  token: string,
  user: AuthUser
}