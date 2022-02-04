import {
  makeStyles,
  createStyles,
  Theme,
  createTheme,
  responsiveFontSizes,
} from '@material-ui/core';
import { White, DarkBlue, Yellow, Red, LightGreen } from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: LightGreen,
    },
    secondary: {
      main: Yellow,
    },
    error: {
      main: Red,
    },
    success: {
      main: '#5FC698',
    },
  },
});

export const fdTheme = responsiveFontSizes(theme);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    media: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: 0,
      paddingBottom: '48%',

      backgroundColor: '#fff',
      position: 'relative',

      '&:after': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 16,
        opacity: 0.5,
      },
    },
    onBoarding: {
      minWidth: '360px',

      backgroundColor: White,
      justifyContent: 'center',
      alignItems: 'center',
      justify: 'center',
      color: DarkBlue,
      h1: {
        fontSize: '3em',
      },
      h3: {
        color: DarkBlue,
      },

      p: {
        margin: '20px',
      },

      form: {
        overflow: 'hidden',
        maxWidth: '900px',
      },
      padding: '80px 20px',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
