import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/testPage.css"

// 1) IDs válidos das perguntas
type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio"

// 2) Mapa de respostas: cada chave pode ter um número (1..5)
type Answers = Partial<Record<QuestionId, number>>

export default function TestPage() {
  const navigate = useNavigate()
  // 3) Estado tipado: nada de {}
  const [answers, setAnswers] = useState<Answers>({})

  const handleChange = (q: QuestionId, value: number) => {
    setAnswers(prev => ({ ...prev, [q]: value }))
  }

  // Lista completa das 7 perguntas (todas com direção "quanto mais, pior")
const questions: ReadonlyArray<{ id: QuestionId; label: string }> = [
  { id: "sono",         label: "Tem dificuldade para iniciar ou manter o sono?" },
  { id: "carga",        label: "Sente que sua carga acadêmica está excessiva?" },
  { id: "prazo",        label: "Sente pressão constante por prazos e avaliações?" },
  { id: "preocupacao",  label: "Fica preocupado(a) com desempenho/erros ao longo do dia?" },
  { id: "pausas",       label: "Costuma pular/ignorar pausas durante o estudo?" },
  { id: "sintomas",     label: "Percebe sinais físicos de tensão (dor de cabeça, corpo rígido)?" },
  { id: "apoio",        label: "Sente que não tem apoio suficiente (amigos, família, universidade)?" },
] as const

// Escala permanece coerente com frequência
const scale = [
  { v: 1, t: "Nunca" },
  { v: 2, t: "Raramente" },
  { v: 3, t: "Às vezes" },
  { v: 4, t: "Frequente" },
  { v: 5, t: "Sempre" },
] as const

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 1. Verificar se todas as perguntas foram respondidas
    const questionIds = questions.map(q => q.id)
    const allAnswered = questionIds.every(id => answers[id] !== undefined)

    if (!allAnswered) {
      // Exibe um aviso no console caso alguma pergunta não tenha sido respondida
      console.error("Por favor, responda a todas as perguntas antes de continuar.")
      return
    }

    // 2. Calcular a pontuação total
    let totalScore = 0
    for (const id in answers) {
      totalScore += answers[id as QuestionId]!
    }

    // 3. Salvar a pontuação no localStorage ANTES de navegar
    localStorage.setItem("stressScore", totalScore.toString())

    // 4. Navegar para a página de resultados
    navigate("/result")
  }

  return (
    <section className="main-hero">
      <div className="hero-divider" aria-hidden />

      <div className="hero-left">
        <h1>Responda e veja seu panorama de estresse</h1>
        <p className="hero-desc">
          Leva menos de 2 minutos. Marque o que mais se aproxima da sua realidade.
        </p>

        <form className="test-form" onSubmit={handleSubmit}>
          {questions.map(q => (
            <fieldset className="question" key={q.id}>
              <legend>{q.label}</legend>

              <div className="scale-group" role="radiogroup" aria-label={q.label}>
                {scale.map((s, idx) => (
                  <label key={s.v} className="scale-option">
                    <input
                      type="radio"
                      name={q.id}
                      value={s.v}
                      checked={answers[q.id] === s.v}
                      onChange={(e) => handleChange(q.id, Number(e.currentTarget.value))}
                      required={idx === 0 && answers[q.id] == null}
                    />
                    <span className="scale-dot" aria-hidden />
                    <span className="scale-text">{s.t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <button type="submit" className="cta-button">Ver meu resultado</button>

          <p className="hero-footnote">
            Suas respostas não identificam você. São usadas apenas para estimar seu nível de estresse.
          </p>
        </form>
      </div>

      <div className="hero-right">
        <figure className="info-card">
          <figcaption>Como funciona</figcaption>
          <p>
            O StudStress AI calcula um <strong>índice estimado</strong> a partir de suas respostas.
            Ele não substitui aconselhamento profissional, mas pode indicar <em>tendências</em> e sugerir
            próximos passos práticos.
          </p>
          <ul className="info-list">
            <li>Marque a opção que mais te representa hoje.</li>
            <li>Não existe resposta certa ou errada.</li>
            <li>Você poderá ver dicas ao final.</li>
          </ul>
        </figure>

        <p className="photo-caption">
          “Responder com sinceridade ajuda a gerar recomendações úteis.”
        </p>
      </div>
    </section>
  )
}
