const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var thunder, thunder1,thunder2,thunder3,thunder4;
var batimg,bat;


var engine, world;

var rand;
var drops = [];
var maxDrops = 100;


var thunderCreatedFrame=0;

function preload(){
    thunder1 = loadImage("1.png");
    thunder2 = loadImage("2.png");
    thunder3 = loadImage("3.png");
    thunder4 = loadImage("4.png");

    batimg = loadImage("bat.png");

    manimg=loadAnimation("walking_1.png","walking_2.png","walking_3.png","walking_4.png","walking_5.png",
    "walking_6.png","walking_7.png","walking_8.png")
   
}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(400,700);
   man = createSprite(200,550);
   man.addAnimation("move",manimg);
   man.scale=0.5;

    //create drops
    if(frameCount % 150 === 0){

        for(var i=0; i<maxDrops; i++){
            drops.push(new Raindrops(random(0,400), random(0,400)));
        }

    }
        
}

function draw(){
    Engine.update(engine);
    background(0); 

    //creating thunder
    rand = Math.round(random(1,4));
    if(frameCount%80===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(10,370), random(10,30), 10, 10);
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.3,0.6)
    }

    bat= createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addImage(batimg);
    bat.visible = false;
    if(frameCount % 100 === 0){
       bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
        
       
    }
    

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }


    //display rain drops
   for(var i = 0; i<maxDrops; i++){
        drops[i].display();
        drops[i].update()
        
    }

    drawSprites();
}   

