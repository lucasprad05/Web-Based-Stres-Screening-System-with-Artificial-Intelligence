// Aguarda que todo o conteúdo HTML seja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // Definição das perguntas e respostas do quiz
    // ============================
    const questions = [
        {
            question: "Nas últimas semanas, com que frequência você se sentiu nervoso(a) ou 'no limite'?",
            answers: [
                { text: "Nenhuma vez", value: 1 },
                { text: "Algumas vezes", value: 2 },
                { text: "Metade do tempo", value: 3 },
                { text: "Quase sempre", value: 4 }
            ]
        },
        {
            question: "Com que frequência você se sentiu incapaz de controlar as coisas importantes da sua vida?",
            answers: [
                { text: "Nenhuma vez", value: 1 },
                { text: "Algumas vezes", value: 2 },
                { text: "Metade do tempo", value: 3 },
                { text: "Quase sempre", value: 4 }
            ]
        },
        {
            question: "Com que frequência você se sentiu confiante sobre sua capacidade de lidar com seus problemas pessoais?",
            answers: [
                { text: "Quase sempre", value: 1 }, // Pontuação invertida: respostas positivas têm valor menor
                { text: "Metade do tempo", value: 2 },
                { text: "Algumas vezes", value: 3 },
                { text: "Nenhuma vez", value: 4 }
            ]
        },
        {
            question: "Como você avalia a qualidade do seu sono recentemente?",
            answers: [
                { text: "Excelente", value: 1 },
                { text: "Boa", value: 2 },
                { text: "Ruim", value: 3 },
                { text: "Péssima", value: 4 }
            ]
        }
    ];

    // ============================
    // Variáveis de controle do quiz
    // ============================
    let currentQuestionIndex = 0; // Índice da pergunta atual
    let totalScore = 0;           // Soma dos valores selecionados

    // Elementos do DOM para atualizar dinamicamente
    const progressText = document.getElementById('progress-text'); // Texto de progresso
    const questionText = document.getElementById('question-text'); // Texto da pergunta
    const answersContainer = document.getElementById('answers-container'); // Container dos botões de resposta

    // ============================
    // Inicializa o quiz
    // ============================
    function startQuiz() {
        currentQuestionIndex = 0; // Reseta índice
        totalScore = 0;           // Reseta pontuação
        showQuestion();           // Mostra a primeira pergunta
    }

    // ============================
    // Exibe a pergunta atual e suas respostas
    // ============================
    function showQuestion() {
        answersContainer.innerHTML = ''; // Limpa respostas anteriores

        const currentQuestion = questions[currentQuestionIndex]; // Pergunta atual

        // Atualiza texto de progresso
        progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
        // Atualiza texto da pergunta
        questionText.textContent = currentQuestion.question;

        // Cria botões para cada resposta
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;             // Texto do botão
            button.className = 'btn btn-answer btn-lg';   // Classes de estilo

            // Ação ao clicar no botão: seleciona a resposta
            button.onclick = () => selectAnswer(answer.value);

            // Adiciona o botão ao container de respostas
            answersContainer.appendChild(button);
        });
    }

    // ============================
    // Função chamada ao selecionar uma resposta
    // ============================
    function selectAnswer(value) {
        totalScore += value;       // Soma a pontuação da resposta selecionada
        currentQuestionIndex++;    // Avança para a próxima pergunta

        if (currentQuestionIndex < questions.length) {
            showQuestion();        // Mostra próxima pergunta
        } else {
            endQuiz();             // Finaliza o quiz
        }
    }

    // ============================
    // Finaliza o quiz e redireciona para a página de resultados
    // ============================
    function endQuiz() {
        // Atualiza a interface enquanto calcula o resultado
        questionText.textContent = "Calculando seu resultado...";
        answersContainer.innerHTML = ''; // Limpa os botões de resposta
        progressText.textContent = `Teste finalizado!`;

        // Salva a pontuação total no localStorage para a página de resultados
        localStorage.setItem('stressScore', totalScore);

        // Redireciona para a página de resultados após 1.5s
        setTimeout(() => {
            window.location.href = 'results.html';
        }, 1500);
    }

    // ============================
    // Inicia o quiz automaticamente ao carregar a página
    // ============================
    startQuiz();
});
