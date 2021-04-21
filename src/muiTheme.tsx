import {
  createMuiTheme,
  ThemeOptions as MuiThemeOptions,
} from '@material-ui/core/styles';
import 'typeface-yantramanav'

const background = '#0d1321';
const primary = '#60AFE0';
const primaryContrastText = '#000000';
const secondary = '#cdcdcd';
const secondaryContrastText = '#000000';
const primaryText = '#FAFBFD';
const secondaryText = '#FAFBFD';
const disabledText = '#B0B0B0';
const paperBackground = '#2C373E';

const muiThemeOptions: MuiThemeOptions = {
  typography: {
    fontFamily: ['Yantramanav', 'Calibri', 'arial'].join(','),
    caption: {
      fontWeight: 100,
      fontSize: 14,
    },
    fontWeightRegular: 100,
    fontWeightBold: 300,
    h1: {
      fontWeight: 300,
      fontSize: 28,
    },
    h2: {
      fontWeight: 300,
      fontSize: 24,
    },
    h3: {
      fontWeight: 300,
      fontSize: 20,
    },
    h4: {
      fontWeight: 100,
      fontSize: 18,
    },
    h5: {
      fontWeight: 100,
      fontSize: 18,
    },
    h6: {
      fontWeight: 100,
      fontSize: 16,
    },
    body1: {
      fontWeight: 100,
      fontSize: 16,
    },
    body2: {
      fontWeight: 100,
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
  overrides:{
    MuiPaper: {
      root: {
        backdropFilter: "blur(8px) brightness(70%)",
        backgroundColor: undefined
      },
      // elevation1: {
      //   background: shadeHexColor(background, darkMode ? 0.05 : 0.2),
      //   boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, ${darkMode ? 0.05 : 0.3})`,
      //   borderRadius: '10px',
      // },
      // elevation7: {
      //   boxShadow: `10px 10px 35px 6px rgba(0,0,0,${darkMode ? 0.5 : 0.2})`,
      // },
    },
    MuiSlider:{
      valueLabel:{
        label:{
          color: "red"
        }
      }
    }
  }
};

const muiTheme = createMuiTheme(muiThemeOptions);

export default muiTheme;
