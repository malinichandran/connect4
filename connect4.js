/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board =[]; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    board = new Array(HEIGHT)
    for(let i=0;i<board.length;i++){
        board[i]= new Array(WIDTH)
    }
    return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
 let htmlBoard= document.getElementById("board")
  // TODO: Creating the top row or the headcell which takes the click operation for game play
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: creating the board elements which forms the board structure
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      //cell.innerHTML= `${y}-${x}`
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol=(x)=> {
  // TODO: write the real version of this, rather than always returning 0
    for(let i=HEIGHT-1;i>=0;i--){
        
        if(board[i][x]===undefined){
            return i;
        }
    
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable=(y, x)=> {
    //console.log(currPlayer)
  // TODO: make a div and insert into correct table cell
  const divCell= document.createElement('div');
  const currCell= document.getElementById(`${y}-${x}`)
  if(currPlayer===1){
    currCell.classList.add("piece","player1","fall")
  }else if(currPlayer===2){
    currCell.classList.add("piece","player2","fall")
  }
  currCell.append(divCell)

}
/** endGame: announce game end */

const endGame=(msg) =>{
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

const handleClick=(evt)=> {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  placeInTable(y, x);
  board[y][x]= currPlayer
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  //console.log(currPlayer)
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    return endGame(`It is a tie`);
  }
  // switch players
  // DONE: switch currPlayer 1 <-> 2
  if(currPlayer===1){
      
      currPlayer=2
  }else{
      currPlayer=1
  }
}

const checkForTie=()=>{
    console.log('chk for tie')
    for(let i=0;i<WIDTH;i++){
        if(board[0][i]===undefined){
            return false
        }
}
return true
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin=()=> {
  const _win=(cells)=> {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();