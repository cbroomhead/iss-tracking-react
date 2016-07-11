//# HANGAMN 
/*In this file, write a program that will let the user play hangman. The program should work as follows:
Choose a random word from a list of words.
In a loop, do the following:
Ask the user to guess a letter
If the user guessed a wrong letter, then add one step to the hangman "drawing"
Display the current completion of the word next to a hangman ASCII "drawing". You can get some inspiration from either here or here
Keep looping until either the word is found or the hangman is hanged!
Display a message to the user letting them know what happened*/

var prompt = require('prompt');


var deadGuy = ["_________",
    "|         |",
    "|         0",
    "|        -|-",
    "|       -- -",
   "|",
    "|"];


function stringInput(inputArray) {
    var counter = 0;
    var validLetter = [];
    var randomWord = inputArray[Math.floor(Math.random() * (inputArray.length - 1))];
    console.log(randomWord);

    function askAgain() {
        prompt.get('inputString', function(err, string) {
            if (err) {
                console.log('there was an error');
            }
            else {
                if (counter < 7) {
                    if (randomWord.indexOf(string.inputString) === -1) { //|| validLetter.indexOf(string.inputString) !== false ){
                        console.log(deadGuy[counter]);
                        counter++;
                        askAgain();
                    }
                    else {
                        console.log("You guessed right!");
                        validLetter.push(string.inputString);
                        console.log(validLetter);
                        askAgain();
                    }
                } else {
                    console.log("GAME OVER");
                }
            }
        })
    }
    askAgain();
};
stringInput(["cat", "dog", "girafe", "wombat", "snake", "beaver", "pigeon"]);
