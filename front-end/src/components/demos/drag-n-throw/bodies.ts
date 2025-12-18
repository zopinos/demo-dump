import Matter from "matter-js";

const { Bodies } = Matter;

const bodies: Matter.Body[] = [];

var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
bodies.push(boxA, boxB, ground);

export default bodies;
