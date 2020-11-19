import React from 'react'

import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { Login } from './component'
import { User } from '../../redux'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  paper: {
    padding: 20,
    marginTop: 60,
    textAlign: 'center',
  }
}))

const LoginContainer = () => {
  const classes = useStyles()
  const isAuthenticated = useSelector(User.Selectors.isAuthenticated)
  return (
    <Login
      classes={classes}
      isAuthenticated={isAuthenticated}
    />
  )
}

export default LoginContainer
