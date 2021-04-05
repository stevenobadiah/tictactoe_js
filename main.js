const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    let victoryCount = 0;
    let currentSpaces = [];

    return { name, symbol, victoryCount, currentSpaces };
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

    return { gameboard, winningConditions }
})();

const Game = (() => {
    let player1 = Player('Player 1', 'X', 0);
    let player2 = Player('Player 2', 'O', 0);
    var turn = 1;
    var end = false;

    const reset = (e) => {
        turn = 1;  
        for (let i = 1; i < (Gameboard.gameboard.length + 1); i++) {
            document.getElementById('cell' + i).textContent = "";
        };
        player1.currentSpaces = [];
        player2.currentSpaces = [];
        end = false;
    };

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

    const updatePlayers = (e)=> {
        e.preventDefault();

        player1.name = document.getElementById('player1Name').value;
        player1.symbol = document.getElementById('player1Symbol').value;
        player2.name = document.getElementById('player2Name').value;
        player2.symbol = document.getElementById('player2Symbol').value;

        document.getElementById('formContainer').style.display = 'none';
        adjustScoreboard(player1);
        adjustScoreboard(player2);
        reset();
    };

    const takeTurn = (e) => {
        let space = e.currentTarget;
        let player = whoseTurn(turn)

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


        if (end == false && space.textContent !== player1.symbol && space.textContent !== player2.symbol) {
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
    };

    for (let i = 1; i < (Gameboard.gameboard.length + 1); i++) {
        document.getElementById('cell' + i).addEventListener('click', takeTurn);
    };

    document.getElementById('btnSubmitUpdates').addEventListener('click', updatePlayers);
    document.getElementById('btnReset').addEventListener('click', reset);

    return { player1, player2, takeTurn, reset, adjustScoreboard }
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