/* draw.js */

const sx = 10;         //xの開始地点                                                                     
const sy = 10;         //yの開始地点                                                                     
const w = 40;          //マスの幅                                                                        
const h = 40;          //マスの高さ                                                                      
const lw = 1;          //ラインの太さ                                                                    
const box_row = 8;     //マスの数(row)                                                                   
const box_column = 8;  //マスの数(column)

function draw(){
    var canvas = document.getElementById('main');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
	
    }
    
    drawTable(ctx,sx,sy,w,h,lw,box_row,box_column,1);
    boardIni();
    boardDraw();
}


function boardDraw(){

    var canvas = document.getElementById('main');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

    }
    
    for(var i = 0; i <= boardAll-1; i++){
	if(board[i] == inBoard.stone.black){
	    drawStone(ctx,sx,sy,w,h,i,"b");
	}else if(board[i] == inBoard.stone.white){
	    drawStone(ctx,sx,sy,w,h,i,"w");
	}
    }

}

function drawTable(tmp,sx,sy,w,h,lw,box_row,box_column,outline){
    if (outline == 1){
	var f = 1;
    }else if (outline == 0){
	var f = 0;
    }else{
	alert("error outline in drawTable");
    }

    tmp.lineWidth = lw;
    tmp.beginPath();

    //縦
    for (i = (1-f); i < (box_row+f); i++){
	tmp.moveTo(sx+w*i,sy);
	tmp.lineTo(sx+w*i,sy+h*box_column);
    }

    //横
    for (i = (1-f); i < (box_column+f); i++){
	tmp.moveTo(sx,sy+h*i);
	tmp.lineTo(sx+w*box_row,sy+h*i);
    }

    tmp.stroke();
}

function drawStone(tmp,sx,sy,w,h,z,color){
    
    var column = Math.floor(z / boardWidth);
    var row = z - (column*boardWidth);

    var tx = sx + (row*w) - w/2;
    var ty = sy + (column*h) -h/2;

    if(color == "b"){
	drawBlack(tmp,tx,ty,w,h);
    }else if(color == "w"){
	drawWhite(tmp,tx,ty,w,h);
    }else if(color == "m"){
	drawMark(tmp,tx,ty,w,h);
    }else{
	alert("error in drawStone");
    }
}

function drawBlack(tmp,ax,ay,w,h){
    if(w < h){
	var d = w;
    }else{
	var d = h;
    }

    tmp.lineWidth = 1;
    tmp.beginPath();
    
    tmp.arc(ax,ay,(d*0.8)/2,0,Math.PI*2,true);
    tmp.fillStyle = "black";
    tmp.fill();

    tmp.stroke();
}

function drawWhite(tmp,ax,ay,w,h){
    if(w < h){
        var d = w;
    }else{
        var d = h;
    }

    tmp.lineWidth = 1;
    tmp.beginPath();

    tmp.arc(ax,ay,(d*0.8)/2,0,Math.PI*2,true);
    tmp.fillStyle = "white";
    tmp.fill();

    tmp.stroke();
}

