document.addEventListener('DOMContentLoaded', () => {

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
                { text: "Quase sempre", value: 1 }, // Note que aqui a pontuação é invertida
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

    let currentQuestionIndex = 0;
    let totalScore = 0;

    const progressText = document.getElementById('progress-text');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    function startQuiz() {
        currentQuestionIndex = 0;
        totalScore = 0;
        showQuestion();
    }

    function showQuestion() {
        answersContainer.innerHTML = ''; 

        const currentQuestion = questions[currentQuestionIndex];

        progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
        questionText.textContent = currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.className = 'btn btn-answer btn-lg';
            
            button.onclick = () => selectAnswer(answer.value);
            
            answersContainer.appendChild(button);
        });
    }

    function selectAnswer(value) {
        totalScore += value;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {

        questionText.textContent = "Calculando seu resultado...";
        answersContainer.innerHTML = '';
        progressText.textContent = `Teste finalizado!`;

        localStorage.setItem('stressScore', totalScore);

        setTimeout(() => {
            window.location.href = 'results.html';
        }, 1500);
    }

    startQuiz();
});