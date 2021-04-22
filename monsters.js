
var monstersPositions = new Object();
var numOfMonsters = 1;
var monstersNames;
var livesCounter = 5;
var prizeCharacter = new Object();


//inits monsters and prize characteristics.
function initMonsters(){
    let availablePostitions = [[0,0],[0,9],[9,0],[9,9]];
    monstersNames = ["a", "b", "c", "d"];
  
    for (var i = 0; i < numOfMonsters; i++) {
      monstersPositions[monstersNames[i]] = new Object();
      monstersPositions[monstersNames[i]].x = availablePostitions[i][0];
      monstersPositions[monstersNames[i]].y = availablePostitions[i][1];
      monstersPositions[monstersNames[i]].moves = [];
    }

    var emptyCell = findRandomEmptyCell(board)
    prizeCharacter.x = emptyCell[0];
    prizeCharacter.y = emptyCell[1];
    prizeCharacter.moves = [];
    prizeCharacter.lastMove = [0,0];
  }
  
//check for valid moves for the monsters.
function updateMonsters(){
  let monster;
    for (var i = 0; i <= numOfMonsters ; i++) {
      if(i == numOfMonsters){
        if(prizeIsAlive){
          monster = prizeCharacter;
        }
        else{
          break
        }
      }
      else{
        monster = monstersPositions[monstersNames[i]];
      }
      monster.moves = [];

      if(monster.x == 0 ) {//left wall
  
        if(board[monster.x + 1][monster.y] != 4){
          monster.moves.push([monster.x + 1, monster.y]);
        }
        if(monster.y == 0 && board[monster.x][monster.y + 1] != 4){
          monster.moves.push([monster.x, monster.y + 1]);
        }
        else if(monster.y == 9 && board[monster.x][monster.y - 1] != 4){
          monster.moves.push([monster.x, monster.y - 1]);
        }
        else{
          if(board[monster.x][monster.y - 1] != 4){
            monster.moves.push([monster.x, monster.y - 1]);
          }
          if(board[monster.x][monster.y + 1] != 4){
            monster.moves.push([monster.x, monster.y + 1]);
          }
        }
      }
  
      else if(monster.x == 9 ) {//right wall
  
        if(board[monster.x - 1][monster.y] != 4){
          monster.moves.push([monster.x - 1, monster.y]);
        }
        if(monster.y == 0 && board[monster.x][monster.y + 1] != 4){
          monster.moves.push([monster.x, monster.y + 1]);
        }
        else if(monster.y == 9 && board[monster.x][monster.y - 1] != 4){
          monster.moves.push([monster.x, monster.y - 1]);
        }
        else{
          if(board[monster.x][monster.y - 1] != 4){
            monster.moves.push([monster.x, monster.y - 1]);
          }
          if(board[monster.x][monster.y + 1] != 4){
            monster.moves.push([monster.x, monster.y + 1]);
          }
        }
      }
  
      else if(0 < monster.x < 9 && monster.y == 0) {       //top Row
        if(board[monster.x][monster.y + 1] != 4){
          monster.moves.push([monster.x, monster.y + 1]);
        }
        if(board[monster.x + 1][monster.y] != 4){
          monster.moves.push([monster.x + 1, monster.y]);
        }
        if(board[monster.x - 1][monster.y] != 4){
          monster.moves.push([monster.x - 1, monster.y]);
        }
      }
  
      else if(0 < monster.x < 9 && monster.y == 9) {       //bottom Row
        if(board[monster.x][monster.y - 1] != 4){
          monster.moves.push([monster.x, monster.y - 1]);
        }
        if(board[monster.x + 1][monster.y] != 4){
          monster.moves.push([monster.x + 1, monster.y]);
        }
        if(board[monster.x - 1][monster.y] != 4){
          monster.moves.push([monster.x - 1, monster.y]);
        }
      }
  
      else // inside the board limits
      {
        if(board[monster.x][monster.y - 1] != 4){ // up
          monster.moves.push([monster.x, monster.y - 1]);
        }
        if(board[monster.x][monster.y + 1] != 4){ // down
          monster.moves.push([monster.x, monster.y + 1]);
        }
  
        if(board[monster.x + 1][monster.y] != 4){ // right
          monster.moves.push([monster.x + 1, monster.y]);
        }
  
        if(board[monster.x - 1][monster.y] != 4){ //left
          monster.moves.push([monster.x - 1, monster.y]);
        }
      }
      (i < numOfMonsters) ? calculateHeuristic(monster) : null;
    }
    if(prizeIsAlive){
      chooseRandomMoove();
    }
  }

//estimiates distance to the pacman.
function calculateHeuristic(monster){
    let heuristicValue = Number.MAX_SAFE_INTEGER;
    let position = [];

    for (var i = 0; i < monster.moves.length; i++) {
      tempHeuristic = Math.abs(monster.moves[i][0] - shape.i) + Math.abs(monster.moves[i][1] - shape.j)
      if(tempHeuristic < heuristicValue){
        heuristicValue = tempHeuristic;
        position = monster.moves[i];
      }
    }
    monster.x = position[0];
    monster.y = position[1];
  }

//chooses random move for the prize character/ cannot go back to previous loaction
function chooseRandomMoove(){
  prizeCharacter.moves = prizeCharacter.moves.filter((item) => !(item[0] == prizeCharacter.lastMove[0] 
  && item[1] == prizeCharacter.lastMove[1]))

  let numberOfMoves = prizeCharacter.moves.length;
  let index = Math.floor(Math.random() * numberOfMoves);
  let chosenMove = prizeCharacter.moves[index];

  prizeCharacter.lastMove[0] = prizeCharacter.x;
  prizeCharacter.lastMove[1] = prizeCharacter.y;

  prizeCharacter.x = chosenMove[0];
  prizeCharacter.y = chosenMove[1];
}
