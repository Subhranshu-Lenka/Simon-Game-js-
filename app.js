btnColor = ['green', 'red', 'yellow', 'blue'];
gamePattern = []
userPattern = []

// audio file objects
var red = new Audio("sounds/red.mp3");
var green = new Audio("sounds/green.mp3");
var blue = new Audio("sounds/blue.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");

//the order of aud should be identical to btnColor.
aud = [green, red, yellow, blue, wrong];


// new play
let started = false;
let level = 1;
$(document).keydown(function () {
    if (!started) {
        $("h1").text(`Level: ${level}`);
        nextSequence();
        started = true;
    }
})


// next pattern
function nextSequence() {
    randnNum = Math.floor(Math.random() * 4);
    randomChosenColor = btnColor[randnNum];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).delay(100).fadeOut().fadeIn('slow');
    // aud[randnNum].play();
    playSound(randomChosenColor);
}

// sounds
function playSound(color) {
    switch (color) {
        case "green": green.play();
            break;
        case "red": red.play();
            break;
        case "yellow": yellow.play();
            break;
        case "blue": blue.play();
            break;
        default: wrong.play();
            break;

    }
}



// event listener
$(".btn").click(function () {
    let userClickedColor = $(this).attr("id");
    userPattern.push(userClickedColor);
    // aud[Number($(this).attr("s.no"))].play()
    $(this).fadeOut().fadeIn("fast");
    playSound(userClickedColor);
    // console.log(userClickedColor);

    checkAnswer(userPattern.length - 1);
});


function checkAnswer(currLevel) {
    if (gamePattern[currLevel] === userPattern[currLevel]) {
        console.log("correct guess!");

        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            while (userPattern.length) { userPattern.pop(); }
            level++;
            $("h1").text(`Level: ${level}`);



        }
    }
    else {
        console.log("Wrong guess");
        setTimeout(wrong.play(), 1000);
        gameOver();

    }
}


function gameOver() {

    $("h1").html("G A M E O V E R ! <br> Press any key to restart.");
    while (userPattern.length) { userPattern.pop(); }
    while (gamePattern.length) { gamePattern.pop(); }
    level = 1;
    started = false;
}
