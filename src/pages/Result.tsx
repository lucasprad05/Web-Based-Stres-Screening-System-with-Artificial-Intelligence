import { useLocation, Link } from "react-router-dom"
import "../styles/resultPage.css"

type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio"

type Answers = Partial<Record<QuestionId, number>>

export default function Result() {
  const location = useLocation()
  const state = location.state as { answers?: Answers } | null
  const answers = state?.answers

  // Exemplo simples: calcular média
  const scores = answers ? Object.values(answers) : []
  const avg = scores.length > 0
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : null

  return (
    <section className="main-hero">
      <div className="hero-divider" aria-hidden />

      <div className="hero-left">
        <h1>Resultado do seu teste</h1>
        {answers ? (
          <>
            <p className="hero-desc">Aqui estão suas respostas resumidas:</p>
            <ul>
              {Object.entries(answers).map(([q, v]) => (
                <li key={q}>{q}: {v}</li>
              ))}
            </ul>
            <p>Média: {avg?.toFixed(2)}</p>
          </>
        ) : (
          <p className="hero-desc">
            Nenhum dado recebido. Faça o <Link to="/fazer-teste">teste novamente</Link>.
          </p>
        )}
      </div>

      <div className="hero-right">
        <figure className="info-card">
          <figcaption>Próximos passos</figcaption>
          <p>
            Essa página vai exibir gráficos e recomendações personalizadas com base
            nas suas respostas.
          </p>
          <ul className="info-list">
            <li>Identificar áreas de maior estresse</li>
            <li>Sugerir técnicas de manejo</li>
            <li>Oferecer recursos de apoio</li>
          </ul>
        </figure>
      </div>
    </section>
  )
}
