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
  // Hide input field initially
  $("#input").hide();
  game(); // Call the game function to start the game
});
function game() {
  $("#roll, #dices").click(rollDice); // Reattach the click event listener to roll the dices
  $(document).keydown(function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault(); // Prevent default action for spacebar
      rollDice(); // Call the function to roll the dices
    }
  });
}

// Function to roll the dices and display results
function rollDice() {
  // Remove the event listeners
  $("#roll, #dices").off("click");
  $(document).off("keydown");
  $("#input").show(); // Show the input field
  $("#result-text").empty();
  $("#answer").focus().val(""); // Clear the input field
  $("#submit-button").click(checkAnswer); // Attach click event to the submit button

  // Generate random dices values based on the range input value
  let dices = Array.from(
    {
      length: $("#dicesRange").val()
    },
    () => Math.floor(Math.random() * 6) + 1
  );

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
  let randomColors = Array.from(
    {
      length: dices.length
    },
    () => colors[Math.floor(Math.random() * colors.length)]
  );
  //randomize dices
  randomColors.forEach((randomColor, index) => {
    let dice = dices[index];
    $(`#dice${index + 1}`).html('<span class="pip"></span>'.repeat(dice));
    $(`#dice${index + 1}`).css("background-color", randomColor);
  });
  //actve colour
  let activeColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];
  let activeDices = dices.filter(function (_dice, index) {
    return randomColors[index] === activeColor;
  });
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  //console.log(`Active color: ${activeColor}, Active dices: ${activeDices}`);
  $("#question").html(
    `What is the sum of all <strong>${activeColor}</strong> dices?`
  );
  //Randomly assigns color in the question
  $("#question>strong").css("color", randomColor);

  $("#submit-button").click(checkAnswer); // Attach click event to the submit button
  $("#answer").keydown(function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key
      checkAnswer(activeColor, activeDices); // Call the function to validate input
    }
  });
}
// Function to check the user's answer
function checkAnswer(actColor, actDices) {
  let input = $("#answer").val();
  let userAnswer = parseInt($("#answer").val()); // Get the user's answer from the input field
  let sum = actDices.reduce((acc, curr) => acc + curr, 0); // Calculate the sum of active dices
  //console.log(`Sum of active dices: ${sum}, active color:${actColor}`); 
  let correct = userAnswer === sum; // Check if the user answer is correct
  const resultText = `The sum of <span>${actColor}</span> dices is ${sum}`;

  if (correct) {
    $("#result-text").html(`Correct! ${resultText}`);
    $("#input").hide();
    correctScore(); // Call the function to update the score
    $("#question").text("Roll the dices to start again.");
  } else if (input === "" || isNaN(input) || userAnswer <= 0) {
    $("#result-text").text("Please enter a valid number.");
  } else {
    $("#result-text").html(`Incorrect! ${resultText}`);
    $("#input").hide(); // Hide the input field after incorrect answer
    $("#question").text("Roll the dices to start again.");
  }
  $("#result-text>span").css("color", actColor);
  console.log(`User answer: ${userAnswer}, Correct answer: ${sum}`);
  game(); 
}

// Function to update the score
function correctScore() {
  let points = parseInt($("#score").text()) || 0;
  points += 1; // Increment the score by 1
  $("#score").text(points); // Update the score display
}

/* Function to start the timer
function timer() {
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
