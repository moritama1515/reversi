/* reversi.js */

const boardSize = 8;
const boardWidth = (boardSize+2);
const boardAll = (boardWidth*boardWidth);

const inBoard = {
    stone: {empty: 0, black: 1, white: 2, wall: 3},
};

var board = new Array(boardAll);
var dir8 = [+1,+1+boardWidth,+boardWidth,-1+boardWidth,-1,-1-boardWidth,-boardWidth,+1-boardWidth];
var color,x,y,z,move;
var move,turn;

function put(x,y){

    if(x != 0 && y != 0 && x <= boardSize && y <= boardSize ){
    z = x + y *boardWidth;
    console.log("z:%d",z);
    checkPut(z);
    //    board[z] = color;
    boardDraw();
    color = flipColor(color);
    }
}

function flipColor(color){
    return 3 - color;
}

function boardIni(){
    
    color = inBoard.stone.black;
    
    for (var j = 0; j<=boardAll-1; j++){
	if(j < boardWidth || ((j+1) % boardWidth == 0) || (j % boardWidth == 0) || (boardAll-boardWidth) < j){
	    board[j] = inBoard.stone.wall;
	}else{
	    board[j] = inBoard.stone.empty;
	}
    }

    board[boardWidth*(boardWidth/2-1)+(boardWidth/2-1)] = inBoard.stone.white;
    board[boardWidth*(boardWidth/2-1)+(boardWidth/2)] = inBoard.stone.black;
    board[boardWidth*(boardWidth/2)+(boardWidth/2-1)] = inBoard.stone.black;
    board[boardWidth*(boardWidth/2)+(boardWidth/2)] = inBoard.stone.white;

}
 
