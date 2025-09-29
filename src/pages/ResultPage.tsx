import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/results.css";

// Interface para estruturar os dados do resultado
interface ResultData {
  level: string;
  description: string;
  color: string;
}

// Lógica de determinação do nível de estresse
const getResultData = (score: number): ResultData => {
  // O teste tem 7 perguntas com escala 1-5, resultando em um score de 7 a 35.
  const lowThreshold = 14; 
  const moderateThreshold = 24; 

  if (score <= lowThreshold) {
    return {
      level: "Nível de Estresse Baixo",
      description: "Seus resultados indicam um baixo nível de estresse. Você parece estar gerenciando bem as demandas do dia a dia. Continue com seus hábitos saudáveis!",
      color: "#28a745", // Verde
    };
  } else if (score <= moderateThreshold) {
    return {
      level: "Nível de Estresse Moderado",
      description: "Seus resultados sugerem um nível moderado de estresse. É um bom momento para observar suas rotinas e talvez incorporar algumas técnicas de relaxamento.",
      color: "#ffc107", // Amarelo
    };
  } else {
    return {
      level: "Nível de Estresse Alto",
      description: "Seus resultados indicam um nível alto de estresse. É importante prestar atenção aos sinais que seu corpo está dando. Considere conversar com um amigo, familiar ou profissional.",
      color: "#dc3545", // Vermelho
    };
  }
};

export default function ResultPage() {
  const [score, setScore] = useState<number | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedScore = localStorage.getItem("stressScore");

    if (storedScore === null || isNaN(parseInt(storedScore))) {
      // Se não houver score, defina o estado de erro
      setResult({
        level: "Erro!",
        description: "Não foi possível encontrar sua pontuação. Por favor, faça o teste novamente.",
        color: "#dc3545",
      });
    } else {
      // Se houver score, processe o resultado
      const numericScore = parseInt(storedScore);
      setScore(numericScore);
      const resultData = getResultData(numericScore);
      setResult(resultData);
      
      // Limpa o score do localStorage apenas após o processamento bem-sucedido
      localStorage.removeItem("stressScore");
    }

    setIsLoading(false); // Fim do carregamento
  }, []);


  if (isLoading || result === null) {
    // Exibe um carregador simples enquanto o useEffect está processando ou se result ainda é nulo
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
  
  // Define as variáveis de exibição
  const displayScore = score !== null ? score : '...';
  const displayLevel = result.level;
  const displayDescription = result.description;
  const displayColor = result.color;
  
  // Verifica se é o estado de erro
  const isError = displayLevel === "Erro!";

  return (
    <div className="result-page-wrapper">
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* Card com o resultado do teste */}
            <div id="result-container" className="result-card shadow">
              <h2 className="result-title">{isError ? "Ocorreu um Erro" : "Seu Resultado"}</h2>
              
              {/* Só exibe a pontuação se não houver erro */}
              {!isError && (
                <>
                  <p className="result-desc">Sua pontuação de estresse é:</p>

                  <h1 id="score-text" className="result-score" style={{ color: 'var(--ink)' }}>
                    {displayScore}
                  </h1>
                </>
              )}

              {/* Nível de estresse (usando a cor calculada) */}
              <h3 id="level-text" className="result-level" style={{ color: displayColor }}>
                {displayLevel}
              </h3>

              {/* Descrição explicativa do resultado */}
              <p id="description-text" className="result-description">
                {displayDescription}
              </p>
              
              <div className="result-divider" />

              {/* Botão para refazer o teste */}
              <Link to="/TestPage" className="result-button">
                {isError ? "Ir para o Teste" : "Fazer o teste novamente"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
