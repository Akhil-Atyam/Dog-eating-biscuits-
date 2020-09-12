//Create variables here
var dog,happyDogImage,dogImage,database,foodS,foodStock,bark,nom,timer2;
var timer = null;

function preload()
{
  happyDogImage = loadImage("cookiedog2.png");
  dogImage = loadImage("hungrydog.png");
  bark = loadSound("Dog1.wav");
  nom = loadSound("recording1.wav");
  
}

function setup() {
  createCanvas(1280, 500);
  dog = createSprite(width/2,height/2+50,1,1);
  dog.addImage(dogImage);
  dog.scale = 0.4;
  database = firebase.database();
  foodStock = database.ref('Food');
  console.log(foodStock + "");
  foodStock.on('value',readStock);
 // foodStock.on("value",20);
  
}



 function draw() {  
   if(timer === null){
    bark.play();
    timer = 0;
   }
  background("rgb(46,139,87)")
  drawSprites();
  textSize(30)
  fill("white");
  text("Biscuit packs left : " + foodS,20,50);
  text("Press the up arrow to feed the dog biscuits !",660,50)
  //add styles here
  if(keyWentDown(UP_ARROW)){
    if(foodS != 0){
      nom.play();
      dog.addImage(happyDogImage);
      }
    writeStock(foodS);
    timer = 60;
    
  }
  if(timer > 0){
    if (foodS != 0) {
      
      
    }
    timer = timer - 1
  }else{
    dog.addImage(dogImage);
    
  }
  if(timer === 1){
    bark.play();
  }
  if(timer2 < 0){
  timer2 = timer2 - 1;
  
  }
  }

function readStock(dat){ 
  //console.log(data.val());
  foodS = dat.val();
  console.log(foodS);
}
function writeStock(x){
  if(x >= 1){
    x = x - 1;
  }else{
    database.ref("/").set({
      Food:20
    })
    x = 20;
   // for (var a = 0; a < 10000; a++) {
      fill("black");
      textSize(200);
      text("Refilling...",250,250);
      
  //  }
    //text("Refilling...",300,200);
   
    timer2 = 600
  }
  
  database.ref("/").set({
    Food:x
  })
}
