$( document ).ready(function() {
    $("#roll").click(function() {

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    const dice4 = Math.floor(Math.random() * 6) + 1;
    const dice5 = Math.floor(Math.random() * 6) + 1;
    const dice6 = Math.floor(Math.random() * 6) + 1;

    console.log(dice1, dice2, dice3, dice4, dice5, dice6);
   
    $("#dice1").html('<img src="assets/images/dice' + dice1 + '.png">');
    $("#dice2").html('<img src="assets/images/dice' + dice2 + '.png">');
    $("#dice3").html('<img src="assets/images/dice' + dice3 + '.png">');
    $("#dice4").html('<img src="assets/images/dice' + dice4 + '.png">');
    $("#dice5").html('<img src="assets/images/dice' + dice5 + '.png">');
    $("#dice6").html('<img src="assets/images/dice' + dice6 + '.png">');

    const sum = dice1 + dice2 + dice3 + dice4 + dice5 + dice6;

    $("#answer").value = "";
    $("#answer").focus();
})});

function checkAnswer() {

};
function displayResult() {

};
function timer() {

};    