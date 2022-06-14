var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    
var engine;
var world;
var umgebung;

var breite = 350;
var hoehe = 600;

var kugeln = new Kugeln();

var hindernissRadius = 10;
var hindernissAbstandVonOben = 30;

var anzahlFramesZwischenKugeln = 3;
var elastizitaet = 0.7 //Zwischen 0 und 1


function setup() {
  createCanvas(breite, hoehe);
  engine = Engine.create();
  world = engine.world;
  engine.enableSleeping = true;

  umgebung = new Umgebung();
  button = createButton('reset');
  button.position(breite-50, 1);
  button.mousePressed(reset);
}

function draw() {
  let beige = '#f5efe0';
  background(beige);

  if(zeitFuerEineKugel() && kugeln.maximumNichtErreicht()){
    kugeln.hinzufuegen();
  }
  
  Engine.update(engine);

  kugeln.draw();
  umgebung.draw();
  text(kugeln.anzahl(), 10,10);
}

function zeitFuerEineKugel(){
  return frameCount % anzahlFramesZwischenKugeln == 0;
 }

 function reset(){
   kugeln.reset();
 }