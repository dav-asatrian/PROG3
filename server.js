var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);


matrix = []
grassArr = []
grassEaterArr = [];
predatorArr = [];
hunterArr = []
coldArr = []
WarmArr = []


function matrixGenerator(sideX, sideY, countG, countGrE, countP, countH) {
    let arr = [];
    for (let i = 0; i < sideX; i++) {
        arr.push([]);
        for (let j = 0; j < sideY; j++) {
            arr[i].push(0);
        }
    }
    for (let i = 0; i < countG; i++) {
        let x = Math.floor(Math.random() * sideX)
        let y = Math.floor(Math.random() * sideY)
        arr[x][y] = 1;
    }
    for (let i = 0; i < countGrE; i++) {
        let x = Math.floor(Math.random() * sideX)
        let y = Math.floor(Math.random() * sideY)
        arr[x][y] = 2;
    }
    for (let i = 0; i < countP; i++) {
        let x = Math.floor(Math.random() * sideX)
        let y = Math.floor(Math.random() * sideY)
        arr[x][y] = 3;
    }
    for (let i = 0; i < countH; i++) {
        let x = Math.floor(Math.random() * sideX)
        let y = Math.floor(Math.random() * sideY)
        arr[x][y] = 4;
    }
    arr[0][0] = 5;
    arr[sideX-1][sideY-1] = 6;
    return arr;
}

matrix = matrixGenerator(50, 50, 20, 20, 30, 20)

const Grass = require("./grass")
const GrassEater = require("./grasseater")
const Predator = require("./predator")
const Hunter = require("./hunter")
const cold = require("./cold")
const Warm = require("./warm")
var l = 0;
function createObj() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                grassObj = new Grass(x, y);
                grassArr.push(grassObj);
                l++
            }
            else if (matrix[y][x] == 2) {
                grassEaterObj = new GrassEater(x, y);
                grassEaterArr.push(grassEaterObj);
            }
            else if (matrix[y][x] == 3) {
                var predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            }
            else if (matrix[y][x] == 4) {
                var hunterObj = new Hunter(x, y);
                hunterArr.push(hunterObj);
            }
            else if (matrix[y][x] == 5) {
                var coldObj = new cold(x, y);
                coldArr.push(coldObj);
            }
            // else if (matrix[y][x] == 6) {
            //     var WarmObj = new Warm(x, y);
            //     WarmArr.push(WarmObj);
            // }
        }
    }
    io.emit("send matrix", matrix)
    io.emit("grasss length", grassArr.length)
}
createObj()
let speed = 1000
let id;
function start(){
    id = setInterval(playGame, speed)
}



function setSpeed(data){
    if(data === "summer"){

        clearInterval(id)
        speed = 100  
              console.log(speed);
        id = setInterval(playGame,speed)
    }
    else if(data === "spring"){
        //console.log("spring");
        clearInterval(id)
        speed = 1000
       id =  setInterval(playGame,speed)
    }
    else if(data === "fall"){
        //e.log("fall");
        clearInterval(id)
        speed = 1000
      id =  setInterval(playGame,speed)
    }
    else if(data === "winter"){
        //console.log("winter");
        clearInterval(id)
        speed = 1500
       id =  setInterval(playGame,speed)
    }
}

function playGame() {
    // var k = 0;
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
        // k++
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
    }
    for (let i = 0; i < hunterArr.length; i++) {
        hunterArr[i].kill();
    }
    for (let i = 0; i < coldArr.length; i++) {
        coldArr[i].move();
    }
    // for (let i = 0; i < WarmArr.length; i++) {
    //     WarmArr[i].move();
    // }
    
    let count = {
        grassC : grassArr.length,
        grassEaterC : grassEaterArr.length,
        predatorC: predatorArr.length,
        hunterC: hunterArr.length,
        coldC: coldArr.length,
    }

    io.emit("send matrix", matrix)
    io.emit("Alllength", count)
}




io.on("connection",function(socket){

socket.on("speed",setSpeed)
socket.on("start",start)
})


// const intervalnum = setInterval(playGame, speed);
// function myStopFunction(d) {
//     clearInterval(intervalnum);
//     setInterval(playGame, d)
//   }

// setInterval(myStopFunction,500)