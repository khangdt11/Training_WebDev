const quizQuestions = [
{
    question: "What is the capital of France?",
    answers: [
    { text: "London", correct: false },
    { text: "Berlin", correct: false },
    { text: "Paris", correct: true },
    { text: "Madrid", correct: false },
    ],
    },
{
    question: "Which planet is known as the Red Planet?",
    answers: [
    { text: "Venus", correct: false },
    { text: "Mars", correct: true },
    { text: "Jupiter", correct: false },
    { text: "Saturn", correct: false },
    ],
    },
{
    question: "What is the largest ocean on Earth?",
    answers: [
    { text: "Atlantic Ocean", correct: false },
    { text: "Indian Ocean", correct: false },
    { text: "Arctic Ocean", correct: false },
    { text: "Pacific Ocean", correct: true },
    ],
    },
{
    question: "Which of these is NOT a programming language?",
    answers: [
    { text: "Java", correct: false },
    { text: "Python", correct: false },
    { text: "Banana", correct: true },
    { text: "JavaScript", correct: false },
    ],
    },
{
    question: "What is the chemical symbol for gold?",
    answers: [
    { text: "Go", correct: false },
    { text: "Gd", correct: false },
    { text: "Au", correct: true },
    { text: "Ag", correct: false },
    ],
    },
];

const btnStart = document.getElementById('start-btn');
const quizScreen = document.createElement('div');
quizScreen.id = 'quiz-screen'
quizScreen.className = 'screen active';




const container =  document.querySelector('.container');

let currentIndex = 0;
let currentScore = 0;

btnStart.addEventListener('click', e => {
    document.getElementById('start-screen').remove();
    container.appendChild(quizScreen);
    showQuiz(currentIndex);
});



function showQuiz(currentIndex) {
    const currQuestion = quizQuestions[currentIndex];

    const headerContainer = document.createElement('div');
    headerContainer.className = 'quiz-header';
    headerContainer.innerHTML = `<h2 id="question-text">${currQuestion.question}</h2>
          <div class="quiz-info">
            <p>
              Question <span id="current-question">${currentIndex + 1}</span> of
              <span id="total-questions">${quizQuestions.length}</span>
            </p>
            <p>Score: <span id="score">${currentScore}</span></p>
          </div>`;
    quizScreen.appendChild(headerContainer);

    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';
    currQuestion.answers.forEach((ans) => {
        const buttonAnswer = document.createElement('button');
        buttonAnswer.className = 'answer-btn';
        buttonAnswer.textContent = ans.text;
        buttonAnswer.setAttribute('data-correct', `${ans.correct}`);
        answersContainer.appendChild(buttonAnswer);

        buttonAnswer.addEventListener('click', e => {         
            (Array.from(document.querySelectorAll('.answer-btn'))).forEach((answer) => {
                answer.disabled = true;
                if(answer.dataset.correct === 'true') {
                    answer.classList.add('correct');
                } else if (answer === e.target) {
                    answer.classList.add('incorrect');
                }
            });
            if(e.target.dataset.correct === 'true') {
                currentScore += 20;
            }
            currentIndex++;
            setTimeout(() => {
                headerContainer.remove();
                answersContainer.remove();
                if(currentIndex < quizQuestions.length) {
                    showQuiz(currentIndex);
                } else {
                   quizScreen.classList.remove('active');
                   const resultScreen = document.createElement('div');
                   resultScreen.classList.add('screen');
                   resultScreen.classList.add('active');
                   resultScreen.id = 'result-screen';
                   resultScreen.innerHTML = `<h1>Quiz Results</h1>
                    <div class="result-info">
                    <p>
                        You scored <span id="final-score">${currentScore}</span> out of
                        <span id="max-score">100</span>
                    </p>
                    <div id="result-message">Great job! You know your stuff!</div>
                    </div>`;
                    container.appendChild(resultScreen);
                }
            }, 1000);


        });
    });

    quizScreen.appendChild(answersContainer);
}





