// Importa a função http genérica definida anteriormente (responsável por fazer as requisições HTTP)
import { http } from "./api"

// Importa utilitários de armazenamento local (provavelmente usam localStorage)
// - setToken: salva o token
// - getToken: recupera o token
// - clearToken: apaga o token
import { setToken, getToken, clearToken } from "../utils/storage"

// Define o formato da resposta de autenticação (token JWT ou similar).
// É o tipo retornado pela API após login bem-sucedido.
type TokenRes = {
  access_token: string  // token JWT
  token_type: "bearer"  // tipo do token (sempre "bearer")
}

// Define o formato de um usuário retornado pela API.
export type UserRes = {
  id: string            // identificador único do usuário
  name: string          // nome completo
  email: string         // e-mail cadastrado
  disabled: boolean     // indica se o usuário está desativado
  scopes: string[]      // lista de permissões associadas ao usuário
}

// Função para registrar (criar) um novo usuário no sistema.
export async function register(payload: { name: string; email: string; password: string }) {
  return http<UserRes>("/auth/register", {           // endpoint: /auth/register
    method: "POST",                                  // método POST (envio de dados)
    headers: { "Content-Type": "application/json" }, // conteúdo em JSON
    body: JSON.stringify(payload),                   // converte o objeto JS em string JSON
  })
}

// Função de login.
// Recebe email, senha e, opcionalmente, uma lista de escopos (permissões desejadas).
export async function login(email: string, password: string, scopes: string[] = ["read"]) {
  // Monta o corpo da requisição no formato x-www-form-urlencoded (usado em OAuth2).
  const body = new URLSearchParams()
  body.set("username", email)
  body.set("password", password)
  if (scopes.length) body.set("scope", scopes.join(" "))  // junta os escopos separados por espaço

  // Faz a requisição POST para /auth/token e espera receber o token JWT.
  const data = await http<TokenRes>("/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  // Salva o token recebido no armazenamento local.
  setToken(data.access_token)

  // Retorna o token e o tipo.
  return data
}

// Função que busca os dados do usuário atualmente logado.
export async function me() {
  // Tenta obter o token salvo.
  const atk = getToken()
  if (!atk) throw new Error("Sem token")  // se não existir, lança erro

  // Faz uma requisição autenticada para o endpoint /users/me.
  // O backend usa o token Bearer para identificar o usuário.
  return http<UserRes>("/users/me", {
    headers: { Authorization: `Bearer ${atk}` },
  })
}

// Função de logout.
// Apenas limpa o token salvo localmente, "deslogando" o usuário.
export function logout() {
  clearToken()
}
