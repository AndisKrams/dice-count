$(document).ready(function () {
    $("#roll").click(function () {
        rollDice();
    });
    rollDice();
});
function rollDice() {
    let dices = Array.from({
        length: 30
    }, () => Math.floor(Math.random() * 6) + 1);

    //randomize color

    const colors = ["red", "green", "blue", "yellow", "white", "orange", "violet"];
    let randomColors = Array.from({
        length: 30
    }, () => colors[Math.floor(Math.random() * colors.length)]);

    //randomize dices
    randomColors.forEach((randomColor, index) => {
        const dice = dices[index];
        $(`#dice${index + 1}`).html(`<img src="assets/images/${randomColor}${dice}.png">`);
    });
    //actve colour
    const activeColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    const activeDices = dices.filter((dice, index) => randomColors[index] === activeColor);
    const sum = activeDices.reduce((acc, dice) => acc + dice, 0);

    $("#question").html(`What is the sum of all ${activeColor} dices?`);
    $("#question").css("color", activeColor);

    console.log("Active Color: " + activeColor);
    console.log("Active Dices: " + activeDices);

    const userAnswer = parseInt($("#answer").val());


    //let sum = 0
    //dices.map(e => sum += e)
    //test
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
            $("#result-text").html("Correct! The sum is " + sum);
        } else {
            $("#result-text").html("Incorrect! The sum is " + sum);
        }
        console.log("User answer: " + userAnswer);
    }

    $("#answer").val = "";
    $("#answer").focus();
}


/*
function timer() */
