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

//variable to record the progress of the quiz ex : Q3 of 4
var progress = 0;

//variable to record how many correct answers user has
var correct = 0;

//variable to contain the "test" <div>
var testEl;

//variable to contain the header that displays progress
var progressEl;

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

//get() to reduce keystrokes
function get(x) {
    return document.getElementById(x);
}

//function to display a question on the screen
function displayQuestion() {
    testEl = get("testEl");
    if (progress >= possibleQuestions.length) {
        testEl.innerHTML = "<h2>You answered " + correct + " out of" + possibleQuestions.length + " questions correctly.<h2>";
        get("progressEl").innerHTML = "You have completed the quiz.";
        //reset variables to reset quiz
        progress = 0;
        correct = 0;
        //stops function
        return false;
    }

    //displays progress of quiz in progressEl
    get("progressEl").innerHTML = "Question " + progress+1 + " of" + possibleQuestions.length;

    //"assign" keys from questins in possible questions array to variables, which can be reused
    question = possibleQuestions[progress].question;
    chA = possibleQuestions[progress].a;
    chB = possibleQuestions[progress].b;
    chC = possibleQuestions[progress].c;

    //display the question
    testEl.innerHTML = "<h3>" + question + "</h3>";

    //display the multiple-choices
    //??recreate by hooking to elemnets instead of creating in JS?
    testEl.innerHTML += "<label><input type='radio' name='choices' value='A'>" + chA + "</label><br>";
    testEl.innerHTML += "<label><input type='radio' name='choices' value='A'>" + chB + "</label><br>";
    testEl.innerHTML += "<label><input type='radio' name='choices' value='A'>" + chC + "</label><br>";

    //show submit button when answer is selected
    testEl.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
    
}
