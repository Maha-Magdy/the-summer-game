//predefined variables
var character = localStorage["chosenCharacter"];
let score = 0;
let scoreEl = document.querySelector(".score");
let life = 3;
let lifeEl = document.querySelector(".hearts-container");
let gameOverStatus = false;
// countDownTime => 3 minutes multiply by 60 to convert minutes to seconds.
let countDownTime = 3 * 60,
  countDownEl = document.querySelector(".countDown"),
  timerId;
// This variable will be using to make the cars move faster after each player pass
let speedConstant = 100;

// Enemies our player must avoid
var Enemy = function (x, y, speed, car, platform) {
  // Variables applied to each of our instances go here,
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.platform = platform;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = `images/game-board-elements/${car}.gif`;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if (this.x >= 675) {
    this.x = 0;
    this.speed = Math.random() * speedConstant + speedConstant;
    this.sprite = `images/game-board-elements/car-${Math.round(
      Math.random() * 2
    )}.gif`;
  }
  this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 190, 116);
};

// checks an enemy's collision with player
Enemy.prototype.checkCollision = function () {
  if (
    this.platform === 1 &&
    player.dx >= this.x &&
    player.dx <= this.x + 190 &&
    player.dy <= this.y - 50 &&
    player.dy >= this.y - 135
  ) {
    handleLoseLife();
  }

  if (
    this.platform === 2 &&
    player.dx >= this.x &&
    player.dx <= this.x + 190 &&
    player.dy <= this.y - 50 &&
    player.dy >= this.y - 135
  ) {
    handleLoseLife();
  }

  if (
    this.platform === 3 &&
    player.dx >= this.x &&
    player.dx <= this.x + 190 &&
    player.dy <= this.y - 50 &&
    player.dy >= this.y - 135
  ) {
    handleLoseLife();
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (sx, sy = 0, dx, dy, speed, character) {
  this.sx = sx;
  this.sy = sy;
  this.dx = dx;
  this.dy = dy;
  this.speed = speed;
  this.sprite = `images/game-board-elements/${character}.png`;
};

// Update method for Player
Player.prototype.update = function () {};

// renders the player
Player.prototype.render = function () {
  // console.log("dy is, ", this.dy); => 20
  // console.log("dy is, ", (this.dy - this.speed + 578) % 578); => 548
  ctx.drawImage(
    Resources.get(this.sprite),
    this.sx,
    this.sy,
    120,
    400,
    this.dx,
    this.dy,
    60,
    200
  );
};

/*
 * resets the player to default position
 */
Player.prototype.reset = function () {
  this.sx = 385;
  this.dx = 312.5;
  this.dy = 370;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

/*
 * handles input for the player
 */
Player.prototype.handleInput = function (key) {
  switch (key) {
    case "left":
      this.sx = 15;
      this.dx = (this.dx - this.speed + 675) % 675;
      break;
    case "right":
      this.sx = 135;
      this.dx = (this.dx + this.speed) % 675;
      break;
    case "up":
      this.sx = 385;
      this.dy = (this.dy - this.speed + 578) % 578;
      if (this.dy === 20) {
        successPass();
      }
      if (this.dy > 370) {
        this.dy = 370;
      }
      break;
    case "down":
      this.sx = 255;
      this.dy = (this.dy + this.speed) % 578;
      if (this.dy > 370) {
        this.dy = 370;
      }
  }

  // x axis wrap
  if (this.dx > 625) {
    this.dx = 625;
  }
};

// Now instantiate our objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(385, 0, 312.5, 550, 50, character);
gameReset(); // setup defaults

/*
 * resets the game
 */
function gameReset() {
  life = 3;
  handleLifeDisplay();
  score = 0;
  scoreEl.textContent = `00`;
  countDownTime = 3 * 60;
  /* This setInterval which allow having a countdown timer
   * and when there is no time left, it will stop the setInterval by
   its id using clearInterval
   */
  timerId = setInterval(function () {
    let minutes = Math.floor(countDownTime / 60);
    let seconds = countDownTime % 60;
    minutes = minutes <= 3 ? `0` + minutes : minutes;
    seconds = seconds < 10 ? `0` + seconds : seconds;
    countDownEl.textContent = `${minutes}:${seconds}`;
    if (countDownTime === 0) {
      clearInterval(timerId);
    }
    countDownTime--;
  }, 1000);
  speedConstant = 100;
  allEnemies = [];
  allEnemies.push(
    new Enemy(
      0,
      165,
      Math.random() * speedConstant + speedConstant,
      `car-${Math.round(Math.random() * 2)}`,
      3
    ),
    new Enemy(
      0,
      265,
      Math.random() * speedConstant + speedConstant,
      `car-${Math.round(Math.random() * 2)}`,
      2
    ),
    new Enemy(
      0,
      365,
      Math.random() * speedConstant + speedConstant,
      `car-${Math.round(Math.random() * 2)}`,
      1
    )
  );
  player.reset();
  gameOverStatus = false;
}

/*
 * handle the life left in case of collision
 */
function handleLoseLife() {
  if (life > 1) {
    life--;
    lifeEl.innerHTML = "";
    handleLifeDisplay();
    player.reset();
  } else {
    life--;
    lifeEl.innerHTML = "";
    player.reset();
    gameOverStatus = true;
    console.log("Sorry Loser -------> Game over!");
  }
}

function handleLifeDisplay() {
  for (let i = 0; i < life; i++) {
    const spanEl = document.createElement("span");
    lifeEl.appendChild(spanEl);
  }
}

/*
 * handle when the player success to pass the road
 */
function successPass() {
  score++;
  scoreEl.textContent = score < 10 ? `0${score}` : score;
  player.reset();
  speedConstant += 25;
  allEnemies.forEach((enemy) => {
    enemy.speed = Math.random() * speedConstant + speedConstant;
  });
}

/* Draw play again element */
function drawPlayAgain() {
  const playAgainContainer = document.createElement("div");
  playAgainContainer.classList.add("playAgain-container");
  const playAgain = document.createElement("div");
  playAgain.classList.add("playAgain");
  playAgainText = "PLAY AGAIN";
  playAgainTextArr = [">>", " ", ...playAgainText.split("")];
  for (let i = 0; i < playAgainTextArr.length; i++) {
    const span = document.createElement("span");
    span.setAttribute("style", `--i: ${i + 1}`);
    if (i === 6 || i === 1) {
      span.textContent = "\u00A0";
    } else {
      span.textContent = playAgainTextArr[i];
    }
    playAgain.appendChild(span);
  }
  playAgainContainer.appendChild(playAgain);
  document
    .getElementById("canvas-container")
    .insertBefore(playAgainContainer, document.querySelector("canvas"));
}
