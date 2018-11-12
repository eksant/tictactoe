/*
 * Tic Tac Toe
 * A Tic Tac Toe game in HTML/JavaScript/CSS.
 * Maked With ❤
 * @author: Eksa <eksant@gmail.com>
 */

var N_SIZE = 3,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves,
  playerWin = {
    X: 0,
    O: 0
  };

/*
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("height", 60);
      cell.setAttribute("width", 60);
      cell.setAttribute("align", "center");
      cell.setAttribute("valign", "center");
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      // console.log(boxes);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  startNewGame();
}

/*
 * New game
 */
function startNewGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  document.getElementById("o_win").textContent = playerWin.O;
  document.getElementById("x_win").textContent = playerWin.X;
  boxes.forEach(function(square) {
    square.innerHTML = EMPTY;
  });
}

/*
 * Restart
 */
function restartGame() {
  playerWin = {
    X: 0,
    O: 0
  };
  document.getElementById("o_win").textContent = playerWin.O;
  document.getElementById("x_win").textContent = playerWin.X;
  startNewGame();
}

/*
 * Check if a win or not
 */
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    // console.log(items.length + "==" + N_SIZE);
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

/*
 * Sets clicked square and also updates the turn.
 */
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    playerWin[turn] += 1;
    document.getElementById(turn === "O" ? "o_win" : "x_win").textContent =
      playerWin[turn];
    alert("Winner: Player " + turn);
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
    startNewGame();
  } else {
    var eksa = document
      .getElementById(turn === "O" ? "x_player" : "o_player")
      .querySelectorAll(".add-on");
    var notEksa = document
      .getElementById(turn === "X" ? "x_player" : "o_player")
      .querySelectorAll(".add-on");

    eksa[0].style.backgroundColor = "#5bb75b";
    eksa[2].style.backgroundColor = "#5bb75b";
    notEksa[0].style.backgroundColor = "#eeeeee";
    notEksa[2].style.backgroundColor = "#eeeeee";
    turn = turn === "X" ? "O" : "X";
  }
}

init();
