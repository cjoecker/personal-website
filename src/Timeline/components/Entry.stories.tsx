import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import {Entry} from "./Entry";

export default {
  title: 'Timeline/Entry',
  component: Entry,
};
const Template: Story<ComponentProps<typeof Entry
    >> = (args) => (
  <DimensionsWrapper>
    <Entry {...args}/>
  </DimensionsWrapper>
);

export const Default = Template.bind({});
Default.args = {
  entry:{
    startDate: new Date("2019-01-06"),
    endDate: "Today",
    position: 'Senior IT Consultant',
    companyLogoPath: "",
    description: "Lorem ipsum",
    technologies: ["React","C#","WinForms", "WPF"]
  }
};

const DimensionsWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: relative;
`;
