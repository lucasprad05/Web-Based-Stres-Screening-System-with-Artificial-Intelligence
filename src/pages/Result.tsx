import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/resultPage.css";

type QuestionId =
  | "sono"
  | "carga"
  | "prazo"
  | "preocupacao"
  | "pausas"
  | "sintomas"
  | "apoio";

type Answers = Partial<Record<QuestionId, number>>;
type StressLevel = "baixo" | "moderado" | "alto";

const LABELS: Record<QuestionId, string> = {
  sono: "Sono",
  carga: "Carga",
  prazo: "Prazos",
  preocupacao: "Preocupação",
  pausas: "Pausas",
  sintomas: "Sintomas físicos",
  apoio: "Apoio",
};

function mapToStress(_q: QuestionId, v: number) {
  // 1 = Nunca (0%), 5 = Sempre (100%)
  return Math.round((v - 1) * 25);
}

function compute(answers: Answers) {
  const entries = Object.entries(answers) as [QuestionId, number][];
  if (!entries.length) return null;

  const dims = entries.map(([q, v]) => {
    const score = mapToStress(q, v);
    return { id: q, score, raw: v };
  });

  const percent = Math.round(
    dims.reduce((a, b) => a + b.score, 0) / dims.length
  );
  let level: StressLevel = "baixo";
  if (percent >= 35 && percent < 65) level = "moderado";
  if (percent >= 65) level = "alto";
  return { percent, level, dims };
}

function tips(level: StressLevel) {
  if (level === "alto") {
    return [
      {
        tag: "Priorize",
        text: "Bloqueie 25–50 min de foco com 5 min de pausa.",
      },
      { tag: "Sono", text: "Durma 7–9h; evite tela 1h antes de dormir." },
      {
        tag: "Apoio",
        text: "Converse com tutores/coordenação e combine prazos.",
      },
    ];
  }
  if (level === "moderado") {
    return [
      { tag: "Ritmo", text: "Pomodoro leve (40/10) 2–3 ciclos por sessão." },
      { tag: "Organize", text: "2 tarefas essenciais/dia + uma ‘bônus’." },
      { tag: "Corpo", text: "Alongue-se a cada 90 min." },
    ];
  }
  return [
    { tag: "Mantenha", text: "Continue com pausas curtas e rotina de sono." },
    { tag: "Revisão", text: "Reveja metas semanais na sexta." },
    { tag: "Reserve", text: "Bloco de lazer focado, sem culpa." },
  ];
}

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers: Answers | undefined = state?.answers;

  if (!answers || Object.keys(answers).length === 0) {
    return (
      <section className="main-hero">
        <div className="hero-left">
          <h1>Resultado do seu teste</h1>
          <p className="hero-desc">
            Nenhum dado recebido. Faça o{" "}
            <Link to="/testPage">teste novamente</Link>.
          </p>
        </div>
      </section>
    );
  }

  const result = compute(answers)!;
  const { percent, level, dims } = result;

  return (
    <section className="result-shell">
      <header className="result-top">
        <div className="result-header">
          <h1>Seu panorama de estresse</h1>
          <span className={`badge-level ${level}`}>{level.toUpperCase()}</span>
        </div>

        <div className="actions-row">
          <button className="cta-secondary" onClick={() => window.print()}>
            Salvar em PDF
          </button>
          <button className="cta-ghost" onClick={() => navigate("/testPage")}>
            Refazer teste
          </button>
        </div>
      </header>

      <div className="result-grid">
        <div className="left-col">
          <div className="score-hero">
            <div className="ring">
              <div
                className="ring-fill"
                style={{ ["--p" as any]: `${percent}` }}
              />
              <div className="ring-center">
                <div className="score">{percent}</div>
                <div className="score-sub">/100</div>
              </div>
            </div>

            <div className="score-copy">
              <h2>Índice estimado</h2>
              <p>
                <strong className={`txt-${level}`}>{level}</strong> — quanto
                maior, maior o estresse.
              </p>
              <div className="legend">
                <span className="pill sm low">0–34 Baixo</span>
                <span className="pill sm mid">35–64 Moderado</span>
                <span className="pill sm high">65–100 Alto</span>
              </div>
            </div>
          </div>

          <div className="result-summary">
            <div className="kpi-card">
              <p className="kpi-label">Perguntas respondidas</p>
              <p className="kpi-value">{dims.length}</p>
              <p className="kpi-foot">de {Object.keys(LABELS).length}</p>
            </div>
            <div className="kpi-card">
              <p className="kpi-label">Dimensão mais sensível</p>
              <p className="kpi-value">
                {dims
                  .slice()
                  .sort((a, b) => b.score - a.score)
                  .at(0)
                  ?.id.toUpperCase()}
              </p>
              <p className="kpi-foot">quanto maior, mais estresse</p>
            </div>
            <div className="kpi-card">
              <p className="kpi-label">Sono & Pausas</p>
              <p className="kpi-value">
                {Math.round(
                  dims
                    .filter((d) => d.id === "sono" || d.id === "pausas")
                    .reduce((a, b) => a + b.score, 0) / 2 || 0
                )}
              </p>
              <p className="kpi-foot">média dessas dimensões</p>
            </div>
          </div>

          <div className="chart-block">
            <div className="chart-header">
              <h2>Que áreas mais pesam?</h2>
              <span className="chart-sub">
                0–100 (mais alto = mais estresse)
              </span>
            </div>

            <div className="chart-bars">
              {dims
                .slice()
                .sort((a, b) => b.score - a.score)
                .map(({ id, score }) => (
                  <div className="hbar" key={id}>
                    <div className="hbar-label">{LABELS[id]}</div>
                    <div className="hbar-track">
                      <div
                        className={`hbar-fill lvl-${
                          score >= 65 ? "high" : score >= 35 ? "mid" : "low"
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <div className="hbar-value">{score}%</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <aside className="right-col">
          <div className="card-slab">
            <div className="result-header">
              <h2>Recomendações</h2>
              <span className={`badge-level ${level}`}>
                {level.toUpperCase()}
              </span>
            </div>

            <ul className="action-list">
              {tips(level).map((t, idx) => (
                <li key={idx}>
                  <div className="action-head">
                    <span
                      className={`badge-tip ${level === "alto" ? "warn" : ""}`}
                    >
                      {t.tag}
                    </span>
                    <div className="dim-label">{t.text}</div>
                  </div>
                  <div className="action-cta">
                    <Link className="mini-btn" to="/testPage">
                      Refazer foco
                    </Link>
                    <button
                      className="mini-btn ghost"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Revisar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <hr className="divider" />
            <p className="footnote">
              O StressAI não substitui avaliação clínica. Procure apoio
              profissional se os sintomas persistirem.
            </p>
          </div>

          <div className="card-slab">
            <h2>Detalhe por dimensão</h2>
            <ul className="dimension-breakdown">
              {dims.map((d) => (
                <li key={d.id}>
                  <span className="pill">{LABELS[d.id]}</span>
                  <span className="dim-label">{d.score}%</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
