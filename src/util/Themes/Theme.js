import { createMuiTheme } from '@material-ui/core/styles'

export const Dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#282c34',
    },
    secondary: {
      main: '#81c784',
    },
    background: {
      paper: '#282c34',
      default: '#1c2025',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spreadThis: {
    body: {
      backgroundColor: '#1c2025',
    },
    differenceIcon: {
      color: '#ffffff',
    },
    avatar: {
      backgroundColor: '#81c784',
      height: 56,
      width: 56,
    },
    tableHeadActive: {
      backgroundColor: '#81c784',
    },
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    completed: {
      textDecoration: 'line-through',
    },
    image: {
      margin: '10px auto 10px auto',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
      color: '#ffffff',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 5,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
    
  },
})

export const Light = createMuiTheme({
  palette: {
    primary: {
      main: '#43a047',
    },
    background: {
      default: '#f5f5f5',
    },
    secondary: {
      light: '#43a047',
      main: '#7cb342',
      contrastText: '#ffcc00',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    type: 'light',
  },
  spreadThis: {
    differenceIcon: {
      color: '#ffffff',
    },
    avatar: {
      backgroundColor: '#81c784',
      height: 56,
      width: 56,
    },
    tableHeadActive: {
      backgroundColor: '#81c784',
    },
    tableCellHeadColored: {
      color: '#ffffff',
    },
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '10px auto 10px auto',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
      color: '#ffffff',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 5,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
})
