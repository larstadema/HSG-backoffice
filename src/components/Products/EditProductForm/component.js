import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button,  FormControlLabel, Typography, LinearProgress, InputAdornment } from '@material-ui/core'
import {
    TextField,
    Switch,
  } from 'formik-material-ui';
export const EditProductForm = (props) => {
  return (
    <Formik
      initialValues={{
        productName: props.productName,
        productDescription: props.productDescription,
        productPrice: props.productPrice,
        visible: props.visible,
        productId: props.productId,
        productImage: props.productImage
      }}
      validate={(values) => {
        const errors = {}
        if (!values.productName) {
          errors.productName = 'Verplicht'
        }
        if (!values.productDescription) {
          errors.productDescription = 'Verplicht'
        }
        if (!values.productPrice) {
          errors.productPrice = 'Verplicht'
        }

        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            color="secondary"
            component={TextField}
            fullWidth
            label="Naam"
            name="productName"
            type="text"
            className={props.classes.textField}
          />
          <Field
            component={TextField}
            name="productDescription"
            type="text"
            label="Omschrijving"
            fullWidth
            className={props.classes.textField}
          />
          <Field
            component={TextField}
            name="productPrice"
            type="number"
            label="Prijs"
            fullWidth
            className={props.classes.textField}
            InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
          />
          <FormControlLabel
            control={<Field component={Switch} type="checkbox" name="visible" />}
            label={props.visible ? "Beschikbaar": "Niet beschikbaar"}
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
            Wijzigen
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default EditProductForm
