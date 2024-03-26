var steve, steveImg
var alex, alexImg
var backgroundy, bg
var ground
var nukeyFun, NFImg, missles
var gamestate
var netheriteSwordImg, netheriteSword
var trollFace


function preload(){
 steveImg = loadImage("Steve.png")
 backgroundy = loadImage("bg.jpg") 
 alexImg = loadImage("alex.png")
 NFImg = loadImage("images.jpg")
 netheriteSwordImg = loadImage("steveSweared.png")
 trollFace = loadImage("TrollFace.jpg")
}



function setup(){
    createCanvas(800, 400) ;
    
    bg = createSprite(400, 200);
    bg.addImage(backgroundy)
    bg.scale = 3.25

    steve = createSprite(50, 325)
    steve.addImage(steveImg)
    steve.scale = 0.6
    steve.debug= false;
    steve.setCollider("rectangle",0,0,150,150)

    alex = createSprite(700, 325)
    alex.addImage("play",alexImg)
    alex.addImage("win",trollFace )
    alex.scale = 0.6
    alex.debug= false;
    alex.setCollider("rectangle",0,0,150,150)

    ground = createSprite(400,350, 800, 10)
    ground.visible = false;

    alex.y = steve.y

    missles = createGroup()

    gamestate = "Play"
    netheriteSword= createSprite(steve.x+50, steve.y-10)
    netheriteSword.addImage(netheriteSwordImg)
    netheriteSword.scale=0.04;
    netheriteSword.visible = false
}

function draw(){
    
    background("black");
    drawSprites();
    steve.collide(ground)   
    if(gamestate == "Play"){
        
        if(keyDown("SPACE")){
            netheriteSword.visible = true;
            netheriteSword.x= steve.x+50;
            netheriteSword.y= steve.y-10
            if(netheriteSword.isTouching(alex)){
                gamestate = "wi"
            }
        }
        else{
            netheriteSword.visible = false
        }

        if(keyDown(RIGHT_ARROW) && steve.x < 800){
            steve.x += 20
        }
        if(keyDown(LEFT_ARROW) && steve.x > 0){
            steve.x -= 20
        }
        if(keyDown(UP_ARROW) && steve.y >250){
            steve.velocityY = -15
        
            
        }
        if(frameCount% 15== 0 ){
            nukeyFun = createSprite(alex.x, alex.y)
            nukeyFun.addImage(NFImg)
            nukeyFun.scale = 0.125
            nukeyFun.velocityX = -35
            missles.add(nukeyFun)
        }
        var rand= random(1, 100)
        if(frameCount % 30 == 0){
            var rand2 = Math.round(random(1,2))
            if(rand2 == 1) {
                var randDist = random(1, 40)
                for(var i= 0; i<randDist; i++){
                    alex.x -= 2;
                }
            }
            else {
                var randDist = random(1, 40)
                for(var i= 0; i<randDist; i++){
                    alex.x += 2;
                }


            }
        }


        if(missles.isTouching(steve)){
           gamestate = "steveSweared"
        }


        
    }
    else if(gamestate == "steveSweared"){
        fill("red")
        textSize(30)
        text("#%&$%^%$", steve.x, steve.y)
        textSize(50)
        text("YOU DIED !!!!", random(0,800), random(0,400))
    }
    else{
        alex.changeImage("win")
        fill("red")
        textSize(30)
        text("My life has has no meaning", steve.x-300, steve.y)
        textSize(50)
        text("I WONNNNNN !!!!", random(0,800), random(0,400))
        
    }
    
    alex.y = steve.y

   
   steve.velocityY += 1
   
    
    
}

