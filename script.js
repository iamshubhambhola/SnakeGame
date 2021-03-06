const direction={x: 0,y: 0};
const foodsound=new Audio('music/food.mp3');
const gameoversound=new Audio('music/gameover.mp3');
const movesound=new Audio('music/move.mp3');
const musicsound=new Audio('music/music.mp3');
const board=document.querySelector('.board');
const easy=document.querySelector('#e');
const med=document.querySelector('#m');
const hard=document.querySelector('#h');
const level=document.querySelector('.level');
const text=document.querySelector('.text');
const go=document.querySelector('.go');

easy.addEventListener('click',speede);
med.addEventListener('click',speedm);
hard.addEventListener('click',speedh);

let speed=7;
function speede(){
    speed=4;  
    level.style.display="none";    
    text.style.display="inline";
}
function speedm(){
    speed=6.5;
    level.style.display="none";
    text.style.display="inline";
}
function speedh(){
    speed=8;
    level.style.display="none";
    text.style.display="inline";
}
let inputDir;  
let score=0; 
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
];
let food ={
    x:6, y:7
};
//game fn 
function main(ctime){
    window.requestAnimationFrame(main);
    console.log('ctime');
    //decreasing fps
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if u bump into urself
    for (let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }       
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //updating snakearr n food
    if(isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        //go.style.display="inline";
        //go.style.zIndex="2";
        alert("Game Over. Press any key to play again!");
        location.reload();
        snakeArr=[
            {x:13, y:15}
        ];
        score=0;
    }

    //if u ve eaten the food increment food and regenerate food
    if(snakeArr[0].y===food.y && snakeArr[0].x=== food.x){
        foodsound.play();
        score++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score : " + hiscoreval;
        }
        if(score>1){
            speed+=1;
        }
        if(score>5){
            speed+=0.4;
        }
        if(score>9){
            speed+=0.4;
        }
        if(score>14){
            speed+=0.4;
        }
        if(score>18){
            speed+=0.4;
        }
        if(score>22){
            speed+=0.4;
        }
        if(score>25){
            speed+=0.4;
        }
        if(score>30){
            speed+=0.4;
        }
        if(score>35){
            speed+=0.7;
        }
        scoreBox.innerHTML= "Score : "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food= {x: Math.round(a+ (b-a)* Math.random()),y: Math.round(a+ (b-a)* Math.random())};
    }

    //moving snake
    for (let i = snakeArr.length-2; i >= 0 ; i--){
        
        snakeArr[i+1]= {...snakeArr[i]};
       
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
}


//logic
musicsound.play();
let hiscoreval;
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir= {x:0,y:1}//start game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            inputDir.x=0;
            inputDir.y=-1; 
            break;

        case "ArrowDown":
            console.log("down");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
    
        case "ArrowRight":
            console.log("right");
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }
});