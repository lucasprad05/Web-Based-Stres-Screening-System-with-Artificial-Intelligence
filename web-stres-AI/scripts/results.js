// Aguarda que todo o conteúdo da página seja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // Recupera a pontuação armazenada no localStorage
    // ============================
    const score = localStorage.getItem('stressScore'); // Valor salvo da pontuação do teste

    // Elementos do DOM que serão atualizados com os resultados
    const scoreText = document.getElementById('score-text');       // Exibe a pontuação
    const levelText = document.getElementById('level-text');       // Exibe o nível de estresse
    const descriptionText = document.getElementById('description-text'); // Exibe descrição detalhada

    // ============================
    // Valida se a pontuação existe
    // ============================
    if (score === null) {
        // Se não houver pontuação, exibe mensagem de erro
        levelText.textContent = "Erro!";
        descriptionText.textContent = "Não foi possível encontrar sua pontuação. Por favor, faça o teste novamente.";
        return; // Interrompe execução
    }

    // Converte a pontuação para número inteiro
    const numericScore = parseInt(score);
    // Atualiza o texto do elemento com a pontuação
    scoreText.textContent = numericScore;

    // ============================
    // Define o nível de estresse com base na pontuação
    // ============================
    if (numericScore <= 4) {
        // Nível baixo de estresse
        levelText.textContent = "Nível de Estresse Baixo";
        descriptionText.textContent = "Seus resultados indicam um baixo nível de estresse. Você parece estar gerenciando bem as demandas do dia a dia. Continue com seus hábitos saudáveis!";
    } else if (numericScore <= 8) {
        // Nível moderado de estresse
        levelText.textContent = "Nível de Estresse Moderado";
        descriptionText.textContent = "Seus resultados sugerem um nível moderado de estresse. É um bom momento para observar suas rotinas e talvez incorporar algumas técnicas de relaxamento.";
    } else {
        // Nível alto de estresse
        levelText.textContent = "Nível de Estresse Alto";
        descriptionText.textContent = "Seus resultados indicam um nível alto de estresse. É importante prestar atenção aos sinais que seu corpo está dando. Considere conversar com um amigo, familiar ou profissional.";
    }

    // ============================
    // Remove a pontuação do localStorage para evitar resultados antigos
    // ============================
    localStorage.removeItem('stressScore');
});
