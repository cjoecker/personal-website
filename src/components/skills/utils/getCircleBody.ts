import Matter from 'matter-js';

import { SkillsType } from '../../../constants/skills';

import { getSkillsBallsImage } from './getSkillBallsImage';

const CIRCLES_SIZE = 3;
const BOUNCINESS = 0.6;

export function getCircleBody(constraints: unknown, skill: SkillsType, color: string, ratio: number){
    const { width } = constraints as {width: number, height: number};
    const size = skill.level * CIRCLES_SIZE + CIRCLES_SIZE * 6
    const xPosOffset = skill.type === 'ux' ? width / 2 : 0;
    const xPos = Math.random() * (width/2 - size * 2)  + xPosOffset;

    return Matter.Bodies.circle(
        xPos,
        size,
        size,
        {
            restitution: BOUNCINESS,
            render: {
                sprite: {
                    texture: getSkillsBallsImage(
                        skill,
                        size,
                        color,
                      ratio
                    ),
                    xScale:1/ratio,
                    yScale: 1/ratio,
                },
            },
        }
    )
}
