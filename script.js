const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false; 

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9){
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    // Set up timer 
    let currentTime = leadingZero(timer[2]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[0]);
    theTimer.innerHTML = currentTime;   //Set the display of the timer
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    // Sets up timer so that when it hits 60 it returns to 0
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[0] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));


}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);  

    if (textEntered == originText){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch){
            testWrapper.style.borderColor = "#65CCf3";
        } else{
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
    
}


// Start the timer:
function start(){
    let textEnteredText = testArea.value.length;
    if (textEnteredText === 0 && !timerRunning ){
        timerRunning = true; 
       interval = setInterval(runTimer, 10);
    }    
    console.log(textEnteredText);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false; 

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);