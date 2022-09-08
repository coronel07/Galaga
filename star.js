function star(x, y) {
  this.posX = x;
  this.posY = y;
  this.size = 3;
  this.velocity = Math.floor(Math.random() * 10) + 2;

  // Move star down screen at random velocity
  this.update = function() {
    this.posY += this.velocity;
  }

  // Draw star
  this.show = function() {
    ellipse(this.posX, this.posY, this.size, this.size);
  }

  // When star hits bottom of screen, reset Y position to top
  this.bounds = function() {
    if ((this.posY - this.size / 2) > height) {
      this.posY = 0;
    }
  }
}