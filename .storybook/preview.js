import muiTheme from '../src/muiTheme';
import { addDecorator } from '@storybook/client-api';

import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CSSVariables } from '../src/App';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

addDecorator(story => (
  <CSSVariables>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>
    </QueryClientProvider>
  </CSSVariables>
));
