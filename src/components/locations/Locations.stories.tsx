import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Locations from './Locations';

export default {
  title: 'Locations',
  component: Locations,
};
const Template: Story<ComponentProps<typeof Locations>> = args => (
  <Locations {...args} />
);

export const Default = Template.bind({});
Default.args = {
  locationEntries: [
    {
      year: 1991,
      city: 'Bogotá',
      country: 'Colombia',
      latitude: 4.687175,
      longitude: -74.048476,
    },
    {
      year: 1996,
      city: 'Caracas',
      country: 'Venezuela',
      latitude: 10.508851,
      longitude: -66.872806,
    },
    {
      year: 2001,
      city: 'Bogotá',
      country: 'Colombia',
      latitude: 4.687175,
      longitude: -74.048476,
    },
    {
      year: 2011,
      city: 'Wildau',
      country: 'Germany',
      latitude: 52.319534,
      longitude: 13.631231,
    },
    {
      year: 2014,
      city: 'Augsburg',
      country: 'Germany',
      latitude: 48.368341,
      longitude: 10.898417,
    },
    {
      year: 2019,
      city: 'Munich',
      country: 'Germany',
      latitude: 48.121003,
      longitude: 11.531562,
    },
    {
      year: 2021,
      city: 'Valencia',
      country: 'Spain',
      latitude: 39.466856,
      longitude: -0.369072,
    },
  ],
};
