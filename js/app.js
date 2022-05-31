//predefined variables
var character = localStorage["chosenCharacter"];
let score = 0;
let life = 3;

// Enemies our player must avoid
var Enemy = function (x, y, speed, car, platform) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
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
    this.speed = Math.random() * 100 + 50;
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
    console.log("Heeeey collision bam_1!");
  }

  if (
    this.platform === 2 &&
    player.dx >= this.x &&
    player.dx <= this.x + 190 &&
    player.dy <= this.y - 50 &&
    player.dy >= this.y - 135
  ) {
    console.log("Heeeey collision bam_2!");
  }

  if (
    this.platform === 3 &&
    player.dx >= this.x &&
    player.dx <= this.x + 190 &&
    player.dy <= this.y - 50 &&
    player.dy >= this.y - 135
  ) {
    console.log("Heeeey collision bam_3!");
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(385, 0, 312.5, 550, 50, character);
gameReset(); // setup defaults

/*
 * resets the game in case of collision
 */
function gameReset() {
  player.reset();
  score = 0;
  allEnemies = [];
  allEnemies.push(
    new Enemy(
      0,
      165,
      Math.random() * 100 + 40,
      `car-${Math.round(Math.random() * 2)}`,
      3
    ),
    new Enemy(
      0,
      265,
      Math.random() * 100 + 50,
      `car-${Math.round(Math.random() * 2)}`,
      2
    ),
    new Enemy(
      0,
      365,
      Math.random() * 100 + 60,
      `car-${Math.round(Math.random() * 2)}`,
      1
    )
  );
}
