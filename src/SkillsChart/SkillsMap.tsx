import Matter, {Composite, Mouse, MouseConstraint} from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';

import { useEffectUnsafe } from '../unsafeHooks';
import styled from "styled-components";

interface SkillsMapProps {
  skills: SkillsType[];
}

interface SkillsType {
  skillName: string;
  level: number;
}

const BOUNCINESS = 0.7;
const WALLS_THICKNESS = 10;

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

    const mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.1,
            render: {
              visible: false
            }
          }
        });

    World.add(engine.world, mouseConstraint);

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
    if (constraints) {
      const { width, height } = constraints;

      render.bounds.max.x = width;
      render.bounds.max.y = height;
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;

      const topWall = render.engine.world.bodies[0];
      Matter.Body.setPosition(topWall, {
        x: width / 2,
        y: -WALLS_THICKNESS / 2,
      });
      Matter.Body.setVertices(topWall, [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: WALLS_THICKNESS },
        { x: 0, y: WALLS_THICKNESS },
      ]);

      const rightWall = render.engine.world.bodies[1];
      Matter.Body.setPosition(rightWall, {
        x: width + WALLS_THICKNESS / 2,
        y: height / 2,
      });
      Matter.Body.setVertices(rightWall, [
        { x: 0, y: 0 },
        { x: WALLS_THICKNESS, y: 0 },
        { x: WALLS_THICKNESS, y: height },
        { x: 0, y: height },
      ]);

      const bottomWall = render.engine.world.bodies[2];
      Matter.Body.setPosition(bottomWall, {
        x: width / 2,
        y: height + WALLS_THICKNESS / 2,
      });
      Matter.Body.setVertices(bottomWall, [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: WALLS_THICKNESS },
        { x: 0, y: WALLS_THICKNESS },
      ]);

      const leftWall = render.engine.world.bodies[3];
      Matter.Body.setPosition(leftWall, {
        x: -WALLS_THICKNESS / 2,
        y: height / 2,
      });
      Matter.Body.setVertices(leftWall, [
        { x: 0, y: 0 },
        { x: WALLS_THICKNESS, y: 0 },
        { x: WALLS_THICKNESS, y: height },
        { x: 0, y: height },
      ]);

    }
  }, [render, constraints]);
  useEffectUnsafe(() => {
    const CIRCLES_SIZE = 10;
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
                skill.level * CIRCLES_SIZE,
                skill.level * CIRCLES_SIZE,
                {
                  restitution: BOUNCINESS,
                  render: {
                    sprite: {
                      texture: createImage(
                        skill.skillName,
                        skill.level * CIRCLES_SIZE
                      ),
                      xScale: 1,
                      yScale: 1,
                    },
                  },
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

      <CanvasWrapper
        ref={boxRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <canvas ref={canvasRef} />
      </CanvasWrapper>

  );
}

function getWorldWalls(constraints: any) {
  const { width, height } = constraints;

  const options = {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  };

  const topWall = Matter.Bodies.rectangle(
    width / 2,
    -WALLS_THICKNESS / 2,
    width,
    WALLS_THICKNESS,
    options
  );
  const rightWall = Matter.Bodies.rectangle(
      width + WALLS_THICKNESS / 2,
      height / 2,
      WALLS_THICKNESS,
      height,
      options
  );
  const bottomWall = Matter.Bodies.rectangle(
      width / 2,
      height + WALLS_THICKNESS / 2,
      width,
      WALLS_THICKNESS,
      options
  );
  const leftWall = Matter.Bodies.rectangle(
      -WALLS_THICKNESS / 2,
      height / 2,
      WALLS_THICKNESS,
      height,
      options
  );
  return [
    topWall,
    rightWall,
    bottomWall,
    leftWall,
  ];
}

function createImage($string: string, size: number) {
  const drawing = document.createElement('canvas');
  drawing.width = size * 2;
  drawing.height = size * 2;
  const ctx = drawing.getContext('2d');

  if (ctx) {
    ctx.beginPath();
    ctx.arc(size, size, size, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#fff';
    ctx.font = '12pt Yantramanav';
    ctx.textAlign = 'center';
    ctx.fillText($string, size, size + 4);
  }

  return drawing.toDataURL('image/png', 10);
}

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`