$(document).ready(function () {
  game(); // Start the game when the document is ready
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
});
function game() {
  $("#roll, #dices").click(function () {
    rollDice(); // Call the function to roll the dices
  });
  $(document).keydown(function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault(); 
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
  let dices = []; // Initialize an empty array to store the dices
  // Generate random dices values based on the range input value
  dices = Array.from(
    {
      length: $("#dicesRange").val(),
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
    "violet",
  ];
  let randomColors = []; // Initialize an empty array to store random colors
  // Generate random colors for each dice
  randomColors = Array.from(
    {
      length: dices.length,
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
  const activeColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];
  const activeDices = dices.filter(function (_dice, index) {
    return randomColors[index] === activeColor;
  });
  console.log(
    `Active color: ${activeColor}, Active dices: ${activeDices}`
  );
  $("#question").html(
    `What is the sum of all <strong>${activeColor}</strong> dices?`
  );
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //Randomly assigns color in the question
  $("#question>strong").css("color", randomColor);
  submitAnswer();
  const sum = activeDices.reduce((acc, curr) => acc + curr, 0); // Calculate the sum of active dices
  console.log(`Sum of active dices: ${sum}`);
}  

  // submit answer
  function submitAnswer() {
    $("#submit-button").click(function () {
      validateInput(); // Call the function to validate input
    });
    $("#answer").keydown(function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission on Enter key
        validateInput(); // Call the function to validate input
      }
    });
  }

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
    const activeColor =
      $("#question>strong").text(); // Get the active color from the question
    
    const resultText = `The sum of <span>${activeColor}</span> dices is ${sum}`;
    $("#result-text>span").css("color", activeColor);
    $("#result-text").html(resultText); // Display the result text
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
    console.log(`User answer: ${userAnswer}, Correct answer: ${sum}`);
  }

// Function to update the score
function correctScore() {
  let points = parseInt($("#score").text()) || 0;
  $("#score").text(++points); // Increment the score by 1
  //return points;
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
