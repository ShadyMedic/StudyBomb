document.addEventListener('DOMContentLoaded', event => {
    document.getElementById("input-form").onsubmit = setTimer;
    document.getElementById("timer-button").onclick = addTime;
    document.getElementById("theme-button").onclick = switchTheme;
    document.getElementById("distractions-button").onclick = switchDistractions;
});

var minutesInterval = undefined;
var secondsInterval = undefined;

var minutesLeft = 0;
var secondsLeft = 0;

var hoursTotal = 0;
var minutesTotal = 0;
var secondsTotal = 0;

var timerLoop = undefined;

function setTimer(event) {
    event.preventDefault();
    let input = document.getElementById("time-input").value;

    //Split the input by the colon
    input = input.split(":");

    for (let i = 0; i < input.length; i++) {
        input[i] = Number(input[i]);
        if (isNaN(input[i]) || input[i] < 0) {
            alert("Invalid input");
            return;
        }
    }

    switch (input.length) {
        case 2:
            if (input[1] > 59) {
                alert("Invalid input");
                return;
            }
            minutesInterval = input[0];
            secondsInterval = input[1];
            break;
        case 1:
            minutesInterval = input[0];
            secondsInterval = 0;
            break;
        default:
            alert("Invalid input");
            return;
    }

    addTime(); //Add the first interval
    updateTimers(); //Set the initial time to the document so the timer isn't empty

    document.getElementById("intro").classList.toggle("hidden");
    document.getElementById("timer").classList.toggle("hidden");

    timerLoop = setInterval(loop, 1000) //Start the timer after 1 seconds
}

function updateTimers()
{
    document.getElementById("timer-minutes").innerText = String(minutesLeft).padStart(2, '0');
    document.getElementById("timer-seconds").innerText = String(secondsLeft).padStart(2, '0');
    document.getElementById("total-time").innerText =
        String(hoursTotal).padStart(2, '0') + ":" +
        String(minutesTotal).padStart(2, '0') + ":" +
        String(secondsTotal).padStart(2, '0');
}

function loop() {
    secondsLeft--;
    secondsTotal++;

    if (convertCountdownUnits())
    {
        convertTotalUnits();
        updateTimers();
    } else {
        clearInterval(timerLoop);
        trigger();
    }
}

function convertCountdownUnits() {
    if (secondsLeft < 0) {
        minutesLeft--;
        if (minutesLeft < 0) {
            return false; //Time ran out
        }
        secondsLeft = 59;
    }

    if (secondsLeft > 59) {
        minutesLeft += Math.floor(secondsLeft / 60);
        secondsLeft = secondsLeft % 60;
    }

    return true;
}

function convertTotalUnits() {
    if (secondsTotal === 60) {
        minutesTotal++;
        if (minutesTotal === 60) {
            hoursTotal++;
            if (hoursTotal === 4) {
                alert("Jeez dude, you've been studying for 4 hours straight. Take a break for a while.");
            }
            minutesTotal = 0
        }
        secondsTotal = 0;
    }
}

function addTime() {
    secondsLeft += secondsInterval;
    minutesLeft += minutesInterval;

    convertCountdownUnits();
    updateTimers();
}

function trigger() {
    alert("n00b");
    secondsLeft = 0;
    minutesLeft = 0;
}

function switchTheme() {
    document.getElementsByTagName("body")[0].classList.toggle("dark");
}

function switchDistractions() {
    document.getElementById("timer-colon").classList.toggle("hidden");
    document.getElementById("timer-minutes-label").classList.toggle("hidden");
    document.getElementById("timer-seconds").classList.toggle("hidden");
    document.getElementById("total-timer").classList.toggle("hidden");
    document.getElementById("theme-button").classList.toggle("hidden");
}