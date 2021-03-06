//Function to prevent JS running until DOM loaded fully
$(document).ready(function() {

    //buttons to start game, reset, submit
    var startQuizBtn = get("startQuizBtn");
    var resetBtn = get("resetBtn");
    var getInitialsBtn = get("getInitialsBtn");
    var submitAnswerBtn = get("submitAnswerBtn");
    //componenets of main gameplay
    var testEl = get("testEl");
    var progressEl = get("progressEl");
    var timerEl = get("timerEl");
    var progress = 0;
    var correct = 0;
    var score = 0;
    //contain a question grabbed from an array
    var question;
    //record the user's selected choice
    var userChoice;
    //possible answers displayed for the user
    var choices;
    //each possible answer
    var chA, chB, chC;
    //componenets related to score storage
    var scoreDisplay = get("scoreDisplay");
    var userInitials = get("userInitials");
    
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
    function hideStartQuizBtn() {
        startQuizBtn.style.display = "none";
    }
    function showResetBtn() {
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
        scoreDisplay.innerHTML = ("\nYour score: " + score + "%");
        scoreboard.style.visibility = "visible";
        console.log(score);
        return score;
    }
    
    //function to save score and ADD to existing array
    //This function is unfortunately not working. 
    //What is submitted is unfinished, since it only displays the current users score,
    //which is saved in local storage
        // function saveScore() {
        //     var initials = userInitials.value.trim();
        //     if ("initial !==") {
        //         var highscores = JSON.parse(window.localStorage.getItem("userHighscore")) || [];
        //         var newScore = {
        //             score: score.valueOf,
        //             initials: initials,
        //         };
        //     userHighscore.push(newScore);
        //     window.localStorage.setItem("highscores",JSON.stringify(highscores));
        //     scoreDisplay.innerHTML = "";
        //     userInitials.value = "";
        //     getInitialsBtn.disabled = true;
        //     console.log(highscores.initials);
        //     console.log(highscores.score);
        //     get("highscoreInitials").innerHTML += highscores.initials;
        //     get("highscoreScores").innerHTML += highscores.score;


    //function to save initials with score in localstorage
    function saveScore() {
        //store initial and score in array
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

    //function to get saved score and display
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