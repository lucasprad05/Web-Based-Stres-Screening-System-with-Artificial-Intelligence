// Importa hooks do React e funções do React Router
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Função para salvar avaliação no backend
import { saveAssessment } from "../services/assessments";
import type { AssessmentOut } from "../services/assessments";

// Importa estilos da página
import "../styles/resultPage.css";

// Tipos das perguntas e respostas
type QuestionId = "sono" | "carga" | "prazo" | "preocupacao" | "pausas" | "sintomas" | "apoio";
type Answers = Partial<Record<QuestionId, number>>;
type StressLevel = "baixo" | "moderado" | "alto";

// Labels para exibir nomes das dimensões
const LABELS: Record<QuestionId, string> = {
  sono: "Sono",
  carga: "Carga",
  prazo: "Prazos",
  preocupacao: "Preocupação",
  pausas: "Pausas",
  sintomas: "Sintomas físicos",
  apoio: "Apoio",
};

// Converte resposta de 1..5 para percentual de estresse (0..100)
function mapToStress(_q: QuestionId, v: number) {
  return Math.round((v - 1) * 25);
}

// Calcula percentuais, nível de estresse e dimensões individuais
function compute(answers: Answers) {
  const entries = Object.entries(answers) as [QuestionId, number][];
  if (!entries.length) return null;

  const dims = entries.map(([q, v]) => {
    const score = mapToStress(q, v);
    return { id: q, score, raw: v };
  });

  const percent = Math.round(dims.reduce((a, b) => a + b.score, 0) / dims.length);

  let level: StressLevel = "baixo";
  if (percent >= 35 && percent < 65) level = "moderado";
  if (percent >= 65) level = "alto";

  return { percent, level, dims };
}

// Componente principal da página de resultados
export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Recebe respostas passadas via navegação do teste
  const answers: Answers | undefined = state?.answers;

  // Estado para guardar resultado retornado do backend
  const [backendResult, setBackendResult] = useState<AssessmentOut | null>(null);
  const [saving, setSaving] = useState(false);

  // Flags para controlar salvamento e evitar múltiplos requests
  const savedOnce = useRef(false);
  const inFlight = useRef(false);

  // Salva avaliação no backend assim que o componente monta e há respostas
  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) return;
    if (savedOnce.current || inFlight.current) return;

    savedOnce.current = true;
    inFlight.current = true;

    const run = async () => {
      try {
        setSaving(true);
        const res = await saveAssessment(answers);
        setBackendResult(res);
      } catch (err) {
        console.error("Erro ao salvar avaliação:", err);
        savedOnce.current = false;
      } finally {
        inFlight.current = false;
        setSaving(false);
      }
    };

    run();
  }, [answers]);

  // Caso não haja respostas, exibe mensagem e link para refazer teste
  if (!answers || Object.keys(answers).length === 0) {
    return (
      <section className="main-hero">
        <div className="hero-left">
          <h1>Resultado do seu teste</h1>
          <p className="hero-desc">
            Nenhum dado recebido. Faça o <Link to="/testPage">teste novamente</Link>.
          </p>
        </div>
      </section>
    );
  }

  // Computa resultado local caso backend ainda não tenha retornado
  const computed = compute(answers)!;
  const percent = backendResult?.percent ?? computed.percent;
  const level = backendResult?.level ?? computed.level;
  const dims = backendResult?.dims ?? computed.dims;
  const recs = backendResult?.recommendations;

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
          {/* Exibe índice estimado em um gráfico circular */}
          <div className="score-hero">
            <div className="ring">
              <div className="ring-fill" style={{ ["--p" as any]: `${percent}` }} />
              <div className="ring-center">
                <div className="score">{percent}</div>
                <div className="score-sub">/100</div>
              </div>
            </div>

            <div className="score-copy">
              <h2>Índice estimado</h2>
              <p>
                <strong className={`txt-${level}`}>{level}</strong> — quanto maior, maior o estresse.
              </p>
              <div className="legend">
                <span className="pill sm low">0–34 Baixo</span>
                <span className="pill sm mid">35–64 Moderado</span>
                <span className="pill sm high">65–100 Alto</span>
              </div>
            </div>
          </div>

          {/* KPIs resumidos */}
          <div className="result-summary">
            <div className="kpi-card">
              <p className="kpi-label">Perguntas respondidas</p>
              <p className="kpi-value">{dims.length}</p>
              <p className="kpi-foot">de {Object.keys(LABELS).length}</p>
            </div>
            <div className="kpi-card">
              <p className="kpi-label">Dimensão mais sensível</p>
              <p className="kpi-value">
                {dims.slice().sort((a, b) => b.score - a.score).at(0)?.id.toUpperCase()}
              </p>
              <p className="kpi-foot">quanto maior, mais estresse</p>
            </div>
            <div className="kpi-card">
              <p className="kpi-label">Sono & Pausas</p>
              <p className="kpi-value">
                {Math.round(
                  (dims.filter((d) => d.id === "sono" || d.id === "pausas").reduce((a, b) => a + b.score, 0) / 2) || 0
                )}
              </p>
              <p className="kpi-foot">média dessas dimensões</p>
            </div>
          </div>

          {/* Barras de dimensões */}
          <div className="chart-block">
            <div className="chart-header">
              <h2>Que áreas mais pesam?</h2>
              <span className="chart-sub">0–100 (mais alto = mais estresse)</span>
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
                        className={`hbar-fill lvl-${score >= 65 ? "high" : score >= 35 ? "mid" : "low"}`}
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
          {/* Recomendações do teste */}
          <div className="card-slab">
            <div className="result-header">
              <h2>Recomendações</h2>
              <span className={`badge-level ${level}`}>{level.toUpperCase()}</span>
            </div>

            <ul className="action-list">
              {!recs ? (
                <li>
                  <div className="loading-recs">
                    <p>Gerando recomendações personalizadas...</p>
                  </div>
                </li>
              ) : (
                recs.map((t, idx) => (
                  <li key={idx}>
                    <div className="action-head">
                      <span className={`badge-tip ${level === "alto" ? "warn" : ""}`}>{t.tag}</span>
                      <div className="dim-label">{t.text}</div>
                    </div>
                    <div className="action-cta">
                      <Link className="mini-btn" to="/testPage">Refazer foco</Link>
                      <button className="mini-btn ghost" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        Revisar
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <hr className="divider" />
            <p className="footnote">
              O StressAI não substitui avaliação clínica. Procure apoio profissional se os sintomas persistirem.
            </p>
          </div>

          {/* Detalhamento por dimensão */}
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

      {/* Overlay de salvamento */}
      {saving && (
        <div className="saving-overlay">
          <p>Salvando resultado...</p>
        </div>
      )}
    </section>
  );
}
