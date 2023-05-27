const LivingCreature = require("./LivingCreature")
module.exports = class Warm extends LivingCreature {


  move() {
    if (this.x < matrix.length - 1) {
      matrix[this.y][this.x] = 0
      for (var i in predatorArr) {
        if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
          predatorArr.splice(i, 1);
          break;
        }
      }
      for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      for (var i in grassArr) {
        if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      this.x = this.x + 1
      this.y = this.y - 1
      matrix[this.y][this.x] = 6
    } else {
      matrix[this.y][this.x] = 0
      this.x = 49
      this.y = 49
    }
  }
}