const LivingCreature = require("./LivingCreature")

module.exports = class Hunter extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.life = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    kill() {
        let victimN = this.chooseCell(1)
        let victim2N = this.chooseCell(2)
        let all = victimN.concat(victim2N)
        let oneN = this.random(all)
        if (oneN) {
            this.life++
            matrix[this.y][this.x] = 0
            this.x = oneN[0]
            this.y = oneN[1]
            matrix[this.y][this.x] = 4
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    //console.log(i, "GRASSAtrrr")
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    //console.log(i, "GRASS-EATERRRR")
                    break;
                }
            }
        } else {
            this.move()
        }
        if (this.life <= 0) {
            this.die()
        }
        //if (this.life > 40 ) {
            //this.mull()
        //}
    }
    die() {
      
        matrix[this.y][this.x] = 0
        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                break;
            }
        }
    }
    move() {
        let emptyCells = this.chooseCell(0)
        let oneEmptycell = this.random(emptyCells)
        if (oneEmptycell) {
            this.life--;
            matrix[this.y][this.x] = 0
            this.x = oneEmptycell[0]
            this.y = oneEmptycell[1]
            matrix[this.y][this.x] = 4
        }
    }
    // mull() {
    //     let emptyCells = this.chooseCell(0)
    //     let oneEmptycell = this.random(emptyCells)
    //     if (oneEmptycell) {
    //         matrix[oneEmptycell[1]][oneEmptycell[0]] = 4
    //         let hunterObj = new Hunter (oneEmptycell[0], oneEmptycell[1])
    //         hunterArr.push(hunterObj)
    //         this.life = this.life - 10;
    //     }


    // }
}