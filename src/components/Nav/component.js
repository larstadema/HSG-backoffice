import React, { Fragment } from 'react'

import clsx from 'clsx'
import { Link } from 'react-router-dom'

import {
  Drawer,
  Hidden,
  AppBar,
  Toolbar,
  List,
  Tooltip,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  KeyboardReturn,
  ExitToApp,
  Brightness4,
  Brightness7,
  Facebook,
  Instagram
} from '@material-ui/icons'

export const Nav = (props) => {
  return (
    <div className={props.classes.root}>
      <AppBar
        position="fixed"
        className={clsx(props.classes.appBar, {
          [props.classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(props.classes.menuButton, {
              [props.classes.hide]: props.open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap className={props.classes.title}>
            Backoffice
          </Typography>
          <IconButton
            color="primary"
            aria-label="facebook"
            className={props.classes.social}
            target="_blank"
            href="https://www.facebook.com/hsgildt"
            rel="noopener"
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="instagram"
            className={props.classes.social}
            target="_blank"
            href="https://www.instagram.com/haerlemsstudentengildt/"
            rel="noopener"
          >
            <Instagram />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          variant="temporary"
          anchor={props.theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.open}
          onClose={props.handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          className={clsx(props.classes.drawer, {
            [props.classes.drawerOpen]: props.open,
            [props.classes.drawerClose]: !props.open,
          })}
          classes={{
            paper: clsx({
              [props.classes.drawerOpen]: props.open,
              [props.classes.drawerClose]: !props.open,
            }),
          }}
        >
          <div className={props.classes.toolbar}>
            <IconButton onClick={props.handleDrawerClose}>
              <ChevronRight className={props.classes.toolbarIcon} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {props.menuList.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.link}
                selected={props.activeRoute(item.link)}
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
            <ListItem button key="ToggleTheme" onClick={props.changeTheme}>
              <ListItemIcon>{props.Theme ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
              <ListItemText primary={props.Theme ? 'Light Mode' : 'Dark Mode'} />
            </ListItem>
            <ListItem button key="Logout" onClick={props.handleLogout}>
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
          className={clsx(props.classes.drawer, {
            [props.classes.drawerOpen]: props.open,
            [props.classes.drawerClose]: !props.open,
          })}
          classes={{
            paper: clsx({
              [props.classes.drawerOpen]: props.open,
              [props.classes.drawerClose]: !props.open,
            }),
          }}
        >
          <div className={props.classes.toolbar}>
            <IconButton onClick={props.handleDrawerClose}>
              {props.theme.direction === 'rtl' ? (
                <ChevronRight className={props.classes.toolbarIcon} />
              ) : (
                <ChevronLeft className={props.classes.toolbarIcon} />
              )}
            </IconButton>
          </div>
          <Divider />
          {props.isAuthenticated && props.isAdmin ? (
            <Fragment>
              <List>
                {props.menuList.map((item) => (
                  <ListItem
                    button
                    key={item.label}
                    component={Link}
                    to={item.link}
                    selected={props.activeRoute(item.link)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <ListItem button key="ToggleTheme" onClick={props.changeTheme}>
                  <ListItemIcon>{props.Theme ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
                  <ListItemText primary={props.Theme ? 'Light Mode' : 'Dark Mode'} />
                </ListItem>
                <ListItem button key="Logout" onClick={props.handleLogout}>
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
                <ListItem button key="ToggleTheme" onClick={props.changeTheme}>
                  <ListItemIcon>{props.Theme ? <Brightness7 /> : <Brightness4 />}</ListItemIcon>
                  <ListItemText primary={props.Theme ? 'Light Mode' : 'Dark Mode'} />
                </ListItem>
                <ListItem button key="Inloggen" onClick={props.handleLogout}>
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
