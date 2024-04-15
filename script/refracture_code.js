const triple = [["00", "01", "02"], ["01", "02", "03"], ["10", "11", "12"], ["11", "12", "13"], ["20", "21", "22"], ["21", "22", "23"], ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"], ["03", "13", "23"], ["00", "11", "22"], ["01", "12", "23"], ["20", "11", "02"], ["21", "12", "03"]];
const quatro = [["00", "01", "02", "03"], ["10", "11", "12", "13"], ["20", "21", "22", "23"]];
let currentPlayer = 1;
let selectedColor = "";
let gameStarted = 0;
let availableColors = [];
let availableFields = [];
let computerSelectedField = "";
let computerSelectedColor = "";
let gameOver = 0;

// Funktsioon mängija värvi valimiseks
const pickAColor = (colorValue) => {
    if (colorValue && !gameOver) {
        selectedColor = colorValue;
        scl('colorField', colorValue);
        gameStarted = 1;
    }
};

// Põhifunktsioon mängu käigus
const mainFunction = (btnID) => {
    let points = 0;
    availableFields = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23"];
    availableColors = ["red", "green", "blue", "yellow", ""];
    
    // Kontrolli, kas mäng on alanud ja mäng pole lõppenud
    if (gameStarted && !gameOver && bcl("colorField") !== bcl(btnID)) {
        scl(btnID, selectedColor);
        spl(availableFields, btnID);
        spl(availableColors, NaN);
        
        // Arvuti käigu simulatsioon
        for (let i = 0; i < 3; i++) {
            computerMove();
            spl(availableFields, computerSelectedField);
        }

        // Punktid arvutamine
        triple.forEach(triplePoints);
        quatro.forEach(quatroPoints);

        // Mängija punktide arvutamine ja mängu lõpetamine vajadusel
        if (currentPlayer > 0) {
            player1Points += points;
            updatePlayerInfo("Player 1", player1Points, "radialBlue", "radialRed");
            if (player1Points > 99) endGame("Player 1", player1Points, player2Points);
        } else {
            player2Points += points;
            updatePlayerInfo("Player 2", player2Points, "radialRed", "radialBlue");
            if (player2Points > 99) endGame("Player 2", player2Points, player1Points);
        }
        inh("pointsC", points);
        currentPlayer *= -1;
    }  
};

// Arvuti käigu funktsioon
const computerMove = () => {
    computerSelectedColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    computerSelectedField = availableFields[Math.floor(Math.random() * availableFields.length)];
    scl(computerSelectedField, computerSelectedColor);   
};

// DOM elemendi teksti muutmise funktsioon
const updatePlayerInfo = (playerName, points, addClass, removeClass) => {
    inh("player", playerName);
    document.body.classList.add(addClass);
    document.body.classList.remove(removeClass);
    if (points > 99) endGame(playerName, points, currentPlayer > 0 ? player2Points : player1Points);
};

// Mängu lõpetamise funktsioon
const endGame = (winner, winnerPoints, loserPoints) => {
    inh("player", `${winner} Wins!   ${winnerPoints} : ${loserPoints}`);
    inh("noteOne", "Game Over!");
    inh("noteTwo", "Game Over!");
    document.getElementById("selOne").style.display = "none";
    scl("colorField", "white");
    document.getElementById("selTwo").style.removeProperty('display');
    gameOver = 1;
};

// Funktsioon värskenduse lisamiseks DOM elementile
const inh = (valueOne, valueTwo) => {
    document.getElementById(valueOne).innerHTML = valueTwo;
};

// Funktsioon elemendi eemaldamiseks massiivist
const spl = (spliceArray, spliceValue) => {
    return spliceArray.splice(spliceArray.indexOf(spliceValue), 1);
};

// Funktsioon taustavärvi saamiseks
const bcl = (someValue) => {
    return document.getElementById(someValue).style.backgroundColor;
};

// Funktsioon taustavärvi seadmiseks
const scl = (domID, colValue) => {
    document.getElementById(domID).style.backgroundColor = colValue;
};
