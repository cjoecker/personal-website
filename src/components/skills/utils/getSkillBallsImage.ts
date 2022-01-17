import { SkillsType } from '../../../constants/skills';

const FONT_FACTOR = 2;

export function getSkillsBallsImage(
  skill: SkillsType,
  size: number,
  color: string
) {
  const drawing = document.createElement('canvas');
  drawing.width = size * 2;
  drawing.height = size * 2;
  const ctx = drawing.getContext('2d');
  const skillNameWords = skill.skillName.split(' ');

  if (ctx) {
    ctx.font = '12pt Yantramanav';
    ctx.beginPath();
    ctx.arc(size, size, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.font = ctx.font.replace(/\d+px/, "52px");
    ctx.imageSmoothingQuality = 'high';
    if (skillNameWords.length === 1) {
      ctx.fillText(skill.skillName, size, size + 16);
    }
    if (skillNameWords.length === 2) {
      ctx.fillText(skillNameWords[0], size, size - 16);
      ctx.fillText(skillNameWords[1], size, size + 40);
    }
    if (skillNameWords.length > 2) {
      console.error(`${skill.skillName} has more then 2 words`);
    }
  }
  return drawing.toDataURL('image/png');
}
