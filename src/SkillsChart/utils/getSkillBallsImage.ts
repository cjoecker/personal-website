import {SkillsType} from "../SkillsMap";

export function getSkillsBallsImage(skill: SkillsType, size: number ) {
    const drawing = document.createElement('canvas');
    drawing.width = size * 2;
    drawing.height = size * 2;
    const ctx = drawing.getContext('2d');

    if (ctx) {
        ctx.beginPath();
        ctx.arc(size, size, size, 0, Math.PI * 2);
        ctx.fillStyle = skill.type === 'ux' ? 'blue' : 'red';
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = '#fff';
        ctx.font = '12pt Yantramanav';
        ctx.textAlign = 'center';
        ctx.fillText(skill.skillName, size, size + 4);
    }

    return drawing.toDataURL('image/png', 10);
}