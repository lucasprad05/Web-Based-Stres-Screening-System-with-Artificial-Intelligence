import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/storage";
import {
  QuestionScale,
  DEFAULT_SCALE,
  type QuestionId,
} from "../components/QuestionScale";
import "../styles/testPage.css";

type Answers = Partial<Record<QuestionId, number>>;

const QUESTIONS: ReadonlyArray<{ id: QuestionId; label: string }> = [
  {
    id: "sono",
    label: "Com que frequência você tem dormido mal ou com sono insuficiente?",
  },
  {
    id: "carga",
    label: "Você sente que sua carga de estudos/trabalhos tem sido excessiva?",
  },
  {
    id: "prazo",
    label:
      "Com que frequência você se sente pressionado(a) por prazos ou avaliações?",
  },
  {
    id: "preocupacao",
    label: "Você tem se sentido preocupado(a) com seu desempenho acadêmico?",
  },
  {
    id: "pausas",
    label:
      "Com que frequência você deixa de fazer pausas curtas durante o estudo?",
  },
  {
    id: "sintomas",
    label: "Tem percebido sintomas físicos como dor de cabeça ou tensão?",
  },
  {
    id: "apoio",
    label: "Você sente falta de apoio de colegas, amigos ou familiares?",
  },
] as const;

export default function FazerTeste() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken =
      !!getToken() ||
      !!localStorage.getItem("access_token") ||
      !!localStorage.getItem("atk") ||
      !!localStorage.getItem("token");

    if (!hasToken) {
      navigate("/login", { replace: true, state: { from: "/testPage" } });
    }
  }, [navigate]);

  const current = QUESTIONS[step];
  const total = QUESTIONS.length;
  const progress = Math.round((step / total) * 100);

  // pular/avançar sem responder (usa estado atual)
  const advance = useCallback(() => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      // terminou sem responder a última agora
      navigate("/Result", { state: { answers: { ...answers } } });
    }
  }, [answers, step, total, navigate]);

  // responder a pergunta atual
  const handleChange = useCallback(
    (q: QuestionId, value: number) => {
      // constrói o estado *atualizado* e usa ele pra decidir
      const nextAnswers: Answers = { ...answers, [q]: value };
      setAnswers(nextAnswers);

      // se é a ÚLTIMA pergunta, navega já com nextAnswers (sem esperar React)
      if (step === total - 1) {
        navigate("/Result", { state: { answers: nextAnswers } });
      } else {
        // senão, só avança para a próxima
        setTimeout(() => setStep((s) => s + 1), 120);
      }
    },
    [answers, step, total, navigate]
  );

  // atalhos 1..5 e setas
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!current) return;
      const map: Record<string, number> = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
      };
      const v = map[e.key];
      if (v) handleChange(current.id, v);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
      if (e.key === "ArrowRight") advance();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, handleChange, advance, step]);

  const percent = useMemo(
    () => Math.min(100, Math.max(0, progress)),
    [progress]
  );

  return (
    <section className="main-hero progressive-shell">
      <div className="hero-divider" aria-hidden />

      <div className="hero-left">
        <header className="q-header">
          <h1 className="q-h1">Panorama de estresse</h1>
          <p className="q-sub">
            Responda e já passamos para a próxima. Leva menos de 2 minutos.
          </p>

          <div className="q-progress" aria-label={`Progresso: ${percent}%`}>
            <div className="q-progress-bar" style={{ width: `${percent}%` }} />
            <span className="q-progress-text">
              {step + 1}/{total}
            </span>
          </div>
        </header>

        {current && (
          <div className="q-card animate-in">
            <QuestionScale
              key={current.id}
              id={current.id}
              label={current.label}
              value={answers[current.id]}
              onChange={handleChange}
              scale={DEFAULT_SCALE}
            />

            <div className="q-nav">
              <button
                type="button"
                className="ghost-btn"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Voltar
              </button>

              <button type="button" className="primary-btn" onClick={advance}>
                {step < total - 1 ? "Pular" : "Ver resultado"}
              </button>
            </div>
          </div>
        )}

        <p className="q-footnote">
          Suas respostas não identificam você. São usadas apenas para estimar
          seu nível de estresse.
        </p>
      </div>

      <aside className="hero-right">
        <figure className="info-card modern">
          <figcaption>Como funciona</figcaption>
          <p>
            O StressAI calcula um <strong>índice estimado</strong> com base nas
            suas respostas. Não substitui aconselhamento profissional.
          </p>
          <ul className="info-list">
            <li>
              Atalhos: <code>1</code>–<code>5</code>
            </li>
            <li>
              Setas <code>←</code> / <code>→</code> para navegar
            </li>
            <li>Pule e responda depois se quiser</li>
          </ul>
        </figure>
      </aside>
    </section>
  );
}
