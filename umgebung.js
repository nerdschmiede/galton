class Umgebung {
  constructor() {
    this.grenzen = [];
    this.hindernisse = []

    var boden = new Grenze(0, hoehe - 20, breite, 20);
    this.grenzen.push(boden);

    var spalten = 37;
    var zeilen = 21;
    var abstand = 8;
    var hindernissRadius = 4;
    var pfostenhoehe = 250;


    for (var spalte = 0; spalte < spalten + 1; spalte++) {
      var neueGrenze = new Grenze((abstand*2)* spalte - hindernissRadius, hoehe-pfostenhoehe, hindernissRadius * 2, pfostenhoehe);
      this.grenzen.push(neueGrenze);
    }

    for(var zeile=0; zeile<zeilen; zeile++){
      for(var spalte=0; spalte<spalten+1; spalte++){
        var verschiebung = 0;
        if(zeile%2!=0){
          verschiebung = abstand;
        }
        var neuesHinderniss = new Hinderniss((abstand*2)*spalte+verschiebung, (abstand*2)*zeile+hindernissAbstandVonOben, hindernissRadius);
        this.hindernisse.push(neuesHinderniss);
      }
    }
  }

  draw() {
    let lightGrey = color(119, 136, 153);
    this.grenzen.forEach(element => element.draw(lightGrey));
    this.hindernisse.forEach(element => element.draw(lightGrey));
  }
}

class Grenze {
  constructor(x, y, breite, hoehe) {
    var options = {
      isStatic: true
    }
    this.body = Bodies.rectangle(x + breite / 2, y + hoehe / 2, breite, hoehe, options);
    World.add(world, this.body);
    this.hoehe = hoehe;
    this.breite = breite
  }
  draw(color) {
    fill(color);
    noStroke();
    var pos = this.body.position;
    rect(pos.x - this.breite / 2, pos.y - this.hoehe / 2, this.breite, this.hoehe);
  }
}

class Hinderniss {
  constructor(x, y, radius) {
    var options = {
      isStatic: true,
      restitution: elastizitaet,
      friction: 0,
    }
    this.body = Bodies.circle(x, y, radius, options);
    this.radius = radius;
    World.add(world, this.body);
  }

  draw(color) {
    fill(color);
    noStroke();
    var pos = this.body.position;
    circle(pos.x, pos.y, this.radius * 2);
  }
}
