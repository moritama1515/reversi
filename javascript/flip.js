/* flip.js */

function checkPut(z)
{
    var check,i,flag;
    var uncolor = flipColor(color);

    if(board[z] == inBoard.stone.empty){
	board[z] = color;
	console.log(board);
    }else{
	console.log("error");
    }

    for(i = 0; i < 8; i++){
	if(checkFlip(z,i) == 1){
	    flipStone(z,i);
	    flag += 1;
	}
    }
}

function checkFlip(z,dir)
{
    var uncolor = flipColor(color);
    var flag = 0;
    
    while(1)
	{
	    z += dir8[dir];
	    if(board[z] == inBoard.stone.empty || board[z] == inBoard.stone.wall){
		return 0;
	    }else if(board[z] == color){
		break;
	    }else if(board[z] == uncolor){
		flag = 1;
	    }
	}

    if(flag == 1){
	return 1;
    }else{
	return 0;
    }
}

function flipStone(z,dir)
{
    var check = z;
    var uncolor = flipColor(color);

    while(1)
        {
            check += dir8[dir];
            if(board[check] == inBoard.stone.empty || board[check] == color || board[check] == inBoard.stone.wall){
                break;
            }else if(board[check] == uncolor){
                board[check] = color;
            }
	}
}