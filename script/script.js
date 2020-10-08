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
var computerSelectedColor = ""
var gameOver = 0
function pickAColor(colorValue){
    if(colorValue != "" && gameOver == 0){
        selectedColor = colorValue
        /* document.getElementById('colorField').style.backgroundColor = colorValue */
        scl('colorField', colorValue)
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
    if(gameStarted == 1 && gameOver == 0 && bcl("colorField") != bcl(btnID)){  
        /* document.getElementById(btnID).style.backgroundColor = selectedColor */
        scl(btnID, selectedColor)
        spl(availableFields, btnID)
        spl(availableColors, NaN)

        computerMove(availableFields)
        spl(availableFields, computerSelectedField)
        computerMove(availableFields)
        spl(availableFields, computerSelectedField)
        computerMove(availableFields)
        spl(availableFields, computerSelectedField)

        triple.forEach(triplePoints)
        quatro.forEach(quatroPoints)

        function triplePoints(item){
            if(bcl(item[0]) == bcl(btnID) &&
                bcl(item[1]) == bcl(btnID) &&
                bcl(item[2]) == bcl(btnID) &&
                item.includes(btnID)){
                    points += 3
                }
        }
        function quatroPoints(item){
            if(bcl(item[0]) == bcl(btnID) &&
                bcl(item[1]) == bcl(btnID) &&
                bcl(item[2]) == bcl(btnID) &&
                bcl(item[3]) == bcl(btnID) &&
                item.includes(btnID )){
                    points += 2
                }
        }

        if(currentPlayer > 0){
            player1Points += points
            inh("player", "Player 2")
            document.body.classList.add("radialBlue");
            document.body.classList.remove("radialRed")
            inh("pointsA", "Player 1 points: " + player1Points)
            if(player1Points > 99){
                inh("player", "Player 1 Wins!   " + player1Points + " : " + player2Points)
                inh("noteOne", "Game Over!")
                inh("noteTwo", "Game Over!")
                gameOver = 1
            }
        } else {
            player2Points += points
            inh("player", "Player 1")
            document.body.classList.add("radialRed");
            document.body.classList.remove("radialBlue")
            inh("pointsB", "Player 2 points: " + player2Points)
            if(player2Points > 99){
                inh("player", "Player 2 Wins!   " + player2Points + " : " + player1Points)
                inh("noteOne", "Game Over!")
                inh("noteTwo", "Game Over!")
                gameOver = 1
            }
        }
        inh("pointsC", points)
        currentPlayer *= -1
    }  
}
function computerMove(){
    computerSelectedColor = availableColors[Math.floor(Math.random() * availableColors.length)]
    computerSelectedField = availableFields[Math.floor(Math.random() * availableFields.length)]
    scl(computerSelectedField, computerSelectedColor)   
    return computerSelectedField
}

function inh(valueOne, valueTwo){       // set DOM element text
    document.getElementById(valueOne).innerHTML = valueTwo
}

function spl(spliceArray, spliceValue){ // splice element from array
    return spliceArray.splice(spliceArray.indexOf(spliceValue), 1)
}

function bcl(someValue){                // get background color value
    return document.getElementById(someValue).style.backgroundColor
}

function scl(domID, colValue){          // set background color value
    document.getElementById(domID).style.backgroundColor = colValue
}
