import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import {Timeline} from "./Timeline";

export default {
  title: 'Timeline',
  component: Timeline,
};
const Template: Story<ComponentProps<typeof Timeline
    >> = (args) => (
  <DimensionsWrapper>
    <Timeline {...args}/>
  </DimensionsWrapper>
);

export const Default = Template.bind({});
Default.args = {
  timelineEntries:[
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

const DimensionsWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: relative;
`;
