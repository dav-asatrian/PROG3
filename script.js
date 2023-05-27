// const { Chart } = require("chart.js/auto");

var side = 20;
let socket = io()








function setup() {
    createCanvas(50 * side, 50 * side);// 1000
    background('#003642');

}

var grassColor = "#caff8a"
var grassEaterColor = "#FFE98A"
var predatorColor = "#FF8A8A"
var hunterColor = "#673c3c"

function Spring(evt) {
    grassColor = "#caff8a"
    grassEaterColor = "#FFE98A"
    predatorColor = "#FF8A8A"
    hunterColor = "#673c3c"
    socket.emit("speed", "spring")
}


var spr = document.getElementById("spring");
//console.log(spr)

spr.addEventListener("click", Spring);

var sum = document.getElementById("summer");


function summer(evt) {
    grassColor = "green"
    grassEaterColor = "yellow"
    predatorColor = "red"
    hunterColor = "brown"
    socket.emit("speed", "summer")
}

//console.log(sum)
sum.addEventListener("click", summer);




function Fall(evt) {
    grassColor = "#FFE072"
    grassEaterColor = "#AE8E19"
    predatorColor = "#872C2C"
    hunterColor = "#4A2F2F"
    socket.emit("speed", "fall")
}


var f = document.getElementById("fall");
f.addEventListener("click", Fall);
//console.log(f)


function Winter(evt) {
    grassColor = "#25BAD1"
    grassEaterColor = "#62500E"
    predatorColor = "#641010"
    hunterColor = "#251818"
    socket.emit("speed", "winter")
}


var w = document.getElementById("winter");
w.addEventListener("click", Winter);
//p.onclick = Winter();

function startt(){

    socket.emit("start", "start")
}

var st= document.getElementById("start");
st.addEventListener("click", startt);



function drawGame(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(grassColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill(grassEaterColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill(predatorColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill(hunterColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#00254d");
                rect(x * side, y * side, side, side);
            }
            // else if (matrix[y][x] == 6) {
            //     fill("#ff8400");
            //     rect(x * side, y * side, side, side);
            // }
        }
    }



}
// function tpel(k) {
//     var number = document.getElementById("number").innerHTML = k;
// }


window.onload = function (cn) { // 

    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title: {
            text: "Game of Life"
        },
        data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                outerWidth: 50,
                dataPoints: [
                    { label: "Grass", y: cn.grassC, color: grassColor },
                    { label: "GrassEater", y: cn.grassEaterC , color: grassEaterColor},
                    { label: "Predator", y: cn.predatorC, color: predatorColor},
                    { label: "Hunter", y: cn.hunterC, color: hunterColor},
                    { label: "cold", y: cn.coldC, color: "#00254d"},
                ]
            }
        ]
    });
    chart.render();

}







socket.on("send matrix", drawGame)
socket.on("Alllength", onload)
//socket.on("grasss length", tpell)








