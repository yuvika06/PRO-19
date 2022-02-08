// variables
var PLAY = 1 , END = 0 ,gameState = PLAY;
var monkey , monkeyRunning , monkeyCollided;
var  invisibleGround
var score , gameOver , restart;
var jumpSound , dieSound , checkPointSound;
var banana1 , banana2 , banana3;
var jungle, jungleImage;
var stone , stone_image , stoneGroup, stone1_image;
var gameOverImage, restartImage;
var bananaGroup;

function preload(){
  jungleImage = loadImage("i1.png");
  monkeyRunning = loadAnimation("Monkey_01.png" , "Monkey_02.png" ,"Monkey_03.png" ,"Monkey_04.png" ,"Monkey_05.png" ,"Monkey_06.png" ,"Monkey_07.png" , "Monkey_09.png" , "Monkey_10.png"  );
  monkeyCollided = loadImage("Monkey_01.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gm.png");
  banana1 = loadImage("b1.png");
  banana2 = loadImage("b2.png");
  banana3 = loadImage("b3.png");
  stone_image = loadImage("stone.png");
  stone1_image = loadImage("stone1.png");
  // jungleImage = loadImage("jungle.jpg" );
}

function setup(){
  createCanvas(800,400);
  
  
 // monkey.addAnimation("collided" , monkeyCollided);
 jungle = createSprite( 0,0, 800 ,400);
 jungle.addImage("jungle" , jungleImage);
 jungle.x = jungle.width/2;
 jungle.velocityX = -4;

 jungle.scale = 2.5;

 monkey = createSprite(40,300,20,50);
 monkey.addAnimation("running" , monkeyRunning);
 monkey.addImage("collided" , monkeyCollided);
 monkey.scale = 0.2;


 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImage);

 restart = createSprite(400 ,100);
 restart.addImage(restartImage);

 gameOver.scale = 0.2;
 restart.scale = 0.1;

 

 invisibleGround = createSprite(200 , 310,400,10);
 invisibleGround.visible = false;

stoneGroup = new Group();
 bananaGroup = new Group();
 score = 0;

 monkey.setCollider("circle", 0,0,20);
 monkey.debug = true;
}

function draw(){
  background("black");
  text("Score:" + score , 500,50);
  console.log("this is", gameState)

  if(gameState===PLAY){
    gameOver.visible = false;
    restart.visible = false;
    

    if(jungle.x <50){
      jungle.x = jungle.width/2;
    }
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && monkey.y >= 100){
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    

    monkey.collide(invisibleGround);
    spawnBanana;
    spawnStone;

    if(stoneGroup.isTouching(monkey)){
      gameState = END;
    }

    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
   }

  else if (gameState===END){
    gameOver.visible = true;
    restart.visible = true;

    jungle.velocityX= 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    stoneGroup.setVelocityXEach(0);
    stoneGroup.destroyEach();

    monkey.changeAnimation("collided" , monkeyCollided);

    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      reset();
    }
  }
   spawnBanana();
   spawnStone();
  
  drawSprites();
}


  function spawnBanana(){
    if(frameCount % 60 ===0){
      var banana = createSprite(600,100,10,40);
      banana.velocityX = -(6+3*score/100);

      var rand = Math.round(random(1,3));
      switch(rand){
        case 1: banana.addImage(banana1);
                break;
        case 2: banana.addImage(banana2);
                break;
        case 3: banana.addImage(banana3);
                break;
        default: break;        

      }

      banana.scale = 0.1;
      banana.lifetime = 300;
      bananaGroup.add(banana);

    }
  }

  function spawnStone(){
    if(frameCount%50 ===0){
      var stone2 = createSprite(200,100,10,20);
      stone2.velocityX = -3;

      var rand = Math.round.apply(random(1 , 2));
      switch(rand){
        case 1 : stone.addImage(stone_image);
                 break;
        case 2 : stone.addImage(stone1_image);
                 break;
      }
      // stone.scale = 0.2;
      // stone.lifetime = -1;
      // stoneGroup.add(stone);

    }
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

  
    monkey.changeAnimation("running" , monkeyRunning);
    score = 0;
  }





