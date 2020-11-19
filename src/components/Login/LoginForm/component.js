import React from 'react'

import {
  LinearProgress,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

export const LoginForm = (props) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Verplicht'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Ongeldig email adres'
        }
        if (!values.password) {
          errors.password = 'Verplicht'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Grid container spacing={3}>
          <Grid item sm={12} md={12} xs={12}>
            <Form>
              <Field
                color="secondary"
                component={TextField}
                fullWidth
                label="Email"
                name="email"
                type="text"
                className={props.classes.textField}
              />
              <Field
                component={TextField}
                name="password"
                type={props.showPassword ? 'text' : 'password'}
                label="Wachtwoord"
                fullWidth
                className={props.classes.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={props.handleClickShowPassword}
                        onMouseDown={props.handleMouseDownPassword}
                      >
                        {props.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {isSubmitting && <LinearProgress color="secondary" />}
              {props.errors && (
                <Typography variant="body2" className={props.classes.customError}>
                  {props.errors.general}
                </Typography>
              )}
              <br />
              <Button
                className={props.classes.button}
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Login
              </Button>
            </Form>
          </Grid>
        </Grid>
      )}
    </Formik>
  )
}

export default LoginForm
