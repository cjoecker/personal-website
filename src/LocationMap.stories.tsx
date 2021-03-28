import React, {ComponentProps} from 'react';

import {Story} from '@storybook/react';

import LocationMap from "./LocationMap";

export default {
    title: 'LocationMap',
    component: LocationMap,
};
const Template: Story<ComponentProps<typeof LocationMap>> = (args) => <LocationMap  />;

export const FirstStory = Template.bind({});
FirstStory.args = {

};