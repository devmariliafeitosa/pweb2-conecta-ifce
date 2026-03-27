import type { UserProfileDTO } from '@/features/users/types/dto/UserProfileDTO'
import { http } from '@/infra/http/http-client'

export async function getProfile(): Promise<UserProfileDTO> {
  const responseData = await http.get<UserProfileDTO>('me')
  return responseData
}