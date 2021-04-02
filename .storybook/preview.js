import { ThemeProvider } from '@material-ui/styles';
import muiTheme from '../src/muiTheme';
import { addDecorator } from '@storybook/client-api';
import { Typography } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
})

addDecorator(story => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>
  </QueryClientProvider>
));
