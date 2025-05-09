$(document).ready(function () {
    $("#roll").click(function () {
        rollDice();
    });

});
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    const dice4 = Math.floor(Math.random() * 6) + 1;
    const dice5 = Math.floor(Math.random() * 6) + 1;
    const dice6 = Math.floor(Math.random() * 6) + 1;
    //test
    console.log(dice1, dice2, dice3, dice4, dice5, dice6);

    $("#dice1").html('<img src="assets/images/dice' + dice1 + '.png">');
    $("#dice2").html('<img src="assets/images/dice' + dice2 + '.png">');
    $("#dice3").html('<img src="assets/images/dice' + dice3 + '.png">');
    $("#dice4").html('<img src="assets/images/dice' + dice4 + '.png">');
    $("#dice5").html('<img src="assets/images/dice' + dice5 + '.png">');
    $("#dice6").html('<img src="assets/images/dice' + dice6 + '.png">');

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
