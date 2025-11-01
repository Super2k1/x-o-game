//Sélection des éléments du DOM
const cells  = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartButton = document.querySelector('#restart');

//Variables d’état du jeu
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

//Conditions de victoire
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//gestionnaire de clic sur une case
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer); // colorer la case
  checkWinner();
}

//vérification victoire / match nul / changement de joueur
function checkWinner() {
  let winnerFound = false;

  for (let combo of winningConditions) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winnerFound = true;
      highlightWinner(combo);
      break;
    }
  }

  if (winnerFound) {
    statusText.textContent = `🎉 Joueur ${currentPlayer} a gagné !`;
    gameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "equal !";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Tour de ${currentPlayer}`;
  }
}

//mise en valeur de la ligne gagnante
function highlightWinner(combo) {
  combo.forEach(index => {
    cells[index].classList.add("winner");
  });
}

//réinitialisation du game
function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Tour de ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

//Écoute des événements (event listeners)
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

