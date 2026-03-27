const KEY_TOKEN = 'accessToken'

function setAccessToken(token: string) {
  localStorage.setItem(KEY_TOKEN, token)
}

function getAccessToken() {
  localStorage.getItem(KEY_TOKEN)
}

function clearAccessToken() {
  localStorage.removeItem(KEY_TOKEN)
}

export {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
}