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

const button = document.querySelector('.answer-btn')

let currentIndex = 0;
let currentScore = 0;



const createBtn = (index, currentQuestion) => {
    const buttonAnswer = document.createElement('button');
    buttonAnswer.className = 'answer-btn';
    buttonAnswer.textContent= currentQuestion.answers[index].text;
    buttonAnswer.setAttribute('data-correct', currentQuestion.answers[index].correct)
    return buttonAnswer;
}

const renderQuestion = (currentIndex) => {
    const currentQuestion = quizQuestions[currentIndex];
    const headerContainer = document.createElement('div');

    headerContainer.classList.add('quiz-header');
    headerContainer.innerHTML = `<h2 id="question-text">${currentQuestion.question}</h2>
          <div class="quiz-info">
            <p>
              Question <span id="current-question">${currentIndex + 1}</span> of
              <span id="total-questions">${quizQuestions.length}</span>
            </p>
            <p>Score: <span id="score">${currentScore}</span></p>
          </div>`;

    document.getElementById('quiz-screen').appendChild(headerContainer);

    const answersContainer = document.createElement('div');
    answersContainer.id = 'answers-container'
    answersContainer.className = 'answers-container';
                
    document.getElementById('quiz-screen').appendChild(answersContainer);
     
    

    currentQuestion.answers.forEach((ans, index) => {
        const button = createBtn(index, currentQuestion);
        answersContainer.appendChild(button);
        button.addEventListener('click', e => {
            document.querySelectorAll(".answer-btn").forEach((btn) => {
                btn.disabled = true;
            });
            if(currentIndex < quizQuestions.length) {
                const isCorrect = e.target.dataset.correct;          
                if(isCorrect === 'true') {
                     currentScore += 20;
                     e.target.classList.add('correct');
                     setTimeout(() => {
                         headerContainer.remove();
                         answersContainer.remove();
                         currentIndex++;
                         renderQuestion(currentIndex);
                     }, 2000)
                } else {
                    e.target.classList.add('incorrect');
                    setTimeout(() => {
                         headerContainer.remove();
                         answersContainer.remove();
                         currentIndex++;
                         renderQuestion(currentIndex);
                    }, 2000)
                }
            } else {
                headerContainer.remove();
                answersContainer.remove();
            }
        });
    });           
};

renderQuestion(currentIndex);





