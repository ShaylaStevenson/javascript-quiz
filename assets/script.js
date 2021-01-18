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
    var startQuizBtn = document.getElementById("startQuizBtn");

    //variable to contain the "test" <div>
    var testEl;

    //variable to contain the header that displays progress numerically
    var progressEl;

    //variable to contain visual representation of progress of quiz via a bar
    var progressBarEl;

    //variable to display the seconds left for quiz
    var timerEl = document.getElementById("timerEl");

    var interval;
    

    //variable to display highscores with initials
    var scoreboardEl;

    //variable to record the progress of the quiz ex : Q3 of 4
    var progress = 0;

    //variable to record how many correct answers user has
    var correct = 0;

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

    function startTimer() {     
            var seconds = 10;
            interval = setInterval(function() {
            document.getElementById('timerEl').innerHTML = "Seconds remaining: " + seconds;
            seconds--;
            if (seconds <= 0) {
                clearInterval(interval);
                timerEl.innerHTML = "Seconds remaining: 0";
                get("progressEl").innerHTML = "Time is up!";
                testEl.innerHTML = "<h2>You answered " + correct + " out of " + possibleQuestions.length + " questions correctly.<h2>";
            }
        }, 
        1000);    
    }
    

    //get() to reduce keystrokes
    //Don't move! Will stop working!
    function get(x) {
        return document.getElementById(x);
    }

    //function to display a question on the screen
    function displayQuestion() {
        
        testEl = get("testEl");
        if (progress >= possibleQuestions.length) {
            testEl.innerHTML = "<h2>You answered " + correct + " out of " + possibleQuestions.length + " questions correctly.<h2>";
            get("progressEl").innerHTML = "You have completed the quiz!";
            //stop timer but display remaining seconds
            clearInterval(interval);
            //reset variables to reset quiz
            progress = 0;
            correct = 0;
            //stops function
            return false;
        }

        //displays progress of quiz in progressEl
        get("progressEl").innerHTML = "Question " + (progress+1) + " of " + possibleQuestions.length;

        //"assign" keys from questions in possible questions array to variables, which can be reused
        question = possibleQuestions[progress].question;
        chA = possibleQuestions[progress].a;
        chB = possibleQuestions[progress].b;
        chC = possibleQuestions[progress].c;

        //display the question
        testEl.innerHTML = "<h3>" + question + "</h3>";

        //display the multiple-choices
        //??recreate by hooking to elemnets instead of creating in JS?
        testEl.innerHTML += "<label><input type='radio' name='choices' value='A'>" + chA + "</label><br>";
        testEl.innerHTML += "<label><input type='radio' name='choices' value='B'>" + chB + "</label><br>";
        testEl.innerHTML += "<label><input type='radio' name='choices' value='C'>" + chC + "</label><br>";
    
        //confirmAnswer();

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
        if (userChoice == possibleQuestions[progress].answer) {
            correct++;
        }
        //increases progress and displays next question
        progress++;
        displayQuestion();
    }
//when start button clicked, questions will begin  
startQuizBtn.addEventListener("click", displayQuestion);
startQuizBtn.addEventListener("click", startTimer);
});

//collect users initials for score board
//in html create scorebard
//store scores in an object array, sort array, and display in scoreboard,local storage and json?
//add restart button
//add timer that starts onclick of begin button
//end game when timer = 0
//deduct time when wrong answer input
