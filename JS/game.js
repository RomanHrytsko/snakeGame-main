const canvas = document.getElementById("game");
let buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', direction)
});
//2d game
const ctx = canvas.getContext("2d");

//ground image
const ground = new Image();
ground.src = "../img/field.png";
//carroit image
const carrot = new Image();
carrot.src = "../img/food.png";

//field box size
let box = 32;

//score when snake eat carrot
let score = 0;

//random food location
let foodLocation = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

//Snake start location
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

//document event which react on keydown;
document.addEventListener("keydown", direction);

//snake direction;
let dir;

//Choose snake direction
function direction(event) {

  if ((event.keyCode == 37 || event.target.value == 'left') && dir != "right") {
    dir = "left";
  } else if ((event.keyCode == 38 || event.target.value == 'up') && dir != "down") {
    dir = "up";
  } else if ((event.keyCode == 39 || event.target.value == 'right') && dir != "left") {
    dir = "right";
  } else if ((event.keyCode == 40 || event.target.value == 'down') && dir != "up") {
    dir = "down";
  }
}

//Game stop when snake eat own tail
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
    }
  }
}

//function whick give UI of elements on canvas
function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(carrot, foodLocation.x, foodLocation.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == foodLocation.x && snakeY == foodLocation.y) {
    score++;

    foodLocation = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(game);
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  // if snake eat food unshift to snake arr new part of snake
  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
