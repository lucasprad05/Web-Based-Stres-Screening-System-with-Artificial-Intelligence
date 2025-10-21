export type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio"

export type Answers = Partial<Record<QuestionId, number>>

export type AssessmentOut = {
  id: string
  created_at: string
  percent: number
  level: "baixo" | "moderado" | "alto"
  dims: { id: QuestionId; score: number; raw: number }[]
}

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

export async function saveAssessment(answers: Answers): Promise<AssessmentOut> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  }

  const res = await fetch(`${API_BASE}/assessments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) throw new Error(`Erro ao salvar assessment (${res.status})`)
  return res.json()
}

export async function listMyAssessments(): Promise<AssessmentOut[]> {
  const res = await fetch(`${API_BASE}/assessments/me`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Erro ao buscar histórico (${res.status})`)
  return res.json()
}
