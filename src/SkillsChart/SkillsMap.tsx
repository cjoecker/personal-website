import Matter from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';

import { useEffectUnsafe } from '../unsafeHooks';

interface SkillsMapProps {
  skills: SkillsType[];
}

interface SkillsType {
  skillName: string;
  level: number;
}

const BOUNCINESS = 0.7;

export default function SkillsMap({ skills }: SkillsMapProps) {
  const boxRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [constraints, setConstraints] = useState<any>();
  const [render, setScene] = useState<any>();
  const handleResize = () => {
    setConstraints(boxRef.current.getBoundingClientRect());
  };

  useEffectUnsafe(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const engine = Engine.create({});
    const render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        background: 'transparent',
        wireframes: false,
      },
    });

    World.add(
      engine.world,
      getWorldWalls(boxRef.current.getBoundingClientRect())
    );

    const mouse = Matter.Mouse.create(canvasRef.current);
    mouse.pixelRatio = 3;
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
    });
    World.add(engine.world, mouseConstraint);


    // const mouse = Matter.Mouse.create(render.canvas),
    //     mouseConstraint = Matter.MouseConstraint.create(engine, {
    //       mouse: mouse,
    //       constraint: {
    //         stiffness: 0.2,
    //         render: {
    //           visible: false
    //         }
    //       }
    //     });
    //
    // World.add(engine.world, mouseConstraint);
    //
    // Matter.Events.on(mouseConstraint, "mousedown", function() {
    //   World.add(engine.world, Matter.Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Runner.run(engine);
    Render.run(render);
    setConstraints(boxRef.current.getBoundingClientRect());
    setScene(render);
    window.addEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffectUnsafe(() => {
    if (render && skills && canvasRef.current) {
      const mouse = Matter.Mouse.create(canvasRef.current);
      const mouseConstraint = Matter.MouseConstraint.create(render.engine, {
        mouse: mouse,
      });
      Matter.World.add(render.engine.world, mouseConstraint);
    }
  }, [canvasRef.current]);

  useEffectUnsafe(() => {
    if (constraints) {
      const { width, height } = constraints;
      // Dynamically update canvas and bounds
      render.bounds.max.x = width;
      render.bounds.max.y = height;
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;
      // Dynamically update floor
      const floor = render.engine.world.bodies[0];
      // Matter.Body.setPosition(floor, {
      //   x: width / 2,
      //   y: height + STATIC_DENSITY / 2,
      // });
      // Matter.Body.setVertices(floor, [
      //   { x: 0, y: height },
      //   { x: width, y: height },
      //   { x: width, y: height + STATIC_DENSITY },
      //   { x: 0, y: height + STATIC_DENSITY },
      // ]);
    }
  }, [render, constraints]);
  useEffectUnsafe(() => {
    const CIRCLES_SIZE = 5;
    const timeouts: Array<NodeJS.Timeout> = [];
    if (render && skills) {
      skills.forEach(skill => {
        const { width } = constraints;
        const randomX = Math.floor(Math.random() * -width) + width;
        timeouts.push(
          setTimeout(() => {
            Matter.World.add(
              render.engine.world,
              Matter.Bodies.circle(
                randomX,
                -skill.level * CIRCLES_SIZE,
                skill.level * CIRCLES_SIZE,
                {
                  restitution: BOUNCINESS,
                }
              )
            );
          }, Math.random() * (200 - 0))
        );
      });
    }

    return () => {
      if (timeouts) {
        timeouts.forEach(t => clearTimeout(t));
      }
    };
  }, [skills, render]);

  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid white',
        padding: '8px',
        height: '500px',
        width: '500px'
      }}
    >
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

function getWorldWalls(constraints: any) {
  const { width, height } = constraints;
  const wallThickness = 1;

  const options = {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  };

  const leftWall = Matter.Bodies.rectangle(
    -wallThickness / 2,
    height / 2,
    wallThickness,
    height,
    options
  );
  const rightWall = Matter.Bodies.rectangle(
    width + wallThickness / 2,
    height / 2,
    wallThickness,
    height,
    options
  );
  const floor = Matter.Bodies.rectangle(
    width / 2,
    height + wallThickness / 2,
    width,
    wallThickness,
    options
  );

  return [
    // Matter.Bodies.rectangle(width/2, 0, width, 50, { isStatic: true }),
    floor,
    rightWall,
    leftWall,
  ];
}
