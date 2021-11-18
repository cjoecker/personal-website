import {SkillsType} from "../components/Balls";

export function getSkillsBallsImage(skill: SkillsType, size: number, color: string ) {
    const drawing = document.createElement('canvas');
    drawing.width = size * 2;
    drawing.height = size * 2;
    const ctx = drawing.getContext('2d');

    if (ctx) {
        ctx.font = '12pt Yantramanav';
        ctx.beginPath();
        ctx.arc(size, size, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(skill.skillName, size, size + 4);
    }
    return drawing.toDataURL('image/png');
}