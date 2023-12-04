const gameboard=document.getElementById("game-board")
const ctx = gameboard.getContext("2d");
const resetbtn=document.getElementById("resetbtn")
const scoretext=document.getElementById("score-text")
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground="forestgreen"
const paddle1color="lightblue"
const paddle2color = "red";
const paddleborder="black"
const ballcolor="yellow"
const ballbordercolor = "black"
const ballradius = "12.5"
const paddlespeed = 40;
let intervalid;
let ballspeed = 1;
let ballX = gamewidth / 2;
let ballY = gamewidth / 2;
let ballxdirection = 0;
let ballydirection = 0;
let player1score = 0;
let player2score = 0;

let paddle1 = {
    width: 25,
    height: 100,

    x: 0,
    y: 0
    


};
let paddle2 = {
    width: 25,
    height: 100,

    x: gamewidth - 25,
    y: gameheight - 100
    


};
window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click",resetGame)
startGame();

function startGame() {
    createball();
    nexttick();
}

function nexttick() {
    intervalid=setTimeout(() => {
        clearboard();
        drawpaddle();
        moveball();
        
        drawball(ballX, ballY);
        checkCollision();
        nexttick();
    }, 10);
}
function drawpaddle() {
    ctx.fillStyle = paddle1color;
    ctx.strokeStyle = paddleborder;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
  
    ctx.fillStyle = paddle2color;
    ctx.strokeStyle = paddleborder;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    
}
function clearboard() {
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight);

}
function createball() {
   
    ballspeed = 1;
    if (Math.round(Math.random()) == 1) {
        ballxdirection = 1;
    } else {
        ballxdirection = -1;
    }
    if (Math.round(Math.random()) == 1) {
        ballydirection = 1;
    } else {
        ballydirection = -1;
    }
    ballX = gamewidth / 2;
    ballY = gameheight / 2;
    drawball(ballX, ballY);


}
function drawball(ballx, bally) {

    ctx.strokeStyle = ballbordercolor;
    ctx.fillStyle = ballcolor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballx,bally,ballradius,0,2*Math.PI)
    ctx.stroke();
    ctx.fill();
}
function moveball() { 
     ballX+=(ballspeed*ballxdirection)
     ballY+=(ballspeed*ballydirection)
}
function checkCollision() {
    if (ballY < 0 + ballradius) {
        ballydirection *= -1;
    }
    if (ballY > gameheight - ballradius) {
        ballydirection *= -1;
        
    }
    if (ballX < 0) {
        player2score++;
        updateScore();
        createball();
        return;
    }
    if (ballX > gamewidth) {
        player1score++;
        updateScore();
        createball();
        return;
    }
    if (ballX <= (paddle1.x  + ballradius+25)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            
            ballxdirection *= -1;

            ballspeed++;

        }
    }
    if (ballX >= (paddle2.x  - ballradius)) {
        if (ballY > paddle2.y && ballY <( paddle2.y + paddle2.height)) {
            ballX = paddle2.x - ballradius;
            ballxdirection *= -1;
            ballspeed++;
                
    }
}
}
function changedirection(event) {
    console.log(event.keyCode);
    const keypressed = event.keyCode;
    const paddle1up = 87;
    const paddle1down = 83;
    const paddle2up = 38;
    const paddle2down = 40;
    switch (keypressed) {
        case (paddle1up):
            if (paddle1.y > 0) {
              paddle1.y -= paddlespeed;   
            }
           
            break;
        case (paddle1down):
            if (paddle1.y < gameheight - paddle1.height)
            { paddle1.y += paddlespeed; }
            break;
        case (paddle2up):
            if (paddle2.y > 0) {
            paddle2.y -= paddlespeed;
                
            }
            break;
        case (paddle2down):
            if(paddle2.y<gameheight-paddle2.height)
            {
                paddle2.y += paddlespeed;

            }
            break;
    }
}
function updateScore() {
    scoretext.textContent=`${player1score}:${player2score}`
    
}
function resetGame() {
    
 ballspeed = 1;
 ballX = gamewidth / 2;
 ballY = gamewidth / 2;
 ballxdirection = 0;
 ballydirection = 0;
 player1score = 0;
    player2score = 0;
    paddle1 = {
        width: 25,
        height: 100,
    
        x: 0,
        y: 0
        
    
    
    };
     paddle2 = {
        width: 25,
        height: 100,
    
        x: gamewidth - 25,
        y: gameheight - 100
        
    
    
    };
    updateScore();
    clearInterval(intervalid);
    startGame()
}
