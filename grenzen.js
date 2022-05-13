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
  draw(color) {
    fill(color);
    noStroke();
    var pos = this.body.position;
    rect(pos.x - this.breite/2, pos.y-this.hoehe/2, this.breite, this.hoehe);
  }
}
