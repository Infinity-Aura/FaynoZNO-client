import { createTheme, SxProps } from '../kit';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    border: {
      blue: string;
      red: string;
      grey: string;
    };
  }

  interface PaletteOptions {
    border?: {
      blue: string;
      red: string;
      grey: string;
    };
  }

  interface TypeBackground {
    lightBlue: string;
    lightRed: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3B3B47',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#3B3B47',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '24px',
          textAlign: 'center',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '21px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          border: '3px solid #85E9FF',
          borderRadius: '24px',
          minWidth: 116,
          textAlign: 'center',
          '&.Mui-disabled': {
            background: 'rgba(178, 178, 178, 1)',
            pointerEvents: 'none',
          },
        },
        text: {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          fontWeight: 400,
        },
        textSecondary: {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          fontWeight: 400,
          color: '#FFFFFF',
        },
        outlined: {
          background: 'transparent',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.1)',
            border: '3px solid #85E9FF',
          },
        },
        contained: {
          background: '#44A5DC',
          color: '#FFFFFF',
          '&:hover': {
            background: 'rgba(68, 165, 220, 0.8)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          },
        },
        containedSecondary: {
          background: '#FFFFFF',
          color: '#3B3B47',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: '#44A5DC',
          color: '#FFFFFF',
          border: '3px solid #85E9FF',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            background: 'rgba(68, 165, 220, 0.8)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '3px solid #44A5DC',
          color: '#FFFFFF',
          outline: 'none',
          fontWeight: 300,
          fontSize: '1.2rem',
          lineHeight: '1.65rem',
          '&:hover': {
            border: '3px solid #85E9FF',
          },
          '& fieldset': { border: 'none' },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '3px solid #44A5DC',
          outline: 'none',
          fontWeight: 300,
          fontSize: '1rem',
          '&:hover': {
            border: '3px solid #85E9FF',
            outline: 'none',
          },
          '&:select': {
            border: 'none',
            outlined: 'none',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            background: '#44A5DC',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '8px',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '4.8rem',
      lineHeight: '5.85rem',
    },
    h2: {
      fontWeight: 900,
      fontSize: '3.2rem',
      lineHeight: '3.9rem',
    },
    h3: {
      fontWeight: 800,
      fontSize: '1.8rem',
      lineHeight: '2.2rem',
    },
    h4: {
      fontWeight: 900,
      fontSize: '1.2rem',
      lineHeight: '1.65rem',
    },
    h5: {
      fontWeight: 300,
      fontSize: '0.95rem',
      lineHeight: '1.25rem',
    },
    h6: {
      fontWeight: 300,
      fontSize: '0.9rem',
      lineHeight: '1.15rem',
    },
    subtitle1: {
      fontWeight: 800,
      fontSize: '1.6rem',
      lineHeight: '1.95rem',
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1.2rem',
      lineHeight: '1.65rem',
    },
    body1: {
      fontWeight: 800,
      fontSize: '1rem',
      lineHeight: '1.2rem',
    },
    body2: {
      fontWeight: 500,
      fontSize: '0.8rem',
      lineHeight: '0.95rem',
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.2rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  breakpoints: {
    values: {
      xs: 380,
      sm: 580,
      md: 768,
      lg: 950,
      xl: 1125,
    },
  },
});

export type Sx = SxProps<typeof theme>;
