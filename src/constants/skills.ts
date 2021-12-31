export interface SkillsType {
  skillName: string;
  type: 'web' | 'ux'
  level: number;
}

export const skills: SkillsType[] = [
  {skillName: "UX Design", type: 'ux', level: 7},
  {skillName: "UI Design", type: 'ux', level: 5},
  {skillName: "Adobe XD", type: 'ux', level: 5},
  {skillName: "User Tests", type: 'ux', level: 7},
  {skillName: "React", type: 'web', level: 7},
  {skillName: "Javascript", type: 'web', level: 7},
  {skillName: "Typescript", type: 'web', level: 7},
  {skillName: "CSS", type: 'web', level: 6},
  {skillName: "Material-UI", type: 'web', level: 8}
];
