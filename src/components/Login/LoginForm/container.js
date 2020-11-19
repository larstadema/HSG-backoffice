import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { LoginForm } from './component'
import { User, UI } from '../../../redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  textField: {
    margin: '10px auto 10px auto',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 5,
  },
}))

const LoginFormContainer = (props) => {
  let history = useHistory()
  const { loading } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const errors = useSelector(UI.Selectors.errors)

  const handleSubmit = (values) => {
    dispatch(User.Actions.loginUser(values, history))
  }

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  return (
    <LoginForm
      classes={classes}
      handleSubmit={handleSubmit}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      email={email}
      password={password}
      errors={errors}
      showPassword={showPassword}
      isLoading={loading}
    />
  )
}

export default LoginFormContainer
