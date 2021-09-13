
var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red" , "blue" ,"green" , "yellow"];

var start=false;
var level=0;


$(document).keydown(function () {
    
    if(!start){
        $("#level-title").html("Level "+ level);
        nextSequence();
        start=true;
    }
    
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push( userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
         console.log("success");
         console.log("game: ",gamePattern);
         console.log("user",userClickedPattern);

         if(userClickedPattern.length===gamePattern.length)
            setTimeout(function() {
                nextSequence();
            }, 1000);
            
        }
    else {
        console.log("wronng");     
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over"); 
        setTimeout(function() {
            $("body").removeClass("game-over"); 
        }, 200);
        
        startOver();
    }    
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}

function nextSequence(){
    level++;
    $("#level-title").html("Level " + level);

    userClickedPattern=[];

    var x= Math.floor(Math.random()*4);
        
    var randomChosenColour = buttonColours[x];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    $("h1").text("Level "+ level);
    

}

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){

        $("#"+currentColour).removeClass("pressed");

    }, 100); 
}