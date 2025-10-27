// Define a URL base da API, pegando da variável de ambiente do Vite.
// Se não houver, usa "http://localhost:8000" como fallback.
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

// Função auxiliar para montar os cabeçalhos de autenticação (Authorization).
function authHeaders(): Record<string, string> {
  // Tenta obter o token salvo no navegador (em localStorage).
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("atk") ||
    localStorage.getItem("token")

  // Cria um objeto de headers vazio.
  const h: Record<string, string> = {}

  // Se houver token, adiciona o cabeçalho Authorization com o formato "Bearer <token>".
  if (token) h.Authorization = `Bearer ${token}`

  // Retorna o conjunto de headers (vazio se não autenticado).
  return h
}

// Define o tipo do objeto retornado pela API quando se busca o usuário logado.
export type UserMe = {
  id: string        // ID único do usuário
  name: string      // nome completo
  email: string     // endereço de e-mail
  disabled: boolean // indica se a conta está desativada
  scopes: string[]  // permissões associadas ao usuário
}

// Função de exclusão de usuário autenticado
export async function deleteUser(): Promise<void> {
  // Obtém os headers com o token.
  const headers = authHeaders()

  // Se não houver token, lança erro de autenticação.
  if (!headers.Authorization) throw new Error('Não autenticado')

  // Faz requisição DELETE para /users/me.
  const response = await fetch(`${API_BASE}/users/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  // Caso a API retorne 204 No Content, a exclusão foi bem-sucedida.
  if (response.status === 204) {
    return
  }

  // Caso contrário, tenta obter o corpo do erro para detalhar a falha.
  const errorData = await response.json()
  throw new Error(errorData.detail || `Falha ao excluir conta. Status: ${response.status}`)
}

// Função para buscar dados do usuário autenticado
export async function getMe(): Promise<UserMe> {
  // Faz requisição GET para /users/me, com header Authorization.
  const res = await fetch(`${API_BASE}/users/me`, { headers: authHeaders() })

  // Lança erro se a resposta não for bem-sucedida.
  if (!res.ok) throw new Error("Falha ao obter usuário")

  // Retorna os dados do usuário convertidos em JSON.
  return res.json()
}

// Função para atualizar o e-mail do usuário
export async function updateEmail(email: string, currentPassword: string): Promise<UserMe> {
  // Faz requisição PUT para /users/me/email.
  const res = await fetch(`${API_BASE}/users/me/email`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    // O backend exige a senha atual como confirmação de segurança.
    body: JSON.stringify({ email, current_password: currentPassword }),
  })

  // Se falhar, tenta ler o texto da resposta e lança erro.
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(msg || "Falha ao atualizar e-mail")
  }

  // Retorna os dados atualizados do usuário.
  return res.json()
}

// Função para atualizar a senha do usuário
export async function updatePassword(currentPassword: string, newPassword: string): Promise<void> {
  // Faz requisição PUT para /users/me/password.
  const res = await fetch(`${API_BASE}/users/me/password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    // Envia senha atual e nova senha no corpo.
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  })

  // Se a requisição falhar, tenta extrair mensagem de erro para feedback.
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(msg || "Falha ao atualizar senha")
  }
}
