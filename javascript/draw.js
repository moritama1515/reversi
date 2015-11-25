function draw(){
    var canvas = document.getElementById('main');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        var sx = 10;         //xの開始地点
        var sy = 10;         //yの開始地点
        var w = 40;          //マスの幅
        var h = 40;          //マスの高さ
        var lw = 1;          //ラインの太さ
	var box_row = 8;     //マスの数(row)
	var box_column = 8;  //マスの数(column)

        drawTable(ctx,sx,sy,w,h,lw,box_row,box_column,1);

	drawStone(ctx,sx,sy,w,h,4,4,"w");
        drawStone(ctx,sx,sy,w,h,5,4,"b");
        drawStone(ctx,sx,sy,w,h,4,5,"b");
        drawStone(ctx,sx,sy,w,h,5,5,"w");
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

function drawStone(tmp,sx,sy,w,h,row,column,color){
    var tx = sx + (row*w) - w/2;
    var ty = sy + (column*h) -h/2;

    if(color == "b"){
	drawBlack(tmp,tx,ty,w,h);
    }else if(color = "w"){
	drawWhite(tmp,tx,ty,w,h);
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

    tmp.lineWidth = 2;
    tmp.beginPath();
    
    tmp.arc(ax,ay,(d*0.8)/2,0,Math.PI*2,true);
    tmp.fill();

    tmp.stroke();
}

function drawWhite(tmp,ax,ay,w,h){
    if(w < h){
        var d = w;
    }else{
        var d = h;
    }

    tmp.lineWidth = 2;
    tmp.beginPath();

    tmp.arc(ax,ay,(d*0.8)/2,0,Math.PI*2,true);

    tmp.stroke();
}