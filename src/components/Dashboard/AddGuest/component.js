import React from 'react'
import { useDispatch } from 'react-redux'

import { LinearProgress, Button, MenuItem, Grid, Paper, Typography } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import dayjs from 'dayjs'
import nl from 'dayjs/locale/nl'

import { submitReservation } from '../../../redux/actions/dataActions'

const AddGuest = ({ isLoading, classes, dates, userId }) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return (
      <Typography variant="h5" align="center">
        Loading....
      </Typography>
    )
  }
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.pageTitle}>
        Voeg gast toe
      </Typography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          date: '',
        }}
        validate={(values) => {
          const errors = {}
          if (!values.firstName) {
            errors.firstName = 'Verplicht'
          } else if (values.firstName.length > 15) {
            errors.firstName = 'Maximaal 15 tekens of minder'
          }

          if (!values.lastName) {
            errors.lastName = 'Verplicht'
          } else if (values.lastName.length > 20) {
            errors.lastName = 'Maximaal 20 tekens of minder'
          }
          if (!values.date) {
            errors.date = 'Verplicht'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const dateId = dates.find((d) => {
            return d.date === values.date
          })
          Object.assign(values, { dateId: dateId.dateId, uid: userId })
          dispatch(
            submitReservation({
              reservation: values,
            })
          )
          resetForm()
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
                  className={classes.input}
                  type="text"
                  name="date"
                  label="Kies een datum"
                  select
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                >
                  {dates.map((option) => (
                    <MenuItem key={option.dateId} value={option.date}>
                      {dayjs(option.date).locale(nl).format('dddd D MMMM')}
                    </MenuItem>
                  ))}
                </Field>

                <Field
                  color="secondary"
                  component={TextField}
                  fullWidth
                  label="Voornaam"
                  name="firstName"
                  type="text"
                  variant="outlined"
                  className={`${classes.field} {classes.input}`}
                />
                <Field
                color="secondary"
                  component={TextField}
                  name="lastName"
                  type="text"
                  label="Achternaam"
                  fullWidth
                  variant="outlined"
                  className={`${classes.field} {classes.input}`}
                />
                {isSubmitting && <LinearProgress color="secondary" />}
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Toevoegen
                </Button>
              </Form>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Paper>
  )
}

export default AddGuest
