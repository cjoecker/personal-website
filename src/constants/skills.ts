export interface SkillsType {
  skillName: string;
  type: 'web' | 'ux'
  level: number;
}

export const skills: SkillsType[] = [
  {skillName: "UX Design", type: 'ux', level: 7},
  {skillName: "UI Design", type: 'ux', level: 5},
  {skillName: "Adobe XD", type: 'ux', level: 5},
  {skillName: "Figma", type: 'ux', level: 3},
  {skillName: "Affinity Designer", type: 'ux', level: 4},
  {skillName: "User Tests", type: 'ux', level: 7},
  {skillName: "Personas", type: 'ux', level: 7},
  {skillName: "Journey Map", type: 'ux', level: 5},
  {skillName: "A11Y", type: 'ux', level: 6},
  {skillName: "Red Routes", type: 'ux', level: 7},
  {skillName: "Card Sorting", type: 'ux', level: 4},
  {skillName: "Creative Workshops", type: 'ux', level: 7},
  {skillName: "React", type: 'web', level: 7},
  {skillName: "Angular", type: 'web', level: 7},
  {skillName: "Typescript", type: 'web', level: 8},
  {skillName: "Material-UI", type: 'web', level: 8},
  {skillName: "Tailwind", type: 'web', level: 7},
  {skillName: "Jest", type: 'web', level: 7},
  {skillName: "Cypress", type: 'web', level: 6},
  {skillName: "karma", type: 'web', level: 3},
  {skillName: "Styled Components", type: 'web', level: 8},
  {skillName: "Storybook", type: 'web', level: 8},
  {skillName: "Testing Library", type: 'web', level: 7},
];
