import { useState } from "react"
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

export default function FazerTeste() {
  // 3) Estado tipado: nada de {}
  const [answers, setAnswers] = useState<Answers>({})

  const handleChange = (q: QuestionId, value: number) => {
    setAnswers(prev => ({ ...prev, [q]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Respostas:", answers)
    alert("Formulário enviado! (substitua por navegação/cálculo de resultado)")
  }

  // 4) Tipar questions para casar com QuestionId
  const questions: ReadonlyArray<{ id: QuestionId; label: string }> = [
    { id: "sono", label: "Como avaliaria a QUALIDADE do seu sono nos últimos dias?" },
    { id: "carga", label: "Sua carga de estudos/trabalhos acadêmicos está alta?" },
    { id: "prazo", label: "Você sente pressão por prazos ou avaliações?" },
    { id: "preocupacao", label: "Com que frequência você se sente preocupado(a) com o desempenho?" },
    { id: "pausas", label: "Você faz pausas curtas durante o estudo?" },
    { id: "sintomas", label: "Tem percebido sinais físicos (tensão, dor de cabeça)?" },
    { id: "apoio", label: "Sente que tem apoio (amigos, família, universidade)?" },
  ] as const

  const scale = [
    { v: 1, t: "Nunca" },
    { v: 2, t: "Raramente" },
    { v: 3, t: "Às vezes" },
    { v: 4, t: "Frequente" },
    { v: 5, t: "Sempre" },
  ] as const

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
