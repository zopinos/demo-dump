import Matter from "matter-js";

const initPhysics = (canvas: HTMLCanvasElement): (() => void) => {
  const { Engine, World, Mouse, MouseConstraint, Bodies } = Matter;

  const engine = Engine.create();
  const world = engine.world;

  const context = canvas.getContext("2d")!;

  // Add walls to borders of the canvas
  const createWalls = () => {
    const wallThickness = 100;
    const wallOptions = { isStatic: true, restitution: 1.0, friction: 0, frictionStatic: 0 };
    return [
      // Top
      Matter.Bodies.rectangle(canvas.width / 2, -wallThickness / 2, canvas.width, wallThickness, wallOptions),
      // Bottom
      Matter.Bodies.rectangle(
        canvas.width / 2,
        canvas.height + wallThickness / 2,
        canvas.width,
        wallThickness,
        wallOptions
      ),
      // Left
      Matter.Bodies.rectangle(-wallThickness / 2, canvas.height / 2, wallThickness, canvas.height, wallOptions),
      // Right
      Matter.Bodies.rectangle(
        canvas.width + wallThickness / 2,
        canvas.height / 2,
        wallThickness,
        canvas.height,
        wallOptions
      )
    ];
  };

  var walls: Matter.Body[] = [];

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    World.remove(world, walls);
    walls = createWalls();
    World.add(world, walls);
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  // Add bodies to the world
  const bodies: Matter.Body[] = [];

  var boxA = Bodies.rectangle(canvas.width / 2, canvas.height / 2, 80, 80, { restitution: 0.8 });
  var boxB = Bodies.rectangle(canvas.width / 2 - 200, canvas.height / 2 - 250, 80, 80, { restitution: 0.8 });
  var triangle = Bodies.polygon(canvas.width / 2 + 120, canvas.height / 2 + 250, 3, 60, { restitution: 0.8 });
  bodies.push(boxA, boxB, triangle);

  World.add(world, bodies);

  for (const body of world.bodies) {
    if (body.isStatic) continue;

    body.frictionAir = 0.001;

    Matter.Body.setVelocity(body, {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5
    });

    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.007);
  }

  engine.gravity.y = 0.0;

  const mouse = Mouse.create(canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });

  World.add(engine.world, mouseConstraint);

  let lastTime = performance.now();

  const frame = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;

    Engine.update(engine, delta);
    drawWorld(context, world);

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);

  return () => {
    World.clear(world, false);
    Engine.clear(engine);
    window.removeEventListener("resize", handleResize);
  };
};

const drawWorld = (context: CanvasRenderingContext2D, world: Matter.World) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  for (const body of world.bodies) {
    drawBody(context, body);
  }
};

const drawBody = (context: CanvasRenderingContext2D, body: Matter.Body) => {
  const { position, angle, vertices } = body;

  context.save();
  context.translate(position.x, position.y);
  context.rotate(angle);

  context.beginPath();
  context.moveTo(vertices[0].x - position.x, vertices[0].y - position.y);

  for (let i = 1; i < vertices.length; i++) {
    context.lineTo(vertices[i].x - position.x, vertices[i].y - position.y);
  }

  context.closePath();

  context.strokeStyle = "#ffffffff";
  context.lineWidth = 2;
  context.stroke();

  context.restore();
};

export default initPhysics;
