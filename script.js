let ball;
let graph = [];
let massSlider, frictionSlider;

function setup() {
    createCanvas(700, 400);
  
    ball = new Particle(50, height / 2, 5);
  
    massSlider = createSlider(1, 10, 5);
    massSlider.position(20, 20);
    frictionSlider = createSlider(0, 0.1, 0.02, 0.01);
    frictionSlider.position(20, 50);
}

function draw() {
    background(240);

    let mass = massSlider.value();
    let friction = frictionSlider.value();
    ball.mass = mass;

    let force = createVector(0.2 * mass, 0);
    ball.applyForce(force);
    ball.applyFriction(friction);

    ball.update();
    ball.display();

    graph.push(ball.velocity.x);
    if (graph.length > width) graph.shift();

    stroke(0);
    noFill();
    beginShape();
    for (let i = 0; i < graph.length; i++) {
        vertex(i, height - graph[i] * 30);
    }
    endShape();

    drawVectors(ball, force);
}

function drawVectors(obj, force) {
    stroke(255, 0, 0);
    line(obj.position.x, obj.position.y, obj.position.x + force.x * 50, obj.position.y + force.y * 50);
}

class Particle {
    constructor(x, y, mass) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = mass;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    applyFriction(friction) {
        let frictionForce = this.velocity.copy().mult(-1).normalize().mult(friction);
        this.applyForce(frictionForce);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        fill(50);
        ellipse(this.position.x, this.position.y, this.mass * 10);
    }
}
