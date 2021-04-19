// export var monstersModule = {updateMonsters, 
//     initMonsters, 
//     monstersInterval, 
//     monstersNames, 
//     monstersPositions, 
//     livesCounter,
//     numOfMonsters
//  }

var monstersPositions = new Object();
var numOfMonsters = 4;
var monstersInterval;
var monstersNames;
var livesCounter = 5;

function initMonsters(){
    let availablePostitions = [[0,0],[0,9],[9,0],[9,9]];
    monstersNames = ["a", "b", "c", "d"];
  
    for (var i = 0; i < numOfMonsters; i++) {
      monstersPositions[monstersNames[i]] = new Object();
      monstersPositions[monstersNames[i]].x = availablePostitions[i][0]
      monstersPositions[monstersNames[i]].y = availablePostitions[i][1]
      monstersPositions[monstersNames[i]].moves = [];
    }
  }
  
function updateMonsters(){
  
    for (var i = 0; i < numOfMonsters; i++) {
      let monster = monstersPositions[monstersNames[i]];
  
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
  
      else if(0 < monster.x < 9 && monster.y == 0) {       //first Row
        if(board[monster.x][monster.y + 1] != 4){
          monster.moves.push([monster.x, monster.y + 1]);
        }
  
      }
  
      else if(0 < monster.x < 9 && monster.y == 9) {       //last Row
        if(board[monster.x][monster.y - 1] != 4){
          monster.moves.push([monster.x, monster.y - 1]);
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
      calculateHeuristic(monster);
    }
  }
  
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
