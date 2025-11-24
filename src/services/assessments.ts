// Define um tipo union (união de literais) com os possíveis IDs das perguntas.
// Cada string representa uma dimensão ou categoria da avaliação.
export type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio"

// Define o tipo das respostas.
// Usa `Record<QuestionId, number>` para mapear cada ID de pergunta para um número (pontuação).
// O `Partial<>` indica que nem todas as perguntas precisam estar respondidas (todas são opcionais).
export type Answers = Partial<Record<QuestionId, number>>

// Define o formato de uma recomendação retornada pela API.
export type Recommendation = {
  tag: string     // rótulo ou identificador curto da recomendação
  text: string    // texto descritivo da recomendação
}

// Define o formato da resposta de uma avaliação vinda da API.
export type AssessmentOut = {
  id: string                        // identificador único da avaliação
  created_at: string                // data/hora de criação (provavelmente ISO)
  percent: number                   // porcentagem geral de pontuação
  level: "baixo" | "moderado" | "alto" // nível de risco ou intensidade
  dims: {                           // dimensões individuais avaliadas
    id: QuestionId                  // qual dimensão (ex: sono, carga)
    score: number                   // pontuação processada (normalizada)
    raw: number                     // valor bruto da resposta
  }[]
  recommendations?: Recommendation[] // recomendações associadas (opcional)
}

// Define a URL base da API, obtida de uma variável de ambiente do Vite.
// Se não houver valor configurado, usa "http://localhost:8000" como fallback.
const API_BASE = import.meta.env.VITE_API_URL ?? "https://backend-n7az.onrender.com"

// Função auxiliar para montar os headers de autenticação.
// Busca um token salvo no localStorage (pode ter chaves diferentes conforme o backend).
function authHeaders(): Record<string, string> {
  const token =
    localStorage.getItem("access_token") || // token padrão
    localStorage.getItem("atk") ||          // variação possível
    localStorage.getItem("token")           // outro nome possível

  const h: Record<string, string> = {}
  if (token) h.Authorization = `Bearer ${token}` // adiciona header Authorization se existir token
  return h
}

// Função para enviar as respostas (assessment) ao backend.
export async function saveAssessment(answers: Answers) {
  const res = await fetch(`${API_BASE}/assessments`, {
    method: "POST",                             // método HTTP POST
    headers: { 
      "Content-Type": "application/json",       // indica envio de JSON
      ...authHeaders()                          // adiciona headers de autenticação, se houver
    },
    body: JSON.stringify({ answers }),          // converte objeto com respostas para JSON
  });

  // Se a resposta não for bem-sucedida, lança um erro genérico.
  if (!res.ok) throw new Error("Erro ao salvar avaliação");

  // Converte e retorna a resposta da API (espera-se que contenha o objeto AssessmentOut).
  return await res.json(); 
}

// Função para buscar o histórico de avaliações do usuário autenticado.
export async function listMyAssessments(): Promise<AssessmentOut[]> {
  const res = await fetch(`${API_BASE}/assessments/me`, {
    headers: authHeaders(),                    // inclui token, se existir
  })

  // Lança erro se a resposta falhar (exibe status HTTP para debug).
  if (!res.ok) throw new Error(`Erro ao buscar histórico (${res.status})`)

  // Retorna o corpo da resposta convertido em JSON (lista de avaliações).
  return res.json()
}
