import React from 'react'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import { Login as LoginUI } from '../components/Login'

export const Login = () => {

  return (
    <Container fixed>
      <Grid container>
        <Grid item sm />
        <Grid item sm>
          <LoginUI />
        </Grid>
        <Grid item sm />
      </Grid>
    </Container>
  )
}

export default Login
