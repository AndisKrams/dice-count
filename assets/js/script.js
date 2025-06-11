$(document).ready(function () {
  //dice range
  $("#total-dices").text($("#dicesRange").val());
  $("#dicesRange").on("input", function () {
    $("#total-dices").text($(this).val());
  });
  $("#score").hide();
  $("#input").hide(); // Hide the input field initially
  start(); // Start the game by listening for keydown events
});
function start() {
  // Show the roll button
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
  $("h1").hide();
  $("#score").show();
  $("#play").hide();
  $("#dices-slider").hide();
  // Remove the event listeners
  $("#roll, #dices").off("click");
  $(document).off("keydown");
  $("#input").show(); // Show the input field
  $("#answer").focus().val(""); // Clear the input field
  $("#result-text").empty();
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
    if (randomColor === "blue") {
      randomColor = "lightskyblue";
    }
    $(`#dice${index + 1}`).css("background-color", randomColor);
  });
  //actve colour
  activeColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];
  activeDices = dices.filter(function (_dice, index) {
    return randomColors[index] === activeColor;
  });
  $("#question").html(
    `What is the sum of all <strong>${activeColor}</strong> dice?`
  );
  //Randomly assigns color in the question
  questionColor = colors[Math.floor(Math.random() * colors.length)];
  if (questionColor === "blue") {
    questionColor = "lightskyblue";
  }
  $("#question>strong").css("color", questionColor);
  sum = activeDices.reduce((acc, curr) => acc + curr, 0); // Calculate the sum of active dices
  // Input answer
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
    $("#play").show();
    $("#input").hide(); // Hide the input field
    $("#dices-slider").show();
    if (questionColor === "blue") {
      questionColor = "lightskyblue";
    }
    $("#total-dices").css("color", questionColor);
    let userAnswer = parseInt($("#answer").val()); // Get the user's answer from the input field
    const resultText = `The sum of <span>${activeColor}</span> dice is ${sum}`;
    if (userAnswer === sum) {
      $("#result-text").html(`Correct! ${resultText}`);
      if (activeColor === "blue") {
        activeColor = "lightskyblue";
      }
      $("#result-text>span").css("color", activeColor);
      updateScore("correct"); // Update the correct score
      $("#question").text("Roll the dice to start again.");
      return start();
    } else {
      $("#result-text").html(`Incorrect! ${resultText}`);
      if (activeColor === "blue") {
        activeColor = "lightskyblue";
      }
      $("#result-text>span").css("color", activeColor);
      updateScore("incorrect");
      $("#question").text("Roll the dice to start again.");
      return start();
    }
  }
}
// Functions to update the score
function updateScore(type) {
  if (type !== "correct" && type !== "incorrect") {
    console.error(`Invalid type: ${type}. Expected "correct" or "incorrect".`);
    return;
  }
  let score = parseInt($(`#${type} span`).text()) || 0;
  score += 1; // Increment the score by 1
  $(`#${type} span`).text(score); // Update the score display
}