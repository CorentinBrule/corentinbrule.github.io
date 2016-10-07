var posYLunettes;
var posYMoustache;

var lunettes;
var moustaches=[];

var yeux=[];
var posYYeux;

function setup(){
   createCanvas(windowWidth,windowHeight);
   frameRate(20);

   background(255);
   
   posYLunettes = height/2-40;
   posYLunettesH=posYLunettes-10;
   posYLunettesB=posYLunettes+30;
   lunettes = new Lunettes(width/2,posYLunettes,90);

   posYYeux=height/2-40;
   yeux[0]=new Yeux(width/2-50,posYYeux);
   yeux[1]=new Yeux(width/2+50,posYYeux);

   posYMoustache=height/2+70;
   moustaches[0] = new Moustache(width/2,posYMoustache,90,true);
   moustaches[1] = new Moustache(width/2,posYMoustache,90,false);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  setup();
  //fonction de changement de taille du canvas selon la taille de l'écran
}

function draw(){

  background(255);

  //yeux
  var i=0;
  for(i;i<yeux.length;i++){
    yeux[i].update(mouseX,mouseY);
    yeux[i].display();
  }

  i=0;
  //moustaches
  for (i;i<moustaches.length;i++){
    moustaches[i].display();
    moustaches[i].update()
  }

  //Lunettes
  lunettes.display();
  lunettes.update();
  //Lunettes tombent

}

function mouseDragged(){
  if(mouseY<posYLunettesB && mouseY>posYLunettesH){
    lunettes.posY = constrain(mouseY,posYLunettesH,posYLunettesB);
  }
  var i=0;
  for (i;i<moustaches.length;i++){
    if(mouseY>moustaches[i].posY-20 && mouseY<moustaches[i].posY+30){
      if(pmouseY-mouseY<0){
        moustaches[i].velocity+=1;
      }
      if(pmouseY-mouseY>0){
        moustaches[i].velocity-=1;
      }
      println(pmouseY-mouseY);

    }
  }
}

class Lunettes{
  constructor(posX,posY,rayon){
    this.posX = posX;
    this.posY = posY;
    this.rayon = rayon;
  }
  display(){
    noFill();
    stroke(0);
    strokeWeight(5);
    ellipse(this.posX-60,this.posY,this.rayon,this.rayon);
    ellipse(this.posX+60,this.posY,this.rayon,this.rayon);
    bezier(this.posX-60+45 , this.posY-10 , this.posX-60+45+10 , this.posY-20 , this.posX+60-45-10 , this.posY-20 , this.posX+60-45 , this.posY-10);
    line(this.posX-60-45 , this.posY-10 , this.posX-60-45-50 , this.posY-10);
    line(this.posX+60+45 , this.posY-10 , this.posX+60+45+50  , this.posY-10);
  }
  update(){
    if (lunettes.posY<posYLunettes+20){
      lunettes.posY+=1;
    }
  }
}

class Moustache{
  constructor(posX,posY,long,left){
    this.posX = posX;
    this.posY = posY;
    this.long = long;
    this.l = left;
    this.angle = 10;
    this.velocity=random(-2,2);
  }
  display(){
    stroke(0);
    strokeWeight(5);
    if (this.l==true){
      line(this.posX+10 , this.posY , this.posX+cos(radians(this.angle))*this.long , this.posY+sin(radians(this.angle))*this.long);
    }
    else{
      line(this.posX-10 , this.posY , this.posX-cos(radians(this.angle))*this.long , this.posY+sin(radians(this.angle))*this.long);
    }
  }
  update(){
    this.angle+=this.velocity;
    this.velocity*=0.95;

    if(this.angle>30||this.angle<-20){
      this.velocity*=-1;
    }
  }
}

class Yeux{
  constructor(posX,posY){
    this.posX=posX;
    this.posY=posY;
    this.angle=0;
    this.distX=0;
    this.distY=0;
    this.rayon=20;
  }
  display(){
    ellipseMode(CENTER);
    fill(0);
    ellipse(this.posX,this.posY,this.rayon*2,this.rayon*2);

    applyMatrix();
    translate(this.distX,this.distY);
    noStroke();
    fill(255);
    ellipse(0 , 0 , this.rayon , this.rayon);
    resetMatrix();

  }
  update(X,Y){
    this.distX=constrain(X,this.posX-this.rayon/2,this.posX+this.rayon/2);
    this.distY=constrain(Y,this.posY-this.rayon/2,this.posY+this.rayon/2);
  }
}
