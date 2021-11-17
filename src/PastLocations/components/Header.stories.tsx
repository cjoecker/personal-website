import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import Header from './Header';

export default {
  title: 'PastLocations/Header',
  component: Header,
};
const Template: Story<ComponentProps<typeof Header>> = args => (
  <MaxWidthWrapper>
    <Header {...args} />
  </MaxWidthWrapper>
);

export const Default = Template.bind({});
Default.args = {
  marks: [
    {
      value: 1991,
      label: "'91",
    },
    {
      value: 1997,
      label: "'97",
    },
    {
      value: 2001,
      label: "'01",
    },
    {
      value: 2011,
      label: "'11",
    },
    {
      value: 2014,
      label: "'14",
    },
    {
      value: 2019,
      label: "'19",
    },
    {
      value: 2021,
      label: "'21",
    },
  ],
};

const MaxWidthWrapper = styled.div`
  max-width: 300px;
`;
