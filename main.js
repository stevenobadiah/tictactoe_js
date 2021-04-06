const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    let victoryCount = 0;
    let currentSpaces = [];
    let playerType = 'Human'

    return { name, symbol, victoryCount, currentSpaces, playerType };
};

const Gameboard = (() => {
    const space1 = document.getElementById("cell1")
    const space2 = document.getElementById("cell2")
    const space3 = document.getElementById("cell3")
    const space4 = document.getElementById("cell4")
    const space5 = document.getElementById("cell5")
    const space6 = document.getElementById("cell6")
    const space7 = document.getElementById("cell7")
    const space8 = document.getElementById("cell8")
    const space9 = document.getElementById("cell9")
    const gameboard = [space1, space2, space3, space4, space5, space6, space7, space8, space9];
    const gameboardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

    return { gameboard, gameboardNumbers, winningConditions }
})();

const Game = (() => {
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let players = [player1, player2]
    var turn = 1;
    var end = false;

    function whoseTurn(turn) {
        if (turn % 2 !== 0) {
            return player1;
        } else {
            return player2;
        };
    };

    function adjustScoreboard(player) {
        if (player == player1) {
            document.getElementById('player1Wins').innerHTML = player.name + " Wins: " + player.victoryCount;
        } else {
            document.getElementById('player2Wins').innerHTML = player.name + " Wins: " + player.victoryCount;
        };
    }; 

    function checkIfComputerTurn(turn) {   
        player = whoseTurn(turn);
        if (player.playerType == "Computer") {
            return true;
        } else {
            return false;
        };
    };

    function takeTurn(turn, space){
        var player = whoseTurn(turn);

        function endGame(player) {
            end = true;
            player.victoryCount += 1;
            adjustScoreboard(player);
        };

        function checkWin(player) {
            for (let i = 0; i < Gameboard.winningConditions.length; i++) {
                let combo = Gameboard.winningConditions[i];
                let count = 0;

                for (let j = 0; j < 3; j++) {
                    if (player.currentSpaces.includes(combo[j])) {
                        count += 1;
                    };
                    if (count == 3) {
                        endGame(player);
                        return true;
                    } else {
                        continue;
                    };
                };
            };
        };

        function executeTurn(space, player) {
            space.textContent = player.symbol;
            player.currentSpaces.push(Number(space.id.slice(-1)));

            if (checkWin(player) == true) {
                alert('game over, ' + player.name + ' wins!');
            } else if (turn == 9 && end == false) {
                alert('Its a draw!')
            } else {
                turn += 1;
            };
        };

        executeTurn(space, player);

        //function humanTurn(space, player) {
        //    //This if probably isn't necessary
        //    if (player.playerType == 'Human' && end == false && space.textContent !== player1.symbol && space.textContent !== player2.symbol) {
        //        executeTurn(space, player)
         //   };
       // };

        //function computerTurn(space) {
        //    if (player.playerType == 'Computer') {
        //        player = whoseTurn(turn);
        //        do {
        //           var randomMove = Gameboard.gameboard[Math.floor(Math.random() * Gameboard.gameboard.length)];
        //        } while (end == true || randomMove.textContent == player1.symbol || randomMove.textContent == player2.symbol)
        //        executeTurn(randomMove, player);
        //    };
        //};
        //computerTurn(space, player);
    };

    const humanTurn = (e) => {
        let space = e.currentTarget;

        takeTurn(turn, space);
        turn += 1;
        if (checkIfComputerTurn(turn) && end == false) {
            do {
                var randomMove = Gameboard.gameboard[Math.floor(Math.random() * Gameboard.gameboard.length)];
            } while (end == true || randomMove.textContent == player1.symbol || randomMove.textContent == player2.symbol)
            takeTurn(turn, randomMove);
            turn += 1;
        };
    };
    
    const reset = (e) => {
        turn = 1;  
        for (let i = 1; i < (Gameboard.gameboard.length + 1); i++) {
            document.getElementById('cell' + i).textContent = "";
        };
        player1.currentSpaces = [];
        player2.currentSpaces = [];
        end = false;

        //Computer Loop
        while (checkIfComputerTurn(turn) && end == false) {
            do { 
                var randomMove = Gameboard.gameboard[Math.floor(Math.random() * Gameboard.gameboard.length)];
            } while (end == true || randomMove.textContent == player1.symbol || randomMove.textContent == player2.symbol);
            takeTurn(turn, randomMove);
            turn += 1;
        };
    };

    const resetScoreboard = (e) => {
        reset();
        player1.victoryCount = 0;
        adjustScoreboard(player1);
        player2.victoryCount = 0;
        adjustScoreboard(player2);
    };

    const updatePlayers = (e)=> {
        e.preventDefault();

        var player1Types = document.getElementsByName('player1Types');
        var player2Types = document.getElementsByName('player2Types');

        for (i=0; i < player1Types.length; i++) {
            if (player1Types[i].checked) {
                player1.playerType = player1Types[i].value;
            };
        }

        for (i=0; i < player2Types.length; i++) {
            if (player2Types[i].checked) {
                player2.playerType = player2Types[i].value;
            };
        }

        player1.name = document.getElementById('player1Name').value;
        player1.symbol = document.getElementById('player1Symbol').value;
        player2.name = document.getElementById('player2Name').value;
        player2.symbol = document.getElementById('player2Symbol').value;

        document.getElementById('formContainer').style.display = 'none';
        adjustScoreboard(player1);
        adjustScoreboard(player2);
        reset();
    };

    document.getElementById('btnSubmitUpdates').addEventListener('click', updatePlayers);
    document.getElementById('btnReset').addEventListener('click', reset);
    document.getElementById('btnResetScoreboard').addEventListener('click', resetScoreboard);
    for (let i = 1; i < (Gameboard.gameboard.length + 1); i++) {
        document.getElementById('cell' + i).addEventListener('click', humanTurn);
    };

    

    //do {
     //   var randomMove = Gameboard.gameboard[Math.floor(Math.random() * Gameboard.gameboard.length)];
    //} while (end == true || randomMove.textContent == player1.symbol || randomMove.textContent == player2.symbol)

    //if (player.playerType == "Compuer") {

    //};
        

    //return { player1, player2, takeTurn, reset, adjustScoreboard }
})();


FormView = (() => {
    const btnShowForm = document.getElementById('btnShowForm');
    const btnCloseForm = document.getElementById('btnCloseForm');
    const form = document.getElementById('formContainer');

    function showForm() {
        form.style.display = 'block';
    };

    function closeForm() {
        form.style.display = 'none';
    };

    btnShowForm.addEventListener('click', showForm);
    btnCloseForm.addEventListener('click', closeForm);
})();