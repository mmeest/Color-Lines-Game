const triple = [["00", "01", "02"], ["01", "02", "03"], ["10", "11", "12"], 
                ["11", "12", "13"], ["20", "21", "22"], ["21", "22", "23"], 
                ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"], 
                ["03", "13", "23"], ["00", "11", "22"], ["01", "12", "23"],
                ["20", "11", "02"], ["21", "12", "03"]]
const quatro = [["00", "01", "02", "03"], ["10", "11", "12", "13"], ["20", "21", "22", "23"]]
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
    points = 0
    availableFields = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23"]
    availableColors = ["red", "green", "blue", "yellow", ""]
    if(gameStarted == 1 && gameOver == 0 &&
        document.getElementById("colorField").style.backgroundColor != 
            document.getElementById(btnID).style.backgroundColor){   
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

        triple.forEach(triplePoints)
        quatro.forEach(quatroPoints)

        function triplePoints(item){
            if(document.getElementById(item[0]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                document.getElementById(item[1]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                document.getElementById(item[2]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item.includes(btnID)){
                    points += 3
                }
        }
        function quatroPoints(item){
            if(document.getElementById(item[0]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                document.getElementById(item[1]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                document.getElementById(item[2]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                document.getElementById(item[3]).style.backgroundColor == document.getElementById(btnID).style.backgroundColor &&
                item.includes(btnID )){
                    points += 2
                }
        }
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