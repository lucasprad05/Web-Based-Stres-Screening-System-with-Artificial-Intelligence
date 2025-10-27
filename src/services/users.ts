const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

function authHeaders(): Record<string, string> {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("atk") ||
    localStorage.getItem("token")
  const h: Record<string, string> = {}
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

export type UserMe = {
  id: string
  name: string
  email: string
  disabled: boolean
  scopes: string[]
}

// Função de exclusão de usuário
export async function deleteUser(): Promise<void> {
    const headers = authHeaders()
    if (!headers.Authorization) throw new Error('Não autenticado')

    const response = await fetch(`${API_BASE}/users/me`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    })

    if (response.status === 204) {
        // HTTP 204 No Content indica sucesso
        return
    }

    // Trata erros 400, 404, 401, etc.
    const errorData = await response.json()
    throw new Error(errorData.detail || `Falha ao excluir conta. Status: ${response.status}`)
}

export async function getMe(): Promise<UserMe> {
  const res = await fetch(`${API_BASE}/users/me`, { headers: authHeaders() })
  if (!res.ok) throw new Error("Falha ao obter usuário")
  return res.json()
}

export async function updateEmail(email: string, currentPassword: string): Promise<UserMe> {
  const res = await fetch(`${API_BASE}/users/me/email`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ email, current_password: currentPassword }),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(msg || "Falha ao atualizar e-mail")
  }
  return res.json()
}

export async function updatePassword(currentPassword: string, newPassword: string): Promise<void> {
  const res = await fetch(`${API_BASE}/users/me/password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(msg || "Falha ao atualizar senha")
  }
}
