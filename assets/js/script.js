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
console.log(dices);
    const [dice1, dice2, dice3, dice4, dice5, dice6] = dices;

    //test
    console.log(dice1, dice2, dice3, dice4, dice5, dice6);
    
    dices.forEach((dice, index) => {
        $(`#dice${index + 1}`).html(`<img src="assets/images/dice${dice}.png">`);
    });

    const sum = dice1 + dice2 + dice3 + dice4 + dice5 + dice6;
    const userAnswer = parseInt($("#answer").val());

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
