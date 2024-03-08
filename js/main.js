// In any game, one of the important thing in the game is that the 'game-loop', so when we are playing 
// the game, then , our screen is painted repeatedly, screen ko baar baar paint kara jata h , and this
// is done by game-loop.
// So game loop is an important component of the game, and we are using the game loop,
// So we are using requestAnimationFrame, the benefits of using this is :there is bo flicker, and it tell
// javascript engine , what we want to achieve, more clearly.
// On the othe hand, set-interval 
// -------------------------------------------------------------------
// Game constants and variable
let inputDir = {x: 0,y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound  = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

// Food is in the array
food = {x: 6, y: 7};

// The main Component in any game is the game loop:

// // Game Functions-------------------------------------------------------------------
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
  
    // console.log(ctime);'/
}

function isCollide(snake) {
    // If the snake collide with itself:
    for(let i = 1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
              return true;
        }
    }
    // If the snake collide with wall:
     if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & food 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over!; Press any key to play again!");
        snakeArr = [{x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
// If you have eaten the food, increment the score and regenerate the food

      if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
             
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}

      }
    //   Making the snake:
    for(let i = snakeArr.length - 2 ; i>=0; i--){
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};

     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and food
    // Display the snake:
    // console.log("Hello");
       board.innerHTML = "";
       snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); 
       });
    // Display the food:

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        // console.log('snake');
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement); 
        
    }

// Main logic starts here:
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "HiScore:"+ hiscore;
// }
// -----------------------------------------------------------------------------------
musicSound.play();
let hiscore = localStorage.getItem("hiscore");

if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

// Assume currentScore is the variable holding the current score obtained in the game






// ----------------------------------------------------------------------------------
window.requestAnimationFrame(main);
window.addEventListener('keydown' ,e =>{
    // console.log("Hello");
    // Start the game:
   inputDir = {x: 0, y: 1}   
   moveSound.play();
   switch (e.key){
    // Here we  are chnaging the input direction of x and y;in snake game, it will either in x-direction,
    // or in y-direction.
       case "ArrowUp":
          console.log("ArrowUp");
          inputDir.x = 0;
          inputDir.y = -1 ;
          break;

       case "ArrowDown":
          console.log("ArrowDown");
          inputDir.x = 0 ;
          inputDir.y = 1  ;
          break;

       case "ArrowLeft":
          console.log("ArrowLeft");
          inputDir.x = -1;
          inputDir.y = 0;
          break;

       case "ArrowRight":
        console.log("ArrowRight");
           inputDir.x = 1 ;
           inputDir.y = 0 ;
            break;
        default:
            break;
   }

});
