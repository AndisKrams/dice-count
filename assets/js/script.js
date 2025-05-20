$(document).ready(function () {
    $("#roll, #dices").click(function () {
        rollDice();
    });
    $(document).keypress(function (e) {
        if (e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            rollDice();
        }
    });
    rollDice();
});

function rollDice() {
    let dices = Array.from({
        length: 30
    }, () => Math.floor(Math.random() * 6) + 1);

    //dices html

    dicesContainer = $("#dices");
    dicesContainer.empty();
    dices.forEach((_dice, index) => {
        length = dices.length;
        // Create a new div element for each dice
        const diceElement = $(`<div class="dice" id="dice${index + 1}"></div>`);
        dicesContainer.append(diceElement);
    });
    //randomize color

    const colors = ["red", "green", "blue", "yellow", "white", "orange", "violet"];
    let randomColors = Array.from({
        length: dices.length,
    }, () => colors[Math.floor(Math.random() * colors.length)]);

    //randomize dices
    randomColors.forEach((randomColor, index) => {
        const dice = dices[index];
        $(`#dice${index + 1}`).html(`<span class="pip"></span>`.repeat(dice));
        $(`#dice${index + 1}`).css("background-color", randomColor);
    });
    //actve colour
    const activeColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    const activeDices = dices.filter((_dice, index) => randomColors[index] === activeColor);
    const sum = activeDices.reduce((acc, dice) => acc + dice, 0);

    $("#question").html(`What is the sum of all <strong>${activeColor}</strong> dices?`);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    //Randomly assigns color in the question
    $("#question>strong").css("color", randomColor);

    console.log("Active Color: " + activeColor);
    console.log("Active Dices: " + activeDices);

    const userAnswer = parseInt($("#answer").val());
    console.log("User answer: " + userAnswer);
    console.log(dices);
    console.log(randomColors);
    console.log("Sum: " + sum);

    $("#submit-button").click(function () {
        checkAnswer();
    });

    $("#answer").keydown(function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    function checkAnswer() {
        const userAnswer = parseInt($("#answer").val());
        if (userAnswer === sum) {
            $("#result-text").html(`Correct! The sum of <span>${activeColor}</span> dices is ${sum}`);
        } else {
            $("#result-text").html(`Incorrect! The sum of <span>${activeColor}</span> dices is ${sum}`);
        }
        $("#result-text>span").css("color", activeColor);
        console.log("User answer: " + userAnswer);
    }

    $("#answer").val = "";
    $("#answer").focus();
}


/*
function timer() */