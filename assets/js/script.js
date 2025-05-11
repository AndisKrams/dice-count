$(document).ready(function () {
    $("#roll").click(function () {
        rollDice();
    });
    rollDice();
});
function rollDice() {
    let dices = Array.from({
        length: 6
    }, () => Math.floor(Math.random() * 6) + 1);

    //test
    console.log(dices);
    //randomize color

    const colors = ["red", "green", "blue", "yellow", "white", "orange", "violet"];
    let randomColors = Array.from({
        length: 6
    }, () => colors[Math.floor(Math.random() * colors.length)]);

    console.log(randomColors);

    randomColors.forEach((randomColor, index) => {
        const dice = dices[index];
        $(`#dice${index + 1}`).html(`<img src="assets/images/${randomColor}${dice}.png">`);
    });



    const userAnswer = parseInt($("#answer").val());
    let sum = 0
    dices.map(e => sum += e)

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
