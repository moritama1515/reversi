/* reversi.c */
#include <stdio.h>
#include <stdlib.h>

#define B_SIZE 10                  //BOARDSIZE
#define WIDTH (B_SIZE+2)          //BOARDSIZE+WALL
#define ALLBOARD (WIDTH * WIDTH)  //盤外を含めたBOARDSIZE

#define EMPTY 0 //空点
#define BLACK 1 //黒石
#define WHITE 2 //白石
#define WALL 3  //盤外
#define MARK 1  //マーク

//------------------------------------------------------                        
// 変数                                                                         
//------------------------------------------------------

/* 盤 */
int board[ALLBOARD] = {};
/* 着手場所の周りを調べる(右から時計回り) */
int dir8[8] = {+1,+1+WIDTH,+WIDTH,-1+WIDTH,-1,-1-WIDTH,-WIDTH,+1-WIDTH};
/* 手盤 */
int color;
/* 着手場所 */
int x,y,z;
/* 手数 */
int move;

void CheckBoard(void);
void BoardIni(void);
void InputMap(int *x,int *y);
int CheckPut(int x,int y);
int FlipColor(int color);
int CheckFlip(int z,int dir);
void FlipStone(int z,int dir);
int CountScore(int color);

void CheckBoard(void)
{
  int i = 0;
  int mapy = 0;

  printf("    ");
  while(1){
    if(i != WIDTH){
      printf("%02d ",i);
      i++;
    }else{
      printf("\n");
      break;
    }
  }

  printf("%02d ",mapy);
  mapy++;
  for (i = 0; i < ALLBOARD; i++){
    if((i+1) % WIDTH != 0){
      printf("%3d",board[i]);
    }else if(mapy < WIDTH){
      printf("%3d\n%02d ",board[i],mapy);
      mapy++;

    }else{
      printf("%3d\n",board[i]);
    }
  }
}



void BoardIni()
{
  color = WHITE; //初手を黒にするために白を代入                                 

  int i;

  for(i = 0; i < ALLBOARD-WIDTH; i++)
    {
      if( i < WIDTH){
        board[i] = WALL;
      }else if((i+1) % WIDTH == 0 || i % WIDTH == 0){
        board[i] = WALL;
      }else{
        board[i] = EMPTY;
      }
    }

  for(i = (ALLBOARD-WIDTH);i < ALLBOARD;i++){
    board[i] = WALL;
  }

  board[WIDTH*(WIDTH/2-1)+(WIDTH/2-1)] = WHITE;
  board[WIDTH*(WIDTH/2-1)+(WIDTH/2)] = BLACK;
  board[WIDTH*(WIDTH/2)+(WIDTH/2-1)] = BLACK;
  board[WIDTH*(WIDTH/2)+(WIDTH/2)] = WHITE;

}

void InputMap(int *x,int*y)
{
  int inputX,inputY;
  char inpx[5],inpy[5];

  /*手盤の反転*/
  color = FlipColor(color);
  CheckBoard();

  while(1){
    if(color == 1){
      printf("BLACK TURN    Pass -> -1\n");
    }else{
      printf("WHITE TURN    Pass -> -1\n");
    }

    /*手の入力*/
    printf("x -> ");
    fgets(inpx,5,stdin);
    inputX = atoi(inpx);

    /* Pass */
    if(inputX == -1){
      move++;
      printf("Pass\n");
      break;
    }

    printf("y -> ");
    fgets(inpy,5,stdin);
    inputY = atoi(inpy);

    if(inputX != 0 && inputY != 0 && inputX <= B_SIZE && inputY <= B_SIZE){
      break;
    }

    printf("Try Again! Input is 1 ~ %d.\n",B_SIZE);
    printf("If you want to exit,please enter -1 twice.\n");

  }

  if(inputX == -1 && color == 1){
    *x = 0;
  }else if(inputX == -1 && color == 2){
    *y = 0;
  }else{
    *x = inputX;
    *y = inputY;
  }
}

int FlipColor(int color)
{
  return 3 - color;
}

int CheckPut(int x,int y)
{
  int i,check,remove,flag;
  flag = 0;

  if(x == 0 | y == 0){
    return -1;
  }

  z = (WIDTH * y) + x;
  remove = 0;

  if(z <= ALLBOARD && board[z] == EMPTY){
    board[z] = color;
  }else{
    color = FlipColor(color);
    printf("Put error.\n");
    return z;
  }

  for(i = 0; i < 8; i++){
    if(CheckFlip(z,i) == 1){
      FlipStone(z,i);
      flag += 1;
    }
  }

  if(flag == 0){
    color = FlipColor(color);
    printf("Put error.\n");
    board[z] = EMPTY;
    return 0;
  }else{
    move++;
  }
    
  return z;
}

int CheckFlip(int z,int dir)
{
  int check,uncolor,flag;
  check = z;
  uncolor = FlipColor(color);
  flag = 0;

  while(1)
    {
      check += dir8[dir];
      if(board[check] == EMPTY || board[check] == WALL ){
	return 0;
      }
      if(board[check] == color){
	break;
      }
      if(board[check] == uncolor){
	flag = 1;
      }
    }
  if(flag == 1){
    return 1;
  }else{
    return 0;
  }
}

void FlipStone(int z, int dir)
{
  int check,uncolor;
  check = z;
  uncolor = FlipColor(color);

  while(1)
    {
      check += dir8[dir];
      if(board[check] == EMPTY || board[check] == WALL || board[check] == color){
	break;
      }
      if(board[check] == uncolor){
	board[check] = color;
      }
    }
}
 
int CountScore(int check_color)
{
  int i,score = 0;
  for(i = 0; i <= (WIDTH * WIDTH); i++)
    {
      if(board[i] == check_color){
	score += 1;
      }
    }
  return score;
}

void CheckScore()
{
  int black_score,white_score = 0; 
  black_score = CountScore(BLACK);
  white_score = CountScore(WHITE);
  if(color == BLACK){
    black_score -= 1;
  }else{
    white_score -= 1;
  }
  printf("BLACK:%d,WHITE:%d\n",black_score,white_score);
  if(black_score > white_score){
    printf("BLACK WIN!\n");
  }else if(white_score > black_score){
    printf("WHITE WIN!\n");
  }else{
    printf("DRAW\n");
  }
}

int main()
{
  int x,y;
  printf("Program Start\n");
  BoardIni();

  while(1){

    InputMap(&x,&y);

    if(x == 0 && y == 0){
      CheckScore();
      printf("Program End\n");
      break;
    }

    CheckPut(x,y);
    printf("z:%d %d-%d\nmove:%d\n",z,x,y,move);
  }

  return 0;
}
