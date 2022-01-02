import { useTheme } from '@mui/material';
import Matter, { Mouse, MouseConstraint } from 'matter-js';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useEffectUnsafe } from '../../unsafeHooks';
import { getCircleBody } from '../utils/getCircleBody';
import { getWorldWalls } from '../utils/getWorldWalls';
import { SkillsType } from '../../constants/skills';

interface BallsProps {
  skills: SkillsType[];
}

const WALLS_THICKNESS = 10;

export default function Balls({ skills }: BallsProps) {
  const boxRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [constraints, setConstraints] = useState<any>();
  const [render, setScene] = useState<any>();
  const handleResize = () => {
    setConstraints(boxRef.current.getBoundingClientRect());
  };
  const style = useTheme();


  useEffectUnsafe(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const engine = Engine.create();
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
      getWorldWalls(boxRef.current.getBoundingClientRect(), WALLS_THICKNESS)
    );


    const mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          constraint: {
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

  }, [constraints]);
  useEffectUnsafe(() => {
    const timeouts: Array<NodeJS.Timeout> = [];
    if (render && skills) {
      skills.forEach(skill => {
        const color = skill.type === 'web' ? style.palette.primary.main : style.palette.secondary.main
        timeouts.push(
          setTimeout(() => {
            Matter.World.add(
              render.engine.world,
              getCircleBody(constraints,skill, color),
            );
          }, Math.random() * (500 - 50))
        );
      });
    }
    return () => {
      if (timeouts) {
        timeouts.forEach(t => clearTimeout(t));
      }
    };
  }, [skills, render, style.palette.primary.main, style.palette.secondary.main]);

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

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`
