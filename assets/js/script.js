$(document).ready(function () {
  game(); // Start the game when the document is ready
  // Timer display
  $("#seconds").text($("#timerRange").val());
  $("#timerRange").on("input", function () {
    $("#seconds").text($(this).val());
  });

  //dices range
  $("#total-dices").text($("#dicesRange").val());
  $("#dicesRange").on("input", function () {
    $("#total-dices").text($(this).val());
  });
  // Hide input field initially
  $("#input").hide();
});
function game() {
  $("#roll, #dices").click(function () {
    rollDice(); // Call the function to roll the dices
  });
  $(document).keypress(function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault(); // Prevent default action for space key
      rollDice();
    }
  });
}

// Function to roll the dices and display results
function rollDice() {
  // Remove the event listeners
  $("#roll, #dices").off("click");
  $(document).off("keypress");
  $("#input").show(); // Show the input field

  let dices = Array.from(
    {
      length: $("#dicesRange").val(),
    },
    () => Math.floor(Math.random() * 6) + 1
  );
  // Clear previous result text and input field
  $("#result-text").empty();
  $("#answer").focus().val(""); // Clear the input field

  //dices html

  $("#dices").empty();
  dices.forEach((_dice, index) => {
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
    "violet",
  ];
  let randomColors = Array.from(
    {
      length: dices.length,
    },
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  //randomize dices
  randomColors.forEach((randomColor, index) => {
    const dice = dices[index];
    $(`#dice${index + 1}`).html('<span class="pip"></span>'.repeat(dice));
    $(`#dice${index + 1}`).css("background-color", randomColor);
  });
  //actve colour
  const activeColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];
  const activeDices = dices.filter(
    (_dice, index) => {
          return randomColors[index] === activeColor;
      }
  );
  let sum = activeDices.reduce((acc, dice) => acc + dice, 0);
  $("#question").html(
    `What is the sum of all <strong>${activeColor}</strong> dices?`
  );
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //Randomly assigns color in the question
  $("#question>strong").css("color", randomColor);

  /*console.log("Active Color: " + activeColor);
      console.log("Active Dices: " + activeDices);
      console.log(dices);
      console.log(randomColors);
      console.log("Sum: " + sum);*/

  // submit answer
  function submitAnswer() {
    $("#submit-button").click(function () {
      validateInput(); // Call the function to validate input
    });
    $("#answer").keypress(function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission on Enter key
        validateInput(); // Call the function to validate input
      }
    });
  }
  submitAnswer();

  function validateInput() {
    const input = $("#answer").val();
    if (input === "" || isNaN(input) || parseInt(input) <= 0) {
      $("#result-text").text("Please enter a valid number.");
      return false;
    } else {
      checkAnswer(); // Call the function to check the answer
    }
  }
  function checkAnswer() {
    const resultText = `The sum of <span>${activeColor}</span> dices is ${sum}`;
    let userAnswer = parseInt($("#answer").val()); // Get the user's answer from the input field
    let correct = userAnswer === sum; // Check if the user answer is correct
    if (correct) {
      $("#result-text").html(`Correct! ${resultText}`);
      $("#input").hide();
      correctScore(); // Call the function to update the score
      $("#question").text("Roll the dices to start again.");
      game(); // Restart the game
    } else {
      $("#result-text").html(`Incorrect! ${resultText}`);
      $("#input").hide(); // Hide the input field after incorrect answer
      $("#question").text("Roll the dices to start again.");
      game();
    }
    $("#result-text>span").css("color", activeColor);

    console.log("User answer: " + userAnswer);
  }

  //timer(); // Start the timer after rolling the dice
}

// Function to update the score
function correctScore() {
  let points = parseInt($("#score").text()) || 0;
  $("#score").text(++points); // Increment the score by 1
  console.log("Score: " + points); // Log the score to the console
}

// Function to start the timer
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
}
