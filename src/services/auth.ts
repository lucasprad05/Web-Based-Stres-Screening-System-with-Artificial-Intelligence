import { http } from "./api"
import { setToken, getToken, clearToken } from "../utils/storage"

type TokenRes = { access_token: string; token_type: "bearer" }
export type UserRes = { id: string; name: string; email: string; disabled: boolean; scopes: string[] }

export async function register(payload: { name: string; email: string; password: string }) {
  return http<UserRes>("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function login(email: string, password: string, scopes: string[] = ["read"]) {
  const body = new URLSearchParams()
  body.set("username", email)
  body.set("password", password)
  if (scopes.length) body.set("scope", scopes.join(" "))

  const data = await http<TokenRes>("/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  setToken(data.access_token)
  return data
}

export async function me() {
  const atk = getToken()
  if (!atk) throw new Error("Sem token")
  return http<UserRes>("/users/me", {
    headers: { Authorization: `Bearer ${atk}` },
  })
}

export function logout() {
  clearToken()
}
