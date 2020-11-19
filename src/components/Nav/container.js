import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { User, UI } from '../../redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { TableChart, Dashboard, Store, ListAlt } from '@material-ui/icons'

import Nav from './component'

const menuList = [
  {
    label: 'Dashboard',
    icon: <Dashboard />,
    link: '/',
  },
  {
    label: 'Reserveringen',
    icon: <TableChart />,
    link: '/reserveringen',
  },
  {
    label: 'Producten',
    icon: <Store />,
    link: '/producten',
  },
  {
    label: 'Orders',
    icon: <ListAlt />,
    link: '/orders',
  },
  // {
  //   label: 'Instellingen',
  //   icon: <Settings />,
  //   link: '/setting',
  // },
]

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.primary.main,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  faIcon: {
    fontSize: '1.2rem',
  },

  title: {
    flexGrow: 1,
  },
  social: {
    color: '#FFF',
  },
}))
export const NavContainer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()

  const isAuthenticated = useSelector(User.Selectors.isAuthenticated)
  const isAdmin = useSelector(User.Selectors.isAdmin)
  const Theme = useSelector(UI.Selectors.isDarkTheme)

  const [open, setOpen] = React.useState(false)
  const [path, setPath] = React.useState('')

  let location = useLocation()
  React.useEffect(() => {
    setPath(location.pathname)
  }, [location, setPath])

  const activeRoute = (route) => {
    return route === path
  }

  const handleDrawerOpen = () => {
    setOpen(true)
    dispatch(UI.Actions.setNavOpen())
  }
  const changeTheme = () => {
    dispatch(UI.Actions.setTheme())
  }

  const handleDrawerClose = () => {
    setOpen(false)
    dispatch(UI.Actions.setNavOpen())
  }
  const handleLogout = () => {
    dispatch(User.Actions.logoutUser())
  }

  return (
    <Nav
      menuList={menuList}
      classes={classes}
      isAuthenticated={isAuthenticated}
      isAdmin={isAdmin}
      theme={theme}
      Theme={Theme}
      open={open}
      path={path}
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
      changeTheme={changeTheme}
      handleLogout={handleLogout}
      activeRoute={activeRoute}
    />
  )
}

export default NavContainer
