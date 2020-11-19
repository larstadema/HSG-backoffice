import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, useDispatch } from 'react-redux'

import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { User, UI } from '../redux'

import {
  KeyboardReturn,
  ExitToApp,
  TableChart,
  Dashboard,
  Settings,
  Brightness4,
  Brightness7,
} from '@material-ui/icons'

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
export const Nav = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(User.Selectors.isAuthenticated)
  const isAdmin = useSelector(User.Selectors.isAdmin)
  const Theme = useSelector(UI.Selectors.isDarkTheme)

  const classes = useStyles()
  const theme = useTheme()
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
  const menuList = [
    {
      label: 'Dashboard',
      icon: <Dashboard />,
      link: '/',
    },
    {
      label: 'Reserveringen',
      icon: <TableChart />,
      link: '/Reserveringen',
    },
    {
      label: 'Instellingen',
      icon: <Settings />,
      link: '/Setting',
    },
  ]

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Backoffice
          </Typography>
          <IconButton
            color="primary"
            aria-label="facebook"
            className={classes.social}
            target="_blank"
            href="https://www.facebook.com/Introweek"
            rel="noopener"
          >
            {/* <FontAwesomeIcon className={classes.faIcon} icon={faFacebook} /> */}
          </IconButton>
          <IconButton
            color="primary"
            aria-label="instagram"
            className={classes.social}
            target="_blank"
            href="https://www.instagram.com/introweekhaarlem/"
            rel="noopener"
          >
            {/* <FontAwesomeIcon className={classes.faIcon} icon={faInstagram} /> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon className={classes.toolbarIcon} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuList.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.link}
                selected={activeRoute(item.link)}
              >
                <Tooltip title={item.label} aria-label={item.label} key={item.label}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <Divider />
          </List>
          <List>
            <ListItem button key="ToggleTheme" onClick={changeTheme}>
              <ListItemIcon>{Theme ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
              <ListItemText primary={Theme ? 'Light Mode' : 'Dark Mode'} />
            </ListItem>
            <ListItem button key="Logout" onClick={handleLogout}>
              <ListItemIcon>
                <KeyboardReturn />
              </ListItemIcon>
              <ListItemText primary="Uitloggen" />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon className={classes.toolbarIcon} />
              ) : (
                <ChevronLeftIcon className={classes.toolbarIcon} />
              )}
            </IconButton>
          </div>
          <Divider />
          {isAuthenticated && isAdmin ? (
            <Fragment>
              <List>
                {menuList.map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    component={Link}
                    to={item.link}
                    selected={activeRoute(item.link)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <ListItem button key="ToggleTheme" onClick={changeTheme}>
                  <ListItemIcon>{Theme ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
                  <ListItemText primary={Theme ? 'Light Mode' : 'Dark Mode'} />
                </ListItem>
                <ListItem button key="Logout" onClick={handleLogout}>
                  <ListItemIcon>
                    <KeyboardReturn />
                  </ListItemIcon>
                  <ListItemText primary="Uitloggen" />
                </ListItem>
              </List>
            </Fragment>
          ) : (
            <Fragment>
              <List>
                <ListItem button key="ToggleTheme" onClick={changeTheme}>
                  <ListItemIcon>{Theme ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
                  <ListItemText primary={Theme ? 'Light Mode' : 'Dark Mode'} />
                </ListItem>
                <ListItem button key="Inloggen" onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Inloggen" />
                </ListItem>
              </List>
            </Fragment>
          )}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default Nav
