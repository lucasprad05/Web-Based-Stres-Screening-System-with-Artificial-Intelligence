import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/results.css";

interface ResultData {
  level: string;
  description: string;
  color: string;
}

const getResultData = (score: number): ResultData => {
  const lowThreshold = 14;
  const moderateThreshold = 24;
  if (score <= lowThreshold) {
    return {
      level: "Nível de Estresse Baixo",
      description:
        "Seus resultados indicam um baixo nível de estresse. Você parece estar gerenciando bem as demandas do dia a dia. Continue com seus hábitos saudáveis!",
      color: "#28a745",
    };
  } else if (score <= moderateThreshold) {
    return {
      level: "Nível de Estresse Moderado",
      description:
        "Seus resultados sugerem um nível moderado de estresse. É um bom momento para observar suas rotinas e talvez incorporar algumas técnicas de relaxamento.",
      color: "#ffc107",
    };
  } else {
    return {
      level: "Nível de Estresse Alto",
      description:
        "Seus resultados indicam um nível alto de estresse. É importante prestar atenção aos sinais que seu corpo está dando. Considere conversar com um amigo, familiar ou profissional.",
      color: "#dc3545",
    };
  }
};

export default function ResultPage() {
  const [score, setScore] = useState<number | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return; // já rodou, não executa de novo
    hasRunRef.current = true;

    const storedScore = localStorage.getItem("stressScore");

    if (storedScore === null || isNaN(parseInt(storedScore))) {
      setResult({
        level: "Erro!",
        description:
          "Não foi possível encontrar sua pontuação. Por favor, faça o teste novamente.",
        color: "#dc3545",
      });
      setIsLoading(false);
      return;
    }

    const numericScore = parseInt(storedScore);
    setScore(numericScore);
    setResult(getResultData(numericScore));

    // Se quiser limpar, pode manter — agora só roda uma vez
    localStorage.removeItem("stressScore");

    setIsLoading(false);
  }, []);

  if (isLoading || result === null) {
    return (
      <div className="result-page-wrapper">
        <main className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="result-card shadow p-5">
                <h2 className="result-title">Aguarde...</h2>
                <p>Calculando seu nível de estresse.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isError = result.level === "Erro!";

  return (
    <div className="result-page-wrapper">
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div id="result-container" className="result-card shadow">
              <h2 className="result-title">{isError ? "Ocorreu um Erro" : "Seu Resultado"}</h2>

              {!isError && (
                <>
                  <p className="result-desc">Sua pontuação de estresse é:</p>
                  <h1 id="score-text" className="result-score" style={{ color: "var(--ink)" }}>
                    {score}
                  </h1>
                </>
              )}

              <h3 id="level-text" className="result-level" style={{ color: result.color }}>
                {result.level}
              </h3>

              <p id="description-text" className="result-description">
                {result.description}
              </p>

              <div className="result-divider" />

              <Link to="/testPage" className="result-button">
                {isError ? "Ir para o Teste" : "Fazer o teste novamente"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
