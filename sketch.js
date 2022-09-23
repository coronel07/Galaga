var spaceship;
var stars = [];
var enemySpacehips = [];
var lasers = [];
var enemyLasers = [];

function setup() {
  createCanvas(600, 600);

  // Setup player icon
  spaceship = new spaceship((width / 2), (height - height / 6));

  // Setup starfield
  for (let i = 0; i < 100; i++) {
    stars[i] = new star(Math.floor(Math.random() * width), (Math.floor(Math.random() * height)));
  }

  // Setup initial alien wave
  for (let i = 0; i < 3; i++) {
    enemySpacehips[i] = new enemy(0, Math.floor(Math.random() * height / 2));
  }
}

function draw() {
  background(51);
  noStroke();

  // Draw moving stars
  for (let i = 0; i < stars.length; i++) {
    fill('rgba(255, 255, 255, 0.5)');
    stars[i].update();
    stars[i].show();
    stars[i].bounds();
  }

  // Draw player icon
  stroke('blue')
  fill('white');
  spaceship.show();
  spaceship.edges();

  // Draw lasers from player
  for (let i = 0; i < lasers.length; i++) {
    if (lasers[i].active === true) {
      stroke('blue');
      fill('white');
      lasers[i].update();
      lasers[i].show();

    // Check if user has shot an enemy
      for (let j = 0; j < enemySpacehips.length; j++) {
        if (lasers[i].hits(enemySpacehips[j])) {
          enemySpacehips.splice(j, 1);
          lasers[i].active = false;
        }
      }

      if (lasers[i].offScreen()) {
        lasers.splice(i, 1);
      }
    }
  }

  // Draw enemy attackers
  for (let i = 0; i < enemySpacehips.length; i++) {
    stroke('red')
    fill('white');
    enemySpacehips[i].update();
    enemySpacehips[i].show();
    enemySpacehips[i].bounds();

    // Shoot at player
    if (enemySpacehips[i].hasClearShot(spaceship.posX)) {
      enemyLasers.push(new enemyLaser(enemySpacehips[i].posX, enemySpacehips[i].posY));
    }

    // Check enemy ship has hit player
    if (enemySpacehips[i].touches(spaceship)) {
      location.reload();
    }

    // Check amount in enemy fleet
    if (enemySpacehips.length < 3) {
      enemySpacehips.push(new enemy(0 - 50, Math.floor(Math.random() * height / 2)));
    }
  }

  // Draw enemy laser rays
  for (let i = 0; i < enemyLasers.length; i++) {
    stroke('red');
    fill('white');
    enemyLasers[i].update();
    enemyLasers[i].show();

    if (enemyLasers[i].hits(spaceship)) {
      location.reload();
    }

    if (enemyLasers[i].offScreen()) {
      enemyLasers.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    spaceship.move("left");
  } else if (keyCode === RIGHT_ARROW) {
    spaceship.move("right");
  } else if (key === ' ') {
    lasers.push(new laser(spaceship.posX, spaceship.posY));
  }
}