import { SkillsType } from '../../../constants/skills';

export function getSkillsBallsImage(
  skill: SkillsType,
  size: number,
  color: string,
  scale: number
) {
  const newSize = size * scale;
  const drawing = document.createElement('canvas');
  drawing.width = newSize * 2;
  drawing.height = newSize * 2;
  const ctx = drawing.getContext('2d');
  const skillNameWords = skill.skillName.split(' ');

  if (ctx) {
    ctx.font = '12pt Yantramanav';
    ctx.beginPath();
    ctx.arc(newSize, newSize, newSize, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.font = ctx.font.replace(/\d+px/, `${14 * scale}px`);
    ctx.imageSmoothingQuality = 'high';
    if (skillNameWords.length === 1) {
      ctx.fillText(skill.skillName, newSize, newSize + 4 * scale);
    }
    if (skillNameWords.length === 2) {
      ctx.fillText(skillNameWords[0], newSize, newSize - 4 * scale);
      ctx.fillText(skillNameWords[1], newSize, newSize + 10 * scale);
    }
    if (skillNameWords.length > 2) {
      console.error(`${skill.skillName} has more then 2 words`);
    }
  }
  return drawing.toDataURL('image/png');
}
