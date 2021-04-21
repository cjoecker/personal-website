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
    {skillName: "UX Design", level: 7},
    {skillName: "UI Design", level: 6},
    {skillName: "Adobe XD", level: 5},
    {skillName: "User Tests", level: 7}
  ]
};

const MaxWidthWrapper = styled.div`
  max-width: 300px;
`;
