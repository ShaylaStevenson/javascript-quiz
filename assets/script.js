
//Function to prevent JS running until DOM loaded fully
$(document).ready(function() {
    
    //variable to contain start quiz button
    var startQuizBtn = get("startQuizBtn");

    //variable to contain reset button
    var resetBtn = get("resetBtn");

    //variable to contain the "test" <div>
    var testEl = get("testEl");

    var submitAnswerBtn = get("submitAnswerBtn");
    

    //variable to contain the header that displays progress numerically
    var progressEl = get("progressEl");

    //variable to display highscores with initials
    var scoreDisplay = get("scoreDisplay");
    var scoreArray = {};

    //variable to contain user's initials
    var userInitials = get("userInitials");

    //variable to contain the value of initials to be stored
    //var initialsValue;

    //variable to contain the submit highscore button
    var getInitialsBtn = get("getInitialsBtn");

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

    var score = 0;
    //var highscores = {initials: initials, score: score};

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
            question: "Which event occurs when the user clicks on an HTML element?",
            a: "go-go",
            b: "onclick",
            c: "onMouseClick",
            answer: "B",
        },
        {
            question: "How do you write 'Hi JavaScript' in an alert box?",
            a: "msgBox('Hi JavaScript')",
            b: "comment('Hi JavaScript')",
            c: "alert('Hi JavaScript')",
            answer: "C",
        },
        {
            question: "How do you call a function named 'funFunction'?",
            a: "call: funFunction",
            b: "funFunction()",
            c: "run('funFunction')",
            answer: "B",
        },
        {
            question: "How can you add a comment in a JavaScript file?",
            a: "//comment",
            b: "<!--comment-->",
            c: "/**comment",
            answer: "A",
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            a: "var drinks = ['coffee', 'soda', 'water']",
            b: "array drinks = 'coffee', 'soda', 'water'",
            c: "coffee, soda, water = drinks",
            answer: "A",
        },
        {
            question: "How do you find the number with the highest value of x and y?",
            a: "Math.ceil(x,y)",
            b: "highNum = x,y",
            c: "Math.max(x,y)",
            answer: "C",
        },
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
    function showScoreboard() {
        resetBtn.style.visibility = "visible";
    }

    //function to control timer seconds and messages
    function startTimer() {     
            seconds = 60;
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
            testEl.innerHTML = "<h2>You answered " + correct + " out of " + possibleQuestions.length + "<br>questions correctly.<h2>";
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
        var alertRow = get("rightOrWrong");
        
        
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
            alertRow.innerHTML = "Correct!";
        //if false, decremant 5 seconds from timer
        } else {
            seconds -= 5;
            alertRow.innerHTML = "Wrong!";
            
        }
        //alert if answer is right or wrong
        function flashRow() {
            alertRow.innerHTML = "";
        }
        setTimeout(flashRow, 750);
        //increases progress and displays next question
        progress++;
        setTimeout(displayQuestion, 750);
        console.log(correct);
        return correct;
    }
    
    //function to calculate score
    function calcScore() {
        var perValue = (correct / possibleQuestions.length)*100;
        score = perValue.valueOf();
        scoreDisplay.innerHTML = "\nYour score: " + score + "%";
        scoreboard.style.visibility = "visible";
        console.log(score);
        return score;
    }
    
    //function to save initials with score in localstorage
    function saveScore() {
        //store initials and score in array
        scoreArray = {
            initials: userInitials.value.trim(),
            score: score.valueOf(),
        };
        localStorage.setItem("scoreArray",JSON.stringify(scoreArray));

        //clear fields and disable btn
        scoreDisplay.innerHTML = "";
        userInitials.value = "";
        getInitialsBtn.disabled = true;
        showHighScores();
        console.log(scoreArray.initials);
        console.log(scoreArray.score);
        return;
    }

    //function to get saved scores and display
    function showHighScores() {
        var scoreArrayStorage = JSON.parse(localStorage.getItem("scoreArray"));
        
        console.log(scoreArrayStorage);
        if (scoreArrayStorage !== null) {
            get("highscoreInitials").innerHTML += scoreArray.initials;
            get("highscoreScores").innerHTML += scoreArray.score;
        }
        else {
            return;
        }
    }
    
    //resets quiz for next user
    function resetQuiz() {
        //scoreboardEl.innerHTML = "";
        window.location.reload();
    }
    
//event listeners  
startQuizBtn.addEventListener("click", function(){setTimeout(displayQuestion, 1000)});
startQuizBtn.addEventListener("click", function(){setTimeout(startTimer, 1000)});
startQuizBtn.addEventListener("click", function(){setTimeout(showSubmitBtn, 1000)});
resetBtn.addEventListener("click", function(){setTimeout(resetQuiz, 1000)});
getInitialsBtn.addEventListener("click", saveScore);
});
