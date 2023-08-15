var ball;
var score = 0;
var gamestate = "serve";
var lastvx = 0;
var lastvy = 0;
var lives = 3;
var canvasWidth = 400;
var canvasHeight = 400;
var bottomEdge;

var edgeSprites;
var paddle;
var bricks; // Declare bricks at the global level

function preload() {
  ball_img = loadImage("eightball_1.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  edgeSprites = createEdgeSprites();

  /*edgeSprites = {
    top: createSprite(canvasWidth / 2, -1, canvasWidth, 1),
    bottom: createSprite(canvasWidth / 2, canvasHeight + 1, canvasWidth, 1),
    left: createSprite(-1, canvasHeight / 2, 1, canvasHeight),
    right: createSprite(canvasWidth + 1, canvasHeight / 2, 1, canvasHeight)
  };*/
  
  bottomEdge=createSprite(width/2,height+(height/5),width,height/2);
  bottomEdge.shapeColor = "red";
  bottomEdge.visible=false;

  paddle = createSprite(200, 350, 120, 15);

  ball = createSprite(200, 200, 20, 20);
  ball.addImage(ball_img);
  ball.scale = 0.05;
  ball.velocityX = 0;
  ball.velocityY = 0;

  bricks = createGroup(); // Initialize the bricks group

  CBR(65, "red");
  CBR(65 + 29, "orange");
  CBR(65 + 29 + 29, "green");
  CBR(65 + 29 + 29 + 29, "yellow");
}

function CBR(y, color) {
  for (var c = 0; c < 6; c++) {
    var brick = createSprite(65 + 54 * c, y, 50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
}

}


 
 /*CBR(55, rgb(randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)));
 CBR(55+20, rgb(randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)));
 CBR(55+20+20, rgb(randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)));
 CBR(55+20+40, rgb(randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255))); */


function brickHit(ball, brick){
  brick.remove();
  score= score+5;
  
}
function mousePressed(){

    if (gamestate=="serve"){
      gamestate = "play";
    ball.velocityX = 10;
    ball.velocityY = 8;
    }
}

 function gameplay(){
   
//paddle.x = World.mouseX;
paddle.x = mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  
  if (keyDown("right")){
    paddle.velocityX = 10;
  }

   if (keyDown("left")){
    paddle.velocityX = -10;
  }

  if (paddle.x < 60){
    paddle.x = 59;
  }
  if (paddle.x > 340){
    paddle.x = 339;
  }
  ball.bounceOff(edgeSprites);
  //ball.bounceOff(edgeSprites.top);
  //ball.bounceOff(edgeSprites.left);
  //ball.bounceOff(edgeSprites.right);
  if (ball.bounceOff(paddle)){
   // playSound("sound://category_hits/puzzle_game_button_04.mp3");
  }
  if (ball.bounceOff(bricks, brickHit)){
    //playSound("sound://category_hits/puzzle_game_organic_metal_tile_hit_1.mp3");
  }

  if (paddle.x == 0){
    paddle.velocityX = 0;
  }
  if (!bricks[0]){
    ball.velocityX= 0;
    ball.velocityY = 0;
    text("Well Done!", 150, 200);
  }
if(ball.isTouching(bottomEdge))
  {
    lifeover();
  }
  
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
  
  
}

function lifeover()
{
  lives = lives-1;

  if(lives >= 1)
    {
      gamestate = "serve";
    }
    else
    {
      gamestate = "end";
    }
}
function draw() {
  background("black");
  drawSprites();
  textSize(20);  
  text("Score: "+score, 40,25);
  text("Lives:"+lives, 50, 50);
//if mouse pressed call mousePressed()


  if (gamestate=="serve"){
    text("Click To Serve The Ball.", 100, 250);
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.x = 200;
    ball.y = 200;
    if(mouseIsPressed){
      mousePressed();
    }
  }
    else if (gamestate=="pause"){
      text("Press Space To Resume", 100, 200);
  }
  else if (gamestate == "end"){
    text("Game Over", 150, 200);
    ball.remove();
  }
  else {
 gameplay();
  }
  
if(keyWentDown("space"))
  {
    if(gamestate =="pause")
    {
      gamestate = "play";
      ball.velocityX = lastvx;
      ball.velocityY = lastvy;
      
    }
    else if(gamestate=="play")
    {
      gamestate = "pause";
      lastvx = ball.velocityX;
      lastvy = ball.velocityY;
      
      ball.velocityX = 0;
      ball.velocityY = 0;
    }
    
  }
  

}