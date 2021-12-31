import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Temperature from './Temperature';

export default {
  title: 'Locations/Temperature',
  component: Temperature,
};
const Template: Story<ComponentProps<typeof Temperature
    >> = args => (
    <Temperature {...args} />
);

export const Default = Template.bind({});
Default.args = {
  temperature: 17,
  isLoading: false
};

export const Loading = Template.bind({});
Loading.args = {
  temperature: 0,
  isLoading: true
};

