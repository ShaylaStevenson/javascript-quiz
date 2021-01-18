//Setting up the HTML code
//Set up initial variables in JavaScript code
//Add questions, answer options, and answer key to the quiz
//Create the get() function
//create a function to display time interval countdown:
//     timer stops game at zero
//     timer subracts time when wrong answer clicked
//Create a function to display the questions
//Create a function to check the answers
//Create scoreboard to view results, set with users initials and display
//Get the quiz to load




//Function to prevent JS running until DOM loaded fully
$(document).ready(function() {

    

    //variable to contain start quiz button
    var startQuizBtn = get("startQuizBtn");

    //variable to contain reset button
    var resetBtn = get("resetBtn");

    //variable to contain the "test" <div>
    var testEl = get("testEl");
    testEl.innerHTML = "<h1>JavaScript Quiz</h1>"

    var submitAnswerBtn = get("submitAnswerBtn");

    //variable to contain the header that displays progress numerically
    var progressEl = get("progressEl");

    //variable to contain visual representation of progress of quiz via a bar
    var progressBarEl = get("progressBarEl");

    //variable to display highscores with initials
    var scoreboardEl = get("scoreboardEl");

    //variable to display the seconds left for quiz
    var timerEl = get("timerEl");

    //variable to set how long user has for test
    //var seconds;
    
    //variable containing countdown interval
    //var interval;

    //variable to record the progress of the quiz ex : Q3 of 4
    var progress = 0;

    //variable to record how many correct answers user has
    var correct = 0;

    //var score = 0;

    //variable to contain a question grabbed from an array
    var question;

    //variable to record the user's selected choice
    var userChoice;

    //variable to contain the possible answers displayed for the user
    var choices;

    //variables to contain each possible answer
    var chA, chB, chC;

    //Arrays within larger array, where questions with answers are stored
    var possibleQuestions = [
        {
            question: "I am a question?",
            a: "I am a pickle.",
            b: "I am a Rick.",
            c: "I am am Morty.",
            answer: "B"
        },
        {
            question: "Hey, I'm a question, too!?",
            a: "I am a burrito",
            b: "I am a taco",
            c: "I am Zorro",
            answer: "C",
        },
        {
            question: "I am a question?",
            a: "I am a pickle.",
            b: "I am a Rick.",
            c: "I am am Morty.",
            answer: "B"
        },
        {
            question: "Hey, I'm a question, too!?",
            a: "I am a burrito",
            b: "I am a taco",
            c: "I am Zorro",
            answer: "C",
        }
    ];

    //get() to reduce keystrokes.
    function get(x) {
        return document.getElementById(x);
    }

    //functions to show/hide buttons
    function showSubmitBtn() {
        submitAnswerBtn.style.visibility = "visible";
    }
    function hideSubmitBtn() {
        submitAnswerBtn.style.visibility = "hidden";
    }
    function showStartQuizBtn() {
        startQuizBtn.style.visibility = "visible";
    }
    function hideStartQuizBtn() {
        startQuizBtn.style.display = "none";
    }
    function showResetBtn() {
        resetBtn.style.visibility = "visible";
    }
    function hideResetBtn() {
        resetBtn.style.visibility = "hidden";
    }

    //function to control timer seconds and messages
    function startTimer() {     
            seconds = 45;
            interval = setInterval(function() {
            timerEl.innerHTML = "Seconds remaining: " + seconds;
            seconds--;
            //if seconds reaches zero, display message and score and render functions
            if (seconds <= 0) {
                progressEl.innerHTML = "Time is up!";
                testEl.innerHTML = "<h2>You answered " + correct + " out of " + possibleQuestions.length + " questions correctly.<h2>";
                hideStartQuizBtn();
                showResetBtn();
                hideSubmitBtn();
                calcScore(); 
                clearInterval(interval);
                timerEl.innerHTML = "";
                //progress = 0;
                //correct = 0;
            }
        }, 
        1000);    
    }

    //function to display a question on the screen and get user answer
    function displayQuestion() {
        hideStartQuizBtn();
        //if all questions are answered, display message and score and render functions
        if (progress >= possibleQuestions.length) {
            testEl.innerHTML = "<h2>You answered " + correct + " out of " + possibleQuestions.length + " questions correctly.<h2>";
            progressEl.innerHTML = "You have completed the quiz!";
            hideSubmitBtn();
            hideStartQuizBtn();
            showResetBtn();
            calcScore(); 
            clearInterval(interval);
            timerEl.innerHTML = "";
            return false;
             //progress = 0;
            //correct = 0;
            //stops function
        }

        //displays progress of quiz in progressEl
        progressEl.innerHTML = "Question " + (progress+1) + " of " + possibleQuestions.length;

        //"assign" keys from questions in possible questions array to variables, which can be reused
        question = possibleQuestions[progress].question;
        chA = possibleQuestions[progress].a;
        chB = possibleQuestions[progress].b;
        chC = possibleQuestions[progress].c;

        //display the question
        testEl.innerHTML = "<h3>" + question + "</h3>";

        //display the multiple-choices
        testEl.innerHTML += "<label><input type='radio' name='choices' value='A'>" + chA + "</label><br>";
        testEl.innerHTML += "<label><input type='radio' name='choices' value='B'>" + chB + "</label><br>";
        testEl.innerHTML += "<label><input type='radio' name='choices' value='C'>" + chC + "</label><br>";
        

        //submit button when answer is selected which will render checkAnswer function
        submitAnswerBtn.addEventListener("click", checkAnswer);
    }  

    //function to check answers
    function checkAnswer() {
        choices = document.getElementsByName("choices");
        
        //loop through choices and stops at checked choice
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                userChoice = choices[i].value;
            }
        }
        //check if userChoice matches answer key stored in array
        //if correct, increment correct variable
        if (userChoice == possibleQuestions[progress].answer) {
            correct++;
        //if false, decremant 5 seconds from timer
        } else {
            seconds -= 5;
        }
        //increases progress and displays next question
        progress++;
        displayQuestion();
    }

    //function to calculate score
    function calcScore() {
        scoreboardEl.style.visibility = "visible";
        score = (correct / possibleQuestions.length)*100;
        scoreboardEl.innerHTML += "\nYour score is: " + score + "%"
        localStorage.setItem("score", score);
    }

    function getInitials() {
        
    }

    function resetQuiz() {
        //scoreboardEl.innerHTML = "";
        window.location.reload();
    }

//when start button clicked, questions and timer will begin  
startQuizBtn.addEventListener("click", displayQuestion);
startQuizBtn.addEventListener("click", startTimer);
startQuizBtn.addEventListener("click", showSubmitBtn);
resetBtn.addEventListener("click", resetQuiz);
});

//collect users initials for score board
//in html create scorebard
//store scores in an object array, sort array, and display in scoreboard,local storage and json?
//add restart button
//add timer that starts onclick of begin button
//end game when timer = 0
//deduct time when wrong answer input
