function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

class Kugeln{
  constructor(){
    this.maximum = 500;
    this.kugeln = []
    this.kugelRadius = 4;

  }

  hinzufuegen(){
    var neueKugel = new Kugel(breite / 2, 0, this.kugelRadius);
    this.kugeln.push(neueKugel);
  }

  draw(){
    let plum = color(221, 160, 221);
    this.kugeln.forEach(element => element.draw(plum));
  }

  maximumNichtErreicht(){
    return this.kugeln.length < this.maximum;
  }

  anzahl(){
    return this.kugeln.length;
  }

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
  
    draw(color) {
      fill(color);
      noStroke();
      var pos = this.body.position;
      circle(pos.x, pos.y, this.radius*2);
    }
  }

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
  
    draw(color) {
      fill(color);
      noStroke();
      var pos = this.body.position;
      circle(pos.x, pos.y, this.radius*2);
    }
  }
  