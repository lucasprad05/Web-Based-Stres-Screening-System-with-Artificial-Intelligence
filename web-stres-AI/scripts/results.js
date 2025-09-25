// scripts/results.js
document.addEventListener('DOMContentLoaded', () => {
    const score = localStorage.getItem('stressScore');
    const scoreText = document.getElementById('score-text');
    const levelText = document.getElementById('level-text');
    const descriptionText = document.getElementById('description-text');

    if (score === null) {
        levelText.textContent = "Erro!";
        descriptionText.textContent = "Não foi possível encontrar sua pontuação. Por favor, faça o teste novamente.";
        return;
    }

    const numericScore = parseInt(score);
    scoreText.textContent = numericScore;

    if (numericScore <= 4) {
        levelText.textContent = "Nível de Estresse Baixo";
        descriptionText.textContent = "Seus resultados indicam um baixo nível de estresse. Você parece estar gerenciando bem as demandas do dia a dia. Continue com seus hábitos saudáveis!";
    } else if (numericScore <= 8) {
        levelText.textContent = "Nível de Estresse Moderado";
        descriptionText.textContent = "Seus resultados sugerem um nível moderado de estresse. É um bom momento para observar suas rotinas e talvez incorporar algumas técnicas de relaxamento.";
    } else {
        levelText.textContent = "Nível de Estresse Alto";
        descriptionText.textContent = "Seus resultados indicam um nível alto de estresse. É importante prestar atenção aos sinais que seu corpo está dando. Considere conversar com um amigo, familiar ou profissional.";
    }

    localStorage.removeItem('stressScore');
});