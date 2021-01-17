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
var test;

//variable to contain the header that displays progress
var progressBar;

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