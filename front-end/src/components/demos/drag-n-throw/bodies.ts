import Matter from "matter-js";

const { Bodies } = Matter;

const bodies: Matter.Body[] = [];

var boxA = Bodies.rectangle(400, 200, 80, 80, { restitution: 0.8 });
var boxB = Bodies.rectangle(450, 50, 80, 80, { restitution: 0.8 });
var triangle = Bodies.polygon(300, 100, 3, 60, { restitution: 0.8 });
bodies.push(boxA, boxB, triangle);

export default bodies;
