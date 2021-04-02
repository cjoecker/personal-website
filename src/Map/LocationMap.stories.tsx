import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import LocationMap from './LocationMap';

export default {
  title: 'Location Map',
  component: LocationMap,
};
const Template: Story<ComponentProps<typeof LocationMap>> = args => (
  <LocationMap />
);

export const Default = Template.bind({});
Default.args = {};
