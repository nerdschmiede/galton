var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    
var engine;
var world;
var umgebung;

var breite = 600;
var hoehe = 600;
var zeilen = 9;
var spalten = 9;

var kugeln = new Kugeln();

var hindernissRadius = 18;
var hindernissAbstandVonOben =  60;

var pfostenhoehe = 200;

var anzahlFramesZwischenKugeln = 10;
var elastizitaet = 0.6 //Zwischen 0 und 1


function setup() {
  createCanvas(breite, hoehe);
  engine = Engine.create();
  world = engine.world;
  engine.enableSleeping = true

  umgebung = new Umgebung();
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