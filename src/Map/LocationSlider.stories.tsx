import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import LocationSlider from './LocationSlider';

export default {
  title: 'Location Slider',
  component: LocationSlider,
};
const Template: Story<ComponentProps<typeof LocationSlider>> = args => (
  <MaxWidthWrapper>
    <LocationSlider {...args} />
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
