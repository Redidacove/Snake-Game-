//constants and variables of game
let inputDir = { x: 0, y: 0 };
const GameSound = new Audio('Gamesound.mp3');
const EatSound = new Audio('Eatsound.mp3');
const GameOverSound = new Audio('gameoversound.mp3');
const crashSound = new Audio('crashsound.mp3');
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArray = [
    { x: 13, y: 15 }
];
food = { x: 10, y: 12 };
    //Game functions
    function main(ctime) {
        GameSound.play();
        window.requestAnimationFrame(main);
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
        score=0;
    }
//for crashing part
    function Iscrash(sarray) {
        //if snake touch itself
        for (let i = 1; i < snakeArray.length; i++) {
            if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
                return true;
            }
        }
        if (snakeArray[0].x >= 18 || snakeArray[0].y >= 18 || snakeArray[0].x <= 0 || snakeArray[0].y <= 0) {
            return true;
            // GameOverSound.play();
            //crashSound.play();
        }

    }
    function gameEngine() {
    //part 1 updating snake location
    if (Iscrash(snakeArray)) {
        GameSound.pause();
        GameOverSound.play();
        crashSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game over\n Press any key to restart");
        snakeArray = [{ x: 13, y: 15 }];
        GameSound.play();
        score = 0;
        return;
    }

    //for snake eating the food and its replacement
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        EatSound.play();
        score += 1;
        scoreBox.innerHTML = "Score:"+score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
        if (score >= 5) {
            speed = 10;
        }
        else if (score >= 10) {
            speed = 14;
        }
        else{
            speed=5;
        }
        //food placement 
        //Move the snake 
        for (let i = snakeArray.length - 2; i >= 0; i--) {
            snakeArray[i + 1] = { ...snakeArray[i] };

        }
            snakeArray[0].x += inputDir.x;
            snakeArray[0].y += inputDir.y;



        //and incrementing the score 
        board.innerHTML = " ";
        // part 2 : display the snake 
        snakeArray.forEach((e, index) => {
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if (index === 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
        });
        //display the food 
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

        //main logic starts here
        let hiscore = localStorage.getItem("Highscore");
        if (hiscore === null) {
            let hiscorevalue = 0;
            let hiscore = localStorage.setItem("Highscore", JSON.stringify(hiscorevalue));
        }
        else {
            hiscorevalue = JSON.parse(hiscore);
            hiscoreBox.innerHTML = "HighScore" + hiscorevalue;
        }
    }


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; //Start the game 
    //movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
