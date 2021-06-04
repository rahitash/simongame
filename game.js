//Array containing the button colors

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function() {

  if(!started) {
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }

});



$(".btn").click(function () {

  //Detecting the ID of the button which is clicked
  var userChosenColor = $(this).attr("id");

  //Adding the clicked button to the Array
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  amimatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);

  console.log(userClickedPattern);

});




function nextSequence() {

  //Generating a random number and getting the button color value

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  //Adding the generated color to the gamePattern array

  gamePattern.push(randomChosenColor);

  //Flashing the button which is randomly chosen

  var buttonPressed = $("#"+randomChosenColor);
  buttonPressed.fadeIn(100).fadeOut(100).fadeIn(100);

  //Playing the audio for randomly chosen number

  playSound(randomChosenColor);

  level++;
  $("h1").text("Level "+level);

  console.log(randomNumber);
}

//Plays the sound

function playSound(name) {
  var audioFile = new Audio("sounds/"+name+".mp3");
  audioFile.play();
}

//Animates the button when pressed

function amimatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout(function () {
  $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

    console.log("wrong");
  }

}

function startOver() {

  gamePattern = [];

  userClickedPattern = [];

  level = 0;

  started = false;
}
