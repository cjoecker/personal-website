import Matter from "matter-js";

import {SkillsType} from "../SkillsMap";

import {getSkillsBallsImage} from "./getSkillBallsImage";


const CIRCLES_SIZE = 10;
const BOUNCINESS = 0.7;

export function getCircleBody(constraints: unknown, skill: SkillsType){
    const { width } = constraints as {width: number, height: number};
    const size = skill.level * CIRCLES_SIZE
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
                        size
                    ),
                    xScale: 1,
                    yScale: 1,
                },
            },
        }
    )
}