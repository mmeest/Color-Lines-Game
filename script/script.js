const f00 = document.getElementById('00')
const f01 = document.getElementById('01')
const f02 = document.getElementById('02')
const f03 = document.getElementById('03')
const f10 = document.getElementById('10')
const f11 = document.getElementById('11')
const f12 = document.getElementById('12')
const f13 = document.getElementById('13')
const f20 = document.getElementById('20')
const f21 = document.getElementById('21')
const f22 = document.getElementById('22')
const f23 = document.getElementById('23')
const triple = [[f00, f01, f02], [f01, f02, f03], [f10, f11, f12], [f11, f12, f13],
                [f20, f21, f22], [f21, f22, f23], [f00, f10, f20], [f01, f11, f21],
                [f02, f12, f22], [f03, f13, f23], [f00, f11, f22], [f01, f12, f23],
                [f20, f11, f02], [f21, f12, f03]]
const quatro = [[f00, f01, f02, f03], [f10, f11, f12, f13], [f20, f21, f22, f23]]

var currentPlayer = 1
var selectedColor = ""
var gameStarted = 0
var availableColors = []
var availableFields = []
var computerSelectedField = ""
var computerSelectedField2 = ""
var computerSelectedField3 = ""
var computerSelectedColor = ""
var currentColor = ""
var restrictedList = []
var gameOver = 0

function pickAColor(colorValue){
    console.log("hello")
    if(colorValue != "" && gameOver == 0){
        selectedColor = colorValue
        document.getElementById('colorField').style.backgroundColor = colorValue
        gameStarted = 1

    } else {
        return
    }    
}

var player1Points = 0
var player2Points = 0
var points = 0

function mainFunction(btnID){
    console.log(triple)
    points = 0
    availableFields = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23"]
    availableColors = ["red", "green", "blue", "yellow", ""]
    if(gameStarted == 1 && gameOver == 0){   
        currentColor = document.getElementById("colorField").style.color
        document.getElementById(btnID).style.backgroundColor = selectedColor
        availableFields.splice(availableFields.indexOf(btnID), 1)
        availableColors.splice(availableColors.indexOf(), 1)

        computerMove(availableFields)
        availableFields.splice(availableFields.indexOf(computerSelectedField), 1)
        computerMove(availableFields)
        availableFields.splice(availableFields.indexOf(computerSelectedField), 1)
        computerMove(availableFields)
        availableFields.splice(availableFields.indexOf(computerSelectedField), 1)

        console.log(triple)

        triple.forEach(triplePoints)
        quatro.forEach(quatroPoints)

        function triplePoints(item){
            console.log(item)
            console.log(item[0])
            if(item[0].style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item[1].style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item[2].style.backgroundColor == document.getElementById(btnID).style.backgroundColor){
                    points += 3
                }
        }
        function quatroPoints(item){
            if(item[0].style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item[1].style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item[2].style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item[3].style.backgroundColor == document.getElementById(btnID).style.backgroundColor){
                    points += 2
                }
        }
        console.log(points)

        if(currentPlayer > 0){
            player1Points += points
            document.getElementById("player").innerHTML = "Player 2"
            document.body.classList.add("radialBlue");
            document.body.classList.remove("radialRed")
            document.getElementById("pointsA").innerHTML = "Player 1 points: " + player1Points
            if(player1Points > 99){
                document.getElementById("player").innerHTML = "Player 1 Wins!   " + player1Points + "/" + player2Points
                gameOver = 1
            }
        } else {
            player2Points += points
            document.getElementById("player").innerHTML = "Player 1"
            document.body.classList.add("radialRed");
            document.body.classList.remove("radialBlue")
            document.getElementById("pointsB").innerHTML = "Player 2 points: " +player2Points
            if(player2Points > 99){
                document.getElementById("player").innerHTML = "Player 2 Wins!   " + player2Points + "/" + player1Points
                gameOver = 1
            }
        }
        document.getElementById("pointsC").innerHTML = points
        currentPlayer *= -1
    }  
}

function computerMove(){
    computerSelectedColor = availableColors[Math.floor(Math.random() * availableColors.length)]
    computerSelectedField = availableFields[Math.floor(Math.random() * availableFields.length)]
    document.getElementById(computerSelectedField).style.backgroundColor = computerSelectedColor    
    return computerSelectedField
}


