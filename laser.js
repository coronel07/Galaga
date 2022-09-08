function laser(x, y) {
  this.posX = x;
  this.posY = y;
  this.size = 8;
  this.velocity = 15;
  this.active = true;

  // Move laser up screen
  this.update = function() {
    this.posY -= this.velocity;
  }

  // Bool value indicating status of laser
  this.offScreen = function() {
    if (this.posY < 0) {
      return true;
    }
  }

  // Draw laser
  this.show = function() {
    ellipse(this.posX, this.posY, this.size, this.size);
  }

  // Check if laser has hit an enemy ship
  this.hits = function(enemy) {
    if ((this.posX - this.size / 2 >= enemy.posX - enemy.size / 2) && (this.posX + this.size / 2 <= enemy.posX + enemy.size / 2)) {
      if ((this.posY - this.size / 2 <= enemy.posY + enemy.size) && (this.posY <= enemy.posY + enemy.size)) {
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }
}