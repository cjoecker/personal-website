import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import PastLocations from './PastLocations';

export default {
  title: 'PastLocations',
  component: PastLocations,
};
const Template: Story<ComponentProps<typeof PastLocations>> = () => (
  <PastLocations />
);

export const Default = Template.bind({});
Default.args = {};
