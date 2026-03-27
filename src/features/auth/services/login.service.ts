import { http } from '@/infra/http/http-client'
import {
  clearAccessToken,
  setAccessToken,
} from '@/features/auth/storage/token.storage'
import type { UserResponseDTO } from '@/features/auth/types/dto/authDTO'

export async function login(
  email: string,
  password: string,
): Promise<UserResponseDTO> {
  const responseData = await http.post<UserResponseDTO>('auth/login', {
    email,
    password,
  })

  setAccessToken(responseData.token)
  return responseData
}

export function logout(): void {
  clearAccessToken()
}