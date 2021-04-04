//const gameBoard = (() => {

let space1 = document.getElementById("cell1")
let space2 = document.getElementById("cell2")
let space3 = document.getElementById("cell3")
let space4 = document.getElementById("cell4")
let space5 = document.getElementById("cell5")
let space6 = document.getElementById("cell6")
let space7 = document.getElementById("cell7")
let space8 = document.getElementById("cell8")
let space9 = document.getElementById("cell9")

let gameboard = [space1, space2, space3, space4, space5, space6, space7, space8, space9];
let turn = 1;
let end = false;

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    let victoryCount = 0;
    let currentSpaces = [];

    return { name, symbol, victoryCount, currentSpaces };
};

//})();

function isOdd(turn) {
    if (turn % 2 !== 0) {
        return true;
    } else {
        return false;
    };
};

const player1 = Player('Player 1', 'X', 0);
const player2 = Player('Player 2', 'O', 0);

const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

function adjustScoreboard(player) {
    if (player == player1) {
        document.getElementById('player1Wins').innerHTML = player.name + " Wins: " + player.victoryCount;
    } else {
        document.getElementById('player2Wins').innerHTML = player.name + " Wins: " + player.victoryCount;
    };
};

function endGame(player) {
    end = true;
    alert('game over, ' + player.name + ' wins!');
    player.victoryCount += 1;
    adjustScoreboard(player);
};

function checkWin(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        let combo = winningConditions[i];
        let count = 0;

        for (let j = 0; j < 3; j++) {
            if (player.currentSpaces.includes(combo[j])) {
                count += 1;
            };
            if (count == 3) {
                endGame(player);
            } else {
                continue;
            };
        };
    };
};

const takeTurn = (e) => {
    let space = e.currentTarget;

    if (end == false && space.textContent !== "X" && space.textContent !== "O") {
        if (isOdd(turn)) {
            space.textContent = player1.symbol;
            player1.currentSpaces.push(Number(space.id.slice(-1)));
            checkWin(player1);
        } else {
            space.textContent = player2.symbol;
            player2.currentSpaces.push(Number(space.id.slice(-1)));
            checkWin(player2)
        };

        if (turn == 9 && end == false) {
            alert('Its a draw!')
        } else {
            turn += 1;
        };
    };
};

const reset = (e) => {
    turn = 1;  
    for (var i = 1; i < (gameboard.length + 1); i++) {
        document.getElementById('cell' + i).textContent = "";
    };
    player1.currentSpaces = [];
    player2.currentSpaces = [];
    end = false;
};

// Add Interactivity To Elements

for (var i = 1; i < (gameboard.length + 1); i++) {
    document.getElementById('cell' + i).addEventListener('click', takeTurn)
}

const updatePlayers = (e)=> {
    e.preventDefault();

    player1.name = document.getElementById('player1Name').value;
    player1.symbol = document.getElementById('player1Symbol').value;
    player2.name = document.getElementById('player2Name').value;
    player2.symbol = document.getElementById('player2Symbol').value;

    document.getElementById('formContainer').style.display = 'none';
    adjustScoreboard(player1);
    adjustScoreboard(player2);
};

function showForm() {
    document.getElementById('formContainer').style.display = 'block';
}

document.getElementById('btnUpdatePlayers').addEventListener('click', showForm)
document.getElementById('btnSubmitUpdates').addEventListener('click', updatePlayers)
document.getElementById('btnReset').addEventListener('click', reset)