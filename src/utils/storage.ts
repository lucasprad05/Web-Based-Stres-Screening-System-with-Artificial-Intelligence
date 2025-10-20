let mem: string | null = null

export function setToken(t: string) {
  mem = t
  localStorage.setItem("atk", t)
}

export function getToken() {
  return mem ?? localStorage.getItem("atk")
}

export function clearToken() {
  mem = null
  localStorage.removeItem("atk")
}
