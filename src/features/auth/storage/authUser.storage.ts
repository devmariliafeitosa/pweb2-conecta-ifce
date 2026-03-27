import type { AuthUser } from '@/features/auth/types/dto/AuthDTO'

const KEY_AUTH_USER = 'auth_user'

function setStoredUser(user: AuthUser) {
  localStorage.setItem(KEY_AUTH_USER, JSON.stringify(user))
}

function getStoredUser() {
  const raw = localStorage.getItem(KEY_AUTH_USER)
  if (!raw) return null
  return JSON.parse(raw) as AuthUser
}

function clearStoredUser() {
  localStorage.removeItem(KEY_AUTH_USER)
}

export { setStoredUser, getStoredUser, clearStoredUser }