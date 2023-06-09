const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const ProgressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [{
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<Izunwaonu>",
        choice4: "<Scripting>",
        answer: 1
    },
    {
        question: "What is the current syntax for refering to an external script called xxx.js? ",
        choice1: "<script href='xxx.js'>",
        choice2: "<sript name ='xxx.js'>",
        choice3: "<script src ='xxx.js'>",
        choice4: "<Script file ='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write Hello World in an alert box? ",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html")
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    ProgressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswer) return;
        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply);
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);




    })
    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    }

});
startGame();