import {
  createMuiTheme,
  ThemeOptions as MuiThemeOptions,
} from '@material-ui/core/styles';

const background = '#0d1321';
const primary = '#007ca5';
const primaryContrastText = '#e3e3e3';
const secondary = '#cdcdcd';
const secondaryContrastText = '#303030';
const primaryText = '#CFCFCF';
const secondaryText = '#B0B0B0';
const disabledText = '#B0B0B0';
const paperBackground = '#0f1a2b';

const muiThemeOptions: MuiThemeOptions = {
  typography: {
    fontFamily: ['Biryani', 'Calibri', 'sans-serif'].join(','),
    caption: {
      fontWeight: 400,
      fontSize: 14,
    },
    fontWeightRegular: 400,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: 28,
    },
    h2: {
      fontWeight: 600,
      fontSize: 24,
    },
    h3: {
      fontWeight: 600,
      fontSize: 20,
    },
    h4: {
      fontWeight: 600,
      fontSize: 18,
    },
    h5: {
      fontWeight: 600,
      fontSize: 18,
    },
    h6: {
      fontWeight: 600,
      fontSize: 16,
    },
    body1: {
      fontWeight: 500,
      fontSize: 16,
    },
    body2: {
      fontWeight: 500,
      fontSize: 16,
    },
  },

  palette: {
    type: 'dark',
    background: {
      default: background,
      paper: paperBackground,
    },
    primary: {
      main: primary,
      contrastText: primaryContrastText,
    },
    secondary: {
      main: secondary,
      contrastText: secondaryContrastText,
    },
    text: {
      primary: primaryText,
      secondary: secondaryText,
      disabled: disabledText,
    },
  },
};

const muiTheme = createMuiTheme(muiThemeOptions);

export default muiTheme;
