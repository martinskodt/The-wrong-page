let objarray = [];
let data;
let imgData;
let obj;
let n = 0; // nummer af objekt vi er nået til
let rightPadding = 20;

let xLine;
let yLine;
let plet;
let cnv;
let tal = 10;
let objTitle;
let objDesc;

let startObj = {
  Objectname: "Name of the next object",
  Madeby: "Who made the object",
  TargetAudience: "Who is the object made for?",
  Description: "This is where an informational description of the object wil be. Please read this before deciding on your score.",
  Imagepath: "Start"
}

let punkt;

let xScale;
let yScale;
let xScaleValue;
let yScaleValue;
let points = [];

let nulP = [50, 720]; //x,y
let koorXSlut = 845;
let koorYSlut = 50;

function preload() {
data = loadJSON("DOsheet.json");

}

function setup() {
cnv = createCanvas(890,900);
  drawGrid();

  obj = data[n];

cnv.mousePressed(press);
descBox(startObj);

}

function press(){

xScaleValue = map(mouseX, nulP[0],koorXSlut, 0,100, false)
xScaleValue = floor(xScaleValue);

yScaleValue = map(mouseY, nulP[1], 68, 0,100, false)
yScaleValue = floor(yScaleValue);

punkt = new ObjectPoint(mouseX,mouseY);
points.push(punkt);

n = n + 1;
obj = data[n];

descBox(data[n+1]);
  }

function drawGrid(){
  background(100);
  // Koordinatsystem linjer
  stroke(225);
  strokeWeight(4);
    xLine = line(nulP[0], nulP[1], koorXSlut, nulP[1]);
    triangle(koorXSlut,nulP[1]-5,koorXSlut,nulP[1]+5,koorXSlut+5,nulP[1])

    yLine = line(nulP[0], nulP[1], nulP[0], koorYSlut);
    triangle(45, 50, 55, 50, 50, 45);

    //grid
          // vandrette streger
          for (var i = nulP[1]; i > koorYSlut; i = i - 13) {
           strokeWeight(1);
           stroke(205);
          line(nulP[0], i, koorXSlut, i);
         }
        //lodrette streger
        for (var i = nulP[0]; i <= koorXSlut; i = i + 13) {

         strokeWeight(1);
         stroke(205);
        line(i, nulP[1], i, koorYSlut);

      }
      // grid tal X-aksen
      for (var i = nulP[0]+74; i <= koorXSlut; i = i + 80) {
        fill(205);
        text(tal, i, nulP[1]+25);
          tal = tal + 10;
      }
      tal = 10;
      // Y aksen
      for (var i = nulP[1]-65; i >= koorYSlut; i = i - 65) {
        fill(205);
        text(tal, nulP[0]-25, i);
          tal = tal + 10;
      }

  //tekst
  textAlign(LEFT);
  textSize(12);
  fill(225);
  text("Digital", koorXSlut + 12, nulP[1] + 3)
  text("Analog",3, nulP[1]-8, nulP[0], 50 );
  textAlign(CENTER);
  text("Userfriendly",nulP[0], nulP[1] + 25);
  text("Userhostile",nulP[0], koorYSlut - 25);

  //Box
  fill(255);
  rect(130,760,600,130);

  }
function descBox(nextObj){
  this.nextObj = nextObj;
  fill(255);
  rect(130,760,600,130);
  fill(0);
  textSize(20);
  textAlign(LEFT);
let objTitle = text(nextObj.Objectname, 280,785);
  textSize(11);
let objDesc = text(nextObj.Description, 280,790,450,95);
imgData = loadImage("assets/Imagefiles/"+ nextObj.Objectname +".jpg",function(){image(imgData,140,770,130,110)});


}

function ObjectPoint(x,y){
    this.x = x;
    this.y = y;

  if (x >= nulP[0] && x <= koorXSlut && y <= nulP[1] && y >= koorYSlut) {
    strokeWeight(4);
    stroke("red");

  //kryds
  color("red");
    line(x-10,y,x+10,y);
  color("blue")
    line(x,y-10,x,y+10);
    // tekst
    strokeWeight(40);
    stroke("White");
    line(x-35, y+32, x+35, y+32);
    noStroke();
    fill(0);
    textAlign(CENTER);
    text(obj.Objectname, x, y+25);
    //skrive Y værdi til konsol og begrænse til 0-100
      if (yScaleValue > 100) {
        yScaleValue = 100;
        console.log(" Y værdi " + yScaleValue)
      } else if (yScaleValue < 0) {
        yScaleValue = 0;
        console.log(" Y værdi " + yScaleValue)
      } else {
        console.log(" Y værdi " + yScaleValue)
      }
    //skrive X værdi til konsol og begrænse til 0-100
      if (xScaleValue > 100) {
        xScaleValue = 100;
        console.log(" X værdi " + xScaleValue)
      } else if (xScaleValue < 0) {
        xScaleValue = 0;
        console.log(" X værdi " + xScaleValue)
      } else {
        console.log(" X værdi " + xScaleValue)
      }

    text("DI-AN: " + xScaleValue + "  UH-UF: " + yScaleValue, x, y+38);


  }


  }




 /*
 Liste af funktionaliteter der skal bygges
 - Introduktion af ideen og formålet med spillet (tekst)
 - Gridded skal have 100 x-linjer * 50 y-linjer hele tiden også når vinduet resize
 - Objekt kort template skal designes
 - Importering af CSV / Json fil af objekterne
 - Objekterne skal gøres til justerbare objekter i koordinatsystemet
- farvelæg x og y aksesen
- if statement så man ikke kan gentage punkt

*/
