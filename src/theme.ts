import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 370, // кастомный брейкпоинт
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#111111',
      paper: '#191818',
    },
    primary: {
      main: '#DEB544',
      dark: '#E1B842',
      light: '#F4D778',
    },
    secondary: {
      main: '#191818',
      dark: '#0F0F0F',
      light: '#2A2A2A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#E1B842',
    },
    h6: {
      fontWeight: 600,
      color: '#DEB544',
    },
    body1: {
      color: '#FFFFFF',
    },
    body2: {
      color: '#CCCCCC',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#111111',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#191818',
          borderRadius: 12,
          border: '1px solid #2A2A2A',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          backgroundColor: '#DEB544',
          color: '#111111',
          '&:hover': {
            backgroundColor: '#E1B842',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#191818',
            '& fieldset': {
              borderColor: '#2A2A2A',
            },
            '&:hover fieldset': {
              borderColor: '#DEB544',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E1B842',
            },
          },
        },
      },
    },
  },
});

export default theme;