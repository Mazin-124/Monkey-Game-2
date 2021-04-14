var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
   FoodGroup = new Group;
   obstacleGroup = new Group;
}

function draw() { 
  background(255);
  textSize(20)
  fill(255)
  text("Score: "+ score, 100,40);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score = score + 2;
    player.scale += +0.1;
  }

  spawnFood();
  spawnObstacle();

  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30)
    fill("black")
    text("Game Over!",300,220)
  }

  drawSprites();
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana)
  }
}
function spawnObstacle(){
  if(frameCount% 300 === 0){
  var obstacle = createSprite(600,330,20,20)
  obstacle.scale=0.2;
  obstacle.velocityX = -6  
  obstacle.addImage(obstacleImage)
  obstacleGroup.add(obstacle)
  }
}