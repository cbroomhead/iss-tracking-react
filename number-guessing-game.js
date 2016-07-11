// ## Number guessing game!

/*The Penniless Gambler

Challenge: create a simple HTML file that will only be used for the purposes of running 
JavaScript in the browser. Create a guess.js file and add it to a <script> tag of your
HTML file. This is simply so you can load your HTML file in the browser and do the 
challenge: creating a number guessing game.

Generate a random number between 1 and 100. Using the browser functions prompt and alert,
ask the user to guess the number. You should give them 4 tries to guess the number. 
If they guess wrong, tell them if it's higher or lower. If they guess right, 
congratulate them. Otherwise, give them a message saying what the correct number was, as
well as their list of guesses. 

-->Instead of using prompt and alert, you will have to use capabilities from NodeJS and any external module. 
HINT: there is an npm library called prompt that can help you with that :)
*/

function funGame () {
    var prompt = require('prompt');
    var randoNum = Math.floor(Math.random() * 100);
    console.log(randoNum);
    var counter = 0;

    function checkInput (){
        prompt.get('input', function (err, number){
          if(err){
            console.log('there was an error');
          }
            else {
                if (counter < 3){
                    if (number.input > randoNum){
                        console.log("Your number is too high, try again");
                    }
                    else if (number.input < randoNum){
                        console.log("Your number is too low, try again");
                    }
                    else {
                        console.log("You guessed right!");
                        return;
                    }
                    counter += 1;
                    checkInput();
                }    
            }
        });
    }
   checkInput();
}
funGame();