import React from 'react'
import { Redirect } from 'react-router-dom'

import { Paper, Typography } from '@material-ui/core'

import { LoginForm } from '../Login/LoginForm'

export const Login = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/" />
  }
  return (
    <Paper className={props.classes.paper}>
      <Typography variant="h4">Login</Typography>
      <LoginForm />
    </Paper>
  )
}
