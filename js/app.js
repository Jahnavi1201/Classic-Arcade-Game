/*** This java script file is object-oriented. ***/

"use strict"; //Used strict mode to avoid errors and warnings when implementing the game functionality.
var min = 0; //Variables required are declared here.
var sec = 0;
var ind = 0;
var interval;
var allEnemies = [];
var enemypos = [60, 140, 230];
var c1 = document.querySelector(".closewin");
var click = new Audio(); //Created objects to "Audio" class.
click.src = "./sounds/click.mp3";
var win = new Audio();
win.src = "./sounds/gamewin.mp3"
// In the following code,event listeners are added for the required components.
document.querySelector(".playagain").addEventListener("click", () => {
  window.location.reload()
});
document.querySelector(".playagain1").addEventListener("click", () => {
  window.location.reload()
});
c1.onclick = function() {
  document.querySelector(".Modalwin").style.display = "none";
}
//"Enemy" constructor is defined below.
var Enemy = function(x, y, speed) {
  this.initial = x;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

// Updated the enemy's position, required method for game, below.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  /*Multiplied any movement by the dt parameter
  which will ensure the game runs at the same speed for
  all computers.*/
  this.x = this.x + this.speed * dt;
  if (this.x >= 505) {
    this.x = 0;
  }
  //Collision is detected here.
  if (this.x < player.x + 80 && this.x + 75 > player.x && this.y < player.y + 60 && this.y + 80 > player.y) {
    //If the collision is detected, a pop-up window is displayed using the below code.
    setTimeout(lose, 100);
  }
};

// The following function makes the enemy to be rendered on the screen.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//To create multiple enemy objects,used "map" function below.
enemypos.map((a) => {
  var enemy = new Enemy(0, a, Math.random() * 350);
  allEnemies.push(enemy);
})
//A "Player" constructor is defined below.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-cat-girl.png";
}
//An object is created to "Player" class.
var player = new Player(200, 320);
//Player is rendered on screen using following function.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Player sprite's moving direction based on input is handled in the following function.
Player.prototype.handleInput = function(key) {
  //Time is managed in the below code.
  if (ind == 0) {
    interval = setInterval(() => {
      sec += 1;
      if (sec == 60) {
        min += 1;
        sec = 0;
      }
    }, 1000);
    ind = 1;
  }
  /*The following switch case handles, to which direction and how much distance, a sprite should
  be moved based on the key input*/
  switch (key) {
    case "left":
      if (this.x > 0) {
        this.x -= 100;
      }
      click.play();
      break;
    case "right":
      if (this.x <= 300) {
        this.x += 100;
      }
      click.play();
      break;
    case "up":
      if (this.y > 0) {
        this.y -= 80;
      }
      if (this.y <= 50) {
        setTimeout(congrats, 500);
      }
      click.play();
      break;
    case "down":
      if (this.y <= 350) {
        this.y += 80;
      }
      click.play();
      break;
  }
}
/*The following function helps to display a window after winning the game which consists of
time taken by the player to finish the game*/
function congrats() {
  win.play();
  clearInterval(interval);
  document.querySelector(".textwin").innerHTML = "Congratulations!🎉 You have crossed the bugs🐞🐞 in " + min + " minutes " + sec + " seconds.";
  document.querySelector(".Modalwin").style.display = "block";
}
/*The following function helps to display a window when player collide a bug, that is,
lose the game.*/
function lose() {
  player.x = 200;
  player.y = 320;
  document.querySelector(".textlose").innerHTML = "Oops!You have lost the game.";
  document.querySelector(".Modallose").style.display = "block";
}


// This listens
for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
