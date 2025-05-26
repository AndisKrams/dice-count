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
    rollDice(); // Initial roll on page load

    //dices range
    $("#slider-value").text($("#dicesRange").val());
    $("#dicesRange").on("input", function () {
        $("#slider-value").text($(this).val());
    });

});
// Function to roll the dices and display results
function rollDice() {
    $("#input").show(); // Show the input field

    let dices = Array.from({
        length: $("#dicesRange").val()
    }, () => Math.floor(Math.random() * 6) + 1);
    // Clear previous result text and input field
    $("#result-text").empty();
    $("#answer").val("");
    $("#answer").focus();
    //$("#input").show();

    //dices html

    ($("#dices")).empty();
    dices.forEach((_dice, index) => {
        // Create a new div element for each dice
        const diceElement = $(`<div class="dice" id="dice${index + 1}"></div>`);
        ($("#dices")).append(diceElement);
    });

    //randomize colors
    const colors = ["red", "green", "blue", "yellow", "white", "orange", "violet"];
    let randomColors = Array.from({
        length: dices.length
    }, () => colors[Math.floor(Math.random() * colors.length)]);

    //randomize dices
    randomColors.forEach((randomColor, index) => {
        const dice = dices[index];
        $(`#dice${index + 1}`).html('<span class="pip"></span>'.repeat(dice));
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
    // Result text
    const resultText = `The sum of <span>${activeColor}</span> dices is ${sum}`;
    function checkAnswer() {
        const userAnswer = parseInt($("#answer").val());
        // Incorrect input
        if (Number.isNaN(userAnswer)) {
            $("#result-text").html("Please enter a valid number.");
            return;
        }
        else if (userAnswer < 0) {
            $("#result-text").html("Please enter a positive number.");
            return;
        }
        else if (userAnswer === "") {
            $("#result-text").html("Please enter a number.");
            return;
        }
        // Evaluate the answer
        else if (userAnswer === sum) {
            $("#result-text").html(`Correct! ${resultText}`);
        } else {
            $("#result-text").html(`Incorrect! ${resultText}`);
        }
        $("#result-text>span").css("color", activeColor);

        console.log("User answer: " + userAnswer);

    }
    timer(); // Start the timer after rolling the dice


}

function timer() {
    let timeLeft = 2; // Set the timer duration in seconds
    const timerElement = $("#timer");
    timerElement.text(timeLeft);

    const interval = setInterval(() => {
        timeLeft--;
        timerElement.text(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(interval);
            $("#result-text").html("Time's up! Please try again.");
            $("#input").hide(); //Prevent input after time is up
            $("#question").text("Roll the dices to start again.");

        }
    }, 1000);

}