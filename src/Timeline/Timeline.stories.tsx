import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import { Timeline } from './Timeline';

export default {
  title: 'Timeline',
  component: Timeline,
};
const Template: Story<ComponentProps<typeof Timeline>> = args => (
  <DimensionsWrapper>
    <Timeline {...args} />
  </DimensionsWrapper>
);

export const Default = Template.bind({});
Default.args = {
  timelineEntries: [
    {
      startDate: new Date('2019-06-01'),
      endDate: 'Today',
      company: 'MaibornWolff',
      position: 'Senior IT Consultant',
      description: 'Lorem ipsum',
      technologies: ['React', 'C#', 'WinForms', 'WPF'],
    },
    {
      startDate: new Date('2018-04-01'),
      endDate: new Date('2019-05-31'),
      company: 'KUKA',
      position: 'Team Leader - Virtual Commissioning',
      description: 'Lorem ipsum',
      technologies: ['React', 'C#', 'WinForms', 'WPF'],
    },
    {
      startDate: new Date('2015-02-01'),
      endDate: new Date('2018-04-30'),
      company: 'KUKA',
      position: 'Virtual Commissioning Engineer',
      description: 'Lorem ipsum',
      technologies: ['React', 'C#', 'WinForms', 'WPF'],
    },
    {
      startDate: new Date('2014-02-01'),
      endDate: new Date('2014-08-30'),
      company: 'Schmalz',
      position: 'Intership and Bachelor Thesis',
      description: 'Lorem ipsum',
      technologies: ['React', 'C#', 'WinForms', 'WPF'],
    },
  ],
};

const DimensionsWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: relative;
`;
