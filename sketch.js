var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    
var engine;
var world;

var breite = 600;
var hoehe = 600;
var zeilen = 14;
var spalten = 10;

var kugeln = [];
var kugelRadius = 4;
var kugelnMaximum = 1000;

var hindernisse = [];
var hindernissRadius = 16;
var hindernissAbstandVonOben =  60;

var pfostenhoehe = 200;

var grenzen = [];
var abstandX = breite/spalten;
var abstandY = (hoehe-hindernissAbstandVonOben-pfostenhoehe+2*hindernissRadius)/zeilen;

var anzahlFramesZwischenKugeln = 10;
var elastizitaet = 0.6 //Zwischen 0 und 1
var erdanziehung = 1;

// TODO: Konstanten rausziehen

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class Kugel {
  constructor(x, y, radius) {
    var options = {
      restitution : elastizitaet, 
      friction: 0,
    }
    var rauschen = getRndInteger(-2, 2);
    this.body = Bodies.circle(x+rauschen, y, radius, options);
    this.radius = radius;
    World.add(world, this.body);
  }

  show() {
    let plum = color(221, 160, 221);
    fill(plum);
    noStroke();
    var pos = this.body.position;
    circle(pos.x, pos.y, this.radius*2);
  }
}

// TODO: Vererbung einfügen
class Hinderniss {
  constructor(x, y, radius) {
    var options = {
      isStatic: true,
      restitution : elastizitaet, 
      friction: 0,
    }
    this.body = Bodies.circle(x, y, radius, options);
    this.radius = radius;
    World.add(world, this.body);
  }

  show() {
    let lightGrey = color(119, 136, 153);
    fill(lightGrey);
    noStroke();
    var pos = this.body.position;
    circle(pos.x, pos.y, this.radius*2);
  }
}

class Grenze{
  constructor(x, y, breite, hoehe){
    var options = {
      isStatic: true
    }
    this.body = Bodies.rectangle(x+breite/2, y+hoehe/2, breite, hoehe, options);
    World.add(world, this.body); 
    this.hoehe = hoehe;
    this.breite = breite
  }
  show() {
    let lightGrey = color(119, 136, 153);
    fill(lightGrey);
    noStroke();
    var pos = this.body.position;
    rect(pos.x - this.breite/2, pos.y-this.hoehe/2, this.breite, this.hoehe);
  }
}

function setup() {
  
  createCanvas(breite, hoehe);
  engine = Engine.create();
  world = engine.world;
  engine.gravity.y = erdanziehung;

  var boden = new Grenze(0, hoehe -10, breite, 10);
  grenzen.push(boden);
    

  for(var zeile=0; zeile<zeilen; zeile++){
    for(var spalte=0; spalte<spalten+1; spalte++){
      var verschiebung = 0;
      if(zeile%2!=0){
        verschiebung = +abstandX/2;
      }
      var neuesHinderniss = new Hinderniss(abstandX*spalte+verschiebung, abstandY*zeile+hindernissAbstandVonOben, hindernissRadius);
      hindernisse.push(neuesHinderniss);
    }
  }

  for(var spalte=0; spalte<spalten+1; spalte++){
    var verschiebung = 0;
      if(zeilen-1%2!=0){
        verschiebung = +abstandX/2;
      }
    var neueGrenze = new Grenze(abstandX*spalte-hindernissRadius+verschiebung, hoehe - pfostenhoehe, hindernissRadius*2, pfostenhoehe);
    grenzen.push(neueGrenze);
  }
}

function draw() {
  if(frameCount % anzahlFramesZwischenKugeln == 0 && kugeln.length<kugelnMaximum){
    var neueKugel = new Kugel(breite / 2, 0, kugelRadius);
    kugeln.push(neueKugel);
  }
  background('#f5efe0');
  Engine.update(engine);

   
  for(var i=0; i< kugeln.length; i++){
    kugeln[i].show();
  }

  for(var i=0; i<hindernisse.length; i++){
    hindernisse[i].show();
  }
  grenzen.forEach(grenze => grenze.show());
  grenzen[0].show();

  text(kugeln.length, 30,10);
}

