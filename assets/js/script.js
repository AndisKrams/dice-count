$(document).ready(function () {
  // Timer display
  $("#seconds").text($("#timerRange").val());
  $("#timerRange").on("input", function () {
    $("#seconds").text($("#timerRange").val());
  });

  //dices range
  $("#total-dices").text($("#dicesRange").val());
  $("#dicesRange").on("input", function () {
    $("#total-dices").text($(this).val());
  });
  $("#input").hide(); // Hide the input field initially
  start(); // Start the game by listening for keydown events
});
function start() {
  $("#roll").show(); // Show the roll button
  $("#roll, #dices").on("click", rollDice);
  $(document).on("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault(); // Prevent default action for spacebar
      rollDice(); // Call the function to roll the dices
    }
  });
}

// Function to roll the dices and display results
function rollDice() {
  let dices = []; // Array to hold the random dice values
  let randomColors = []; // Array to hold the random colors for each dice
  let activeColor = ""; // Variable to hold the active color of the dices
  let activeDices = []; // Array to hold the active dices based on the active color
  let questionColor = ""; // Variable to hold the color used in the question
  let sum = 0; // Variable to hold the sum of active dices

  // Remove the event listeners
  $("#roll, #dices").off("click");
  $(document).off("keydown");
  $("#input").show(); // Show the input field
  $("#result-text").empty();
  $("#answer").focus().val(""); // Clear the input field

  // Generate random dices values based on the range input value
  let totalDices = parseInt($("#dicesRange").val()); // Get the number of dices from the range input
  for (let i = 0; i < totalDices; i++) {
    // Generate a random number between 1 and 6 for each dice
    let randomDice = Math.floor(Math.random() * 6) + 1;
    dices.push(randomDice); // Add the random dice value to the array
  }
  //dices html
  $("#dices").empty();
  dices.forEach(function (_dice, index) {
    // Create a new div element for each dice
    const diceElement = $(`<div class="dice" id="dice${index + 1}"></div>`);
    $("#dices").append(diceElement);
  });

  //randomize colors
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "white",
    "orange",
    "violet"
  ];
  // Generate random colors for each dice
  for (let i = 0; i < totalDices; i++) {
    // Generate a random color from the colors array
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    randomColors.push(randomColor); // Add the random color to the array
  }
  //randomize dices display
  randomColors.forEach((randomColor, index) => {
    let dice = dices[index];
    $(`#dice${index + 1}`).html('<span class="pip"></span>'.repeat(dice));
    $(`#dice${index + 1}`).css("background-color", randomColor);
  });
  //actve colour
  activeColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];
  activeDices = dices.filter(function (_dice, index) {
    return randomColors[index] === activeColor;
  });
  questionColor = colors[Math.floor(Math.random() * colors.length)];
  //console.log(`Active color: ${activeColor}, Active dices: ${activeDices}`);
  $("#question").html(
    `What is the sum of all <strong>${activeColor}</strong> dices?`
  );
  //Randomly assigns color in the question
  $("#question>strong").css("color", questionColor);
  sum = activeDices.reduce((acc, curr) => acc + curr, 0); // Calculate the sum of active dices

  answer();
  function answer() {
    $("#submit-button").on("click", function (e) {
      e.preventDefault(); // Prevent default form submission
      validateInput();
    });
    $("#answer").on("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission on Enter key
        validateInput();
      }
    });
  }
  function validateInput() {
    let input = $("#answer").val();
    if (input === "" || Number.isNaN(input) || parseInt(input) <= 0) {
      $("#result-text").text("Please enter a valid number.");
      $("#answer").val("");
    } else {
      checkAnswer(); // Call the function to check the answer
      eventOff();
    }
  }
  function eventOff() {
    $("#submit-button").off("click");
    $("#answer").off("keydown");
  }

  // Function to check the user's answer
  function checkAnswer() {
    // Remove the event listeners
    $("#roll, #dices").off("click");
    $("#result-text").empty(); // Clear the result text
    let userAnswer = parseInt($("#answer").val()); // Get the user's answer from the input field
    console.log(`Sum of active dices: ${sum}, active color:${activeColor}`);
    const resultText = `The sum of <span>${activeColor}</span> dices is ${sum}`;
    if (userAnswer === sum) {
      $("#input").hide(); // Hide the input field
      $("#result-text").html(`Correct! ${resultText}`);
      $("#result-text>span").css("color", activeColor);
      updateScore("correct"); // Update the correct score
      $("#question").text("Roll the dices to start again.");
      console.log(`User answer: ${userAnswer}, Correct answer: ${sum}`);
      return start();
    } else {
      $("#input").hide();
      $("#result-text").html(`Incorrect! ${resultText}`);
      $("#result-text>span").css("color", activeColor);
      updateScore("incorrect");
      $("#question").text("Roll the dices to start again.");
      console.log(`User answer: ${userAnswer}, Correct answer: ${sum}`);
      return start();
    }
  }
}
// Functions to update the score
function updateScore(type) {
  let score = parseInt($(`#${type} span`).text()) || 0;
  score += 1; // Increment the score by 1
  $(`#${type} span`).text(score); // Update the score display
}
let correct = 0;
const correctSpan = $("#correct span");
if (correctSpan.length && !isNaN(parseInt(correctSpan.text()))) {
  correct = parseInt(correctSpan.text());
}
let incorrect = 0;
const incorrectSpan = $("#incorrect span");
if (incorrectSpan.length && !isNaN(parseInt(incorrectSpan.text()))) {
  incorrect = parseInt(incorrectSpan.text());
}
/*function timer() {
  let timeLeft = $("#timerRange").val(); // Set the timer duration in seconds
  const timerElement = $("#seconds");
  timerElement.text(timeLeft);
  $("#timerRange").on("input", function () {
    timeLeft = $(this).val();
    timerElement.text(timeLeft);
  });

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
}*/