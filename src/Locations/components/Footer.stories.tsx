import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import Footer from './Footer';

export default {
  title: 'Locations/Footer',
  component: Footer,
};
const Template: Story<ComponentProps<typeof Footer
    >> = args => (
  <MaxWidthWrapper>
    <Footer {...args} />
  </MaxWidthWrapper>
);

export const Default = Template.bind({});
Default.args = {
  location:   {
    year: 2001,
    city: 'Bogotá',
    country: 'Colombia',
    latitude: 4.687175,
    longitude: -74.048476,
  }
};

const MaxWidthWrapper = styled.div`
  max-width: 300px;
`;
