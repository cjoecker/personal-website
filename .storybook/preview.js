import { ThemeProvider } from '@material-ui/styles';
import muiTheme from '../src/muiTheme';
import { addDecorator } from '@storybook/client-api';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

addDecorator((story) => (
    <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>
));