import Matter from 'matter-js';

export function getWorldWalls(constraints: unknown, wallsThickness: number) {
  const { width, height } = constraints as { width: number; height: number };

  const options = {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  };

  const topWall = Matter.Bodies.rectangle(
    width / 2,
    -wallsThickness / 2,
    width,
    wallsThickness,
    options
  );
  const rightWall = Matter.Bodies.rectangle(
    width + wallsThickness / 2,
    height / 2,
    wallsThickness,
    height,
    options
  );
  const bottomWall = Matter.Bodies.rectangle(
    width / 2,
    height + wallsThickness / 2,
    width,
    wallsThickness,
    options
  );
  const leftWall = Matter.Bodies.rectangle(
    -wallsThickness / 2,
    height / 2,
    wallsThickness,
    height,
    options
  );
  return [topWall, rightWall, bottomWall, leftWall];
}
