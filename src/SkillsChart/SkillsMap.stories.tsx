import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import SkillsMap from "./SkillsMap";

export default {
  title: 'Skills Map',
  component: SkillsMap,
};
const Template: Story<ComponentProps<typeof SkillsMap
    >> = (args) => (
  <MaxWidthWrapper>
    <SkillsMap {...args}/>
  </MaxWidthWrapper>
);

export const Default = Template.bind({});
Default.args = {
  skills:[
    {skillName: "UX Design", type: 'ux', level: 7},
    {skillName: "UI Design", type: 'ux', level: 5},
    {skillName: "Adobe XD", type: 'ux', level: 5},
    {skillName: "User Tests", type: 'ux', level: 7},
    {skillName: "React", type: 'web', level: 7},
    {skillName: "Javascript", type: 'web', level: 7},
    {skillName: "Typescript", type: 'web', level: 7},
    {skillName: "CSS", type: 'web', level: 6},
    {skillName: "Material-UI", type: 'web', level: 8}
  ]
};

const MaxWidthWrapper = styled.div`
  max-width: 300px;
`;
