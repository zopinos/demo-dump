import bodies from "./bodies";
import Matter from "matter-js";

const initPhysics = (canvas: HTMLCanvasElement): (() => void) => {
  const { Engine, World, Mouse, MouseConstraint } = Matter;

  const engine = Engine.create();
  const world = engine.world;

  const context = canvas.getContext("2d")!;

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  World.add(world, bodies);

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
