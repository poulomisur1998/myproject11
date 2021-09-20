//1. Declaring variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-box");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("options");
const message = document.getElementById("message");

let shuffledQuestions, currentQuestionIndex;

//2. Event Listeners to start our quiz
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//3. This will start our quiz
function startQuiz() {
  startButton.classList.add("hide");
  message.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

//4. Setting a new question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//5. Showing a random queston
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    console.log(question.answers[0].correct);
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

//6. This will remove the question we just solved right now
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//7. Checking whether the option clicked by the user is correct or not
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart?";
    startButton.classList.remove("hide");
  }
}

//8. setStatusClass will show whether the option is correct or not
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else if (!correct) {
    element.classList.add("wrong");
  }
}

//9.After we go to the next question clearStatusClass will the status of
// previous question
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  // userScore = 0;
}