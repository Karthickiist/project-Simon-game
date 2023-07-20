var level=1;
var clickCount=0;
var button_sequence=[];
var buttons=["yellow", "red", "green", "blue"];

$(document).keypress(start);

function start(){
    level=1;
    // clickCount=0;
    button_sequence=[];
    $(document).unbind();
    next_sequence();
    $(".btn").click(clicked);
    
}

function next_sequence(){
    clickCount=0;
    $("h1").text("Level "+level);
    var rand_button=buttons[Math.floor(Math.random()*4)];
    button_sequence.push(rand_button);
    console.log(button_sequence);
    $("."+rand_button).fadeOut("fast").fadeIn("fast");
    makeSound(rand_button);
    level++;

}

function makeSound(class_value){
    switch(class_value){
        case "blue":
            new Audio("./sounds/blue.mp3").play();
            break;
        case "green":
            new Audio("./sounds/green.mp3").play();
            break;
        case "red":
            new Audio("./sounds/red.mp3").play();
            break;
        case "yellow":
            new Audio("./sounds/yellow.mp3").play();
            break;
        default:
            break;
    }
}

function clicked(){
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");
    }, 100);
    var id=$(this).attr("id");
    makeSound(id);
    checker(id);
    
    
}

function checker(id_){
   if(clickCount < level-1){
        if(button_sequence[clickCount] === id_){
            if(clickCount === level-2){
               setTimeout(() => {
                    next_sequence();
               }, 1000);
            }
            else{
                clickCount++;
            }
            
        }else{
            wrong();
        }
   }
}



function wrong(){
    $("body").addClass("game-over");
    new Audio("./sounds/wrong.mp3").play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);
    $(".btn").unbind();

    $("h1").text("Game over! press any key to start again");
    $(document).keypress(start);
}

