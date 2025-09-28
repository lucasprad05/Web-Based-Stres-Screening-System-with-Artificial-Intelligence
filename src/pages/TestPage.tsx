import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/testPage.css"

export default function FazerTeste() {
  const [answers, setAnswers] = useState({})

  const handleChange = (q, value) => {
    setAnswers(prev => ({ ...prev, [q]: Number(value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode calcular o score e navegar para uma rota de resultado
    // Ex.: navigate("/resultado", { state: { answers } })
    console.log("Respostas:", answers)
    alert("Formulário enviado! (substitua por navegação/cálculo de resultado)")
  }

  // Lista de perguntas para facilitar manutenção
  const questions = [
    { id: "sono", label: "Como avaliaria a QUALIDADE do seu sono nos últimos dias?" },
    { id: "carga", label: "Sua carga de estudos/trabalhos acadêmicos está alta?" },
    { id: "prazo", label: "Você sente pressão por prazos ou avaliações?" },
    { id: "preocupacao", label: "Com que frequência você se sente preocupado(a) com o desempenho?" },
    { id: "pausas", label: "Você faz pausas curtas durante o estudo?" },
    { id: "sintomas", label: "Tem percebido sinais físicos (tensão, dor de cabeça)?" },
    { id: "apoio", label: "Sente que tem apoio (amigos, família, universidade)?" },
  ]

  const scale = [
    { v: 1, t: "Nunca" },
    { v: 2, t: "Raramente" },
    { v: 3, t: "Às vezes" },
    { v: 4, t: "Frequente" },
    { v: 5, t: "Sempre" },
  ]

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
                {scale.map(s => (
                  <label key={s.v} className="scale-option">
                    <input
                      type="radio"
                      name={q.id}
                      value={s.v}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required={!answers[q.id]}
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
