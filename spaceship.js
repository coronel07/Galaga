function spaceship(x, y) {
  this.posX = x;
  this.posY = y;
  this.size = 40;

  // Move player icon either left or right depending on user input
  this.move = function(direction) {
    if (direction == "left") {
      this.posX -= this.size;
    } else if (direction == "right") {
      this.posX += this.size;
    }
  }

  // Set player posX to oposite screen side
  this.edges = function() {
    if (this.posX + this.size / 2 <= 0) {
      this.posX = width - this.size / 2;
    } else if (this.posX - this.size / 2 >= width) {
      this.posX = 0 + this.size / 2;
    }
  }

  // Draw player icon
  this.show = function() {
    triangle(this.posX, this.posY, this.posX - this.size / 2, this.posY + this.size, this.posX + this.size / 2, this.posY + this.size);
  }
}