var PLAY = 1;
var END = 0;
var WIN;
var gameState = PLAY;

var score;

var obstacle,obstacle1,bostacle2,obstacle3,obstacleImage, obstacleGroup;

var coin,coinImage,coin0, coinGroup;

var player, playerImage, player0;

var cloud, cloudImage, cloud0, cloudGroup;

var firstaid, firstaidImage, firstaid0, firstaidGroup;

var restart,restartImage, restart0;

var coinSound, coin1;

var collidedSound, collided;

var edges;

var currentHeight;

var spaceImage, spaceImg, moonImage, moonImg, moon;

var cI;

var claimSound, claim;

function preload(){

  obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png");
  
  coinImage = loadImage("coin0.png");
  
  playerImage= loadAnimation("player0.png");
  
  cloudImage = loadImage("cloud0.png");
  
  firstaidImage = loadImage("firstaid0.png");

  restartImage = loadImage("restart0.png");
  
  coinSound = loadSound("coin1.wav");
  
  collided = loadSound("collided.wav");
  
  spaceImage = loadImage("spaceImg.jpg");

  moonImage = loadImage("moonImg.jpg");

  claimSound = loadSound("claim.wav");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
 player = createSprite(width/2,height/1.3,20,20);
 player.addAnimation("airplane",playerImage);
 player.scale = 0.7; 

 player.setCollider("rectangle",0,0,320,250);
 //player.debug = true;
  
  restart = createSprite(width/2.014,height/2.2,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.5
  restart.visible = false;

  coin2 = createSprite(width/1.28,height/9,20,20);
  coin2.addImage(coinImage);
  coin2.scale = 0.25;

  obstacleGroup = new Group();
  coinGroup = new Group();
  cloudGroup = new Group();
  firstaidGroup = new Group();

  score = 20;
  currentHeight = 0;
  cI = 0;

}

function draw() {
  
  background("cyan");
  
  if(gameState === PLAY){
    
    currentHeight = currentHeight + Math.round(2);

    if(keyDown("right")){
     player.velocityX = 6;
     }
  
  if(keyDown("left")){
     player.velocityX = -(6 + 3*score/100);
     }
  
  edges = createEdgeSprites();
  
  player.bounceOff(edges);

  spawnobstacles();
  spawncoins();
  spawnclouds();
  spawnfirstaid();

    if(coinGroup.isTouching(player)){
      
       coinGroup[0].destroy();
    
       coinSound.play();

       cI = cI + 1;
      
         }
      
    
    if(obstacleGroup.isTouching(player)){
       
      
      score = score-1;
  
      obstacleGroup[0].destroy();

      collided.play();
      
    }  

    if(firstaidGroup.isTouching(player) && score < 20){
       
      
      score = score+0.5;
  
      firstaidGroup[0].destroy();

      claimSound.play();
      
    }  

    if(obstacleGroup.isTouching(firstaidGroup)){
       
      firstaidGroup[0].destroy();
    }  

    if(currentHeight === 5000){

      gameState = WIN;

    }

  }

  if(gameState === WIN){

    win();

    strokeWeight(5);
    stroke(0);
    fill("yellow");
    textSize(30);
    text("Hurray! You reached on the moon", width/2.65,height/3);    

  }

  if(score === 0){

    gameState = END;

  }
  
    if(gameState === END){

    player.velocityX = 0;
    player.velociyY = 0;
    
    player.destroy();
     
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityYEach(0);
      
    coinGroup.setVelocityXEach(0);
    coinGroup.setVelocityYEach(0);
      
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setVelocityYEach(0);
  
    obstacleGroup.destroyEach();
    coinGroup.destroyEach();
    cloudGroup.destroyEach();
    firstaidGroup.destroyEach();

    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
    
    
    strokeWeight(5);
    stroke(0);
    fill("yellow");
    textSize(30);
    text("Game Over",width/2.2,height/2.5);
    
    }

  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Player health : " + score, width/1.3,height/15);

  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Press right and left arrow key", width/2.5,height/15);
  
  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Current height (in km) : " + currentHeight, width/25,height/15);

  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Cover 5000 km height to reach on moon", width/25,height/8);

  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text(": " + cI, width/1.25,height/8.5);

  drawSprites();
 
}

function spawnobstacles(){
  
  if(frameCount%27 === 0){
     
    obstacle = createSprite(1000,-5,20,20);
    obstacle.addAnimation("falling",obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.x = Math.round(random(4,width/1.01));
    
    obstacle.velocityY = (8 + 3*score/100);
    
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);

     }
}


function spawncoins(){
  
  if(frameCount%27 === 0){
     
   coin = createSprite(100,-5,20,20);
   coin.addImage(coinImage);
   coin.scale = 0.2;

   coin.x = Math.round(random(5,width/1.01));
    
   coin.velocityY = (8 + 3*score/100);
    
   coin.lifetime = 400;
  
   coinGroup.add(coin);

     }
}

function spawnclouds(){
  
  if(frameCount%50 === 0){
     
   cloud = createSprite(650,-5,20,20);
  cloud.addImage(cloudImage);
  cloud.scale = 1;
    
    cloud.x = Math.round(random(6,width/1.01));
    
    cloud.velocityY = (7 + 3*score/100);

    cloud.lifetime = 400;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
  
   cloudGroup.add(cloud);
    
     }
}


function spawnfirstaid(){
  
  if(frameCount%100 === 0){
     
   firstaid = createSprite(650,-5,20,20);
   firstaid.addImage(firstaidImage);
   firstaid.scale = 0.2;
    
    firstaid.x = Math.round(random(1,width/1.01));
    
    firstaid.velocityY = (7 + 3*score/100);

    firstaid.lifetime = 400;
    
    firstaid.depth = player.depth;
    firstaid.depth = player.depth + 1;
  
    firstaidGroup.add(firstaid);
    
     }
  
  }

function reset(){
  gameState = PLAY;
  
 player = createSprite(width/2,height/1.3,20,20);
 player.addAnimation("airplane",playerImage);
 player.scale = 0.7;

 restart.visible = false;
  
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  
  score = 20;
  cI = 0;
  currentHeight = 0;

}

function win(){

  restart.visible = false;

  moon = createSprite(width/2,height/2,20);
  moon.addImage(moonImage);

  player.destroy();
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  cloudGroup.destroyEach();
  firstaidGroup.destroyEach();

  background(spaceImage);

}