import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import LocationTemperature from "./LocationTemperature";

export default {
  title: 'LocationTemperature',
  component: LocationTemperature,
};
const Template: Story<ComponentProps<typeof LocationTemperature
    >> = args => (
    <LocationTemperature {...args} />
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

