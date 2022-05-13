var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    
var engine;
var world;

var breite = 600;
var hoehe = 600;
var zeilen = 9;
var spalten = 9;

var kugeln = [];
var kugelRadius = 4;
var kugelnMaximum = 500;

var hindernisse = [];
var hindernissRadius = 18;
var hindernissAbstandVonOben =  60;

var pfostenhoehe = 200;

var grenzen = [];
var abstandX = breite/spalten;
var abstandY = (hoehe-hindernissAbstandVonOben-pfostenhoehe+2*hindernissRadius)/zeilen;

var anzahlFramesZwischenKugeln = 10;
var elastizitaet = 0.6 //Zwischen 0 und 1
var erdanziehung = 1;

function setup() {
  createCanvas(breite, hoehe);
  engine = Engine.create();
  world = engine.world;
  engine.gravity.y = erdanziehung;
  engine.enableSleeping = true
  //https://github.com/liabru/matter-js/issues/280

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
      if(zeilen-1%2 == 0){
        console.log('hit');
        verschiebung = +abstandX/2;
      }
    var neueGrenze = new Grenze(abstandX*spalte-hindernissRadius+verschiebung,  abstandY*(zeilen-1)+hindernissAbstandVonOben, hindernissRadius*2, pfostenhoehe);
    grenzen.push(neueGrenze);
  }
}

function draw() {
  let beige = '#f5efe0';
  let lightGrey = color(119, 136, 153);
  let plum = color(221, 160, 221);

  background(beige);

  if(frameCount % anzahlFramesZwischenKugeln == 0 && kugeln.length<kugelnMaximum){
    var neueKugel = new Kugel(breite / 2, 0, kugelRadius);
    kugeln.push(neueKugel);
  }
  
  Engine.update(engine);

  kugeln.forEach(element => element.draw(plum));
  hindernisse.forEach(element => element.draw(lightGrey));
  grenzen.forEach(element => element.draw(lightGrey));

  text(kugeln.length, 10,10);
}

