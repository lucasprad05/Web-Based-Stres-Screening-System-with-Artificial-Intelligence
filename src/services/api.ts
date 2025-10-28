// Define a constante BASE, que representa a URL base da API.
// Ela é obtida da variável de ambiente VITE_API_URL (definida, por exemplo, no arquivo .env).
// Caso a variável não exista, usa "http://localhost:8000" como valor padrão.
const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

// Função genérica para fazer requisições HTTP.
// <T> indica que a função é genérica: ela pode retornar dados de qualquer tipo definido pelo chamador.
export async function http<T>(path: string, init?: RequestInit): Promise<T> {

  // Faz a requisição usando o método fetch.
  // Concatena a URL base com o "path" passado por parâmetro (ex: "/users", "/login").
  // O parâmetro "init" permite configurar opções da requisição (método, headers, body, etc.).
  const res = await fetch(`${BASE}${path}`, init)

  // Verifica se a resposta não foi bem-sucedida (status fora da faixa 200–299).
  if (!res.ok) {
    // Tenta ler o corpo da resposta como texto (para exibir mensagem de erro mais detalhada).
    const txt = await res.text().catch(() => "")
    // Lança um erro com a mensagem retornada pela API (se houver) ou com o código HTTP.
    throw new Error(txt || `HTTP ${res.status}`)
  }

  // Se o status for 204 (No Content), retorna `undefined` explicitamente.
  // Isso evita tentar fazer o parse de uma resposta vazia como JSON.
  if (res.status === 204) return undefined as T

  // Caso contrário, converte o corpo da resposta para JSON e o retorna como o tipo genérico T.
  return res.json() as Promise<T>
}
