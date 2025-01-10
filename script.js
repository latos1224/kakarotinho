const board = document.getElementById('game-board');
const cells = Array.from(board.getElementsByClassName('cell'));
const resetButton = document.getElementById('reset-button');
const currentPlayerText = document.getElementById('current-player');
const turnIndicator = document.getElementById('turn-indicator');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

// Comprobación de victoria
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combination of winningCombination) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            highlightWinningCombination(combination);
            gameActive = false;
            setTimeout(() => {
                alert(`${gameState[a]} ha ganado!`);
                resetGame(); // Reiniciar el juego automáticamente después de mostrar el mensaje de ganador
            }, 2000); // Pausa antes de mostrar el mensaje
            return gameState[a];
        }
    }
    return null;
}

function highlightWinningCombination(combination) {
    combination.forEach((index) => {
        const cell = cells[index];
        cell.classList.add('winning');
        setTimeout(() => {
            cell.classList.remove('winning'); // Eliminar parpadeo después de un tiempo
        }, 1500); // Tiempo para que el parpadeo dure 1.5 segundos
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (!winner) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerText.textContent = currentPlayer;
    }
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });
    gameActive = true;
    currentPlayer = 'X';
    currentPlayerText.textContent = currentPlayer;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
